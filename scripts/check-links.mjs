#!/usr/bin/env node
/**
 * Crawl the running dev server and report every internal link that does not
 * return 200, plus any image the HTML references that 404s.
 *
 *     npm run dev
 *     node scripts/check-links.mjs [baseUrl]
 *
 * Exits non-zero if anything is broken, so it can gate a build.
 */

const BASE = process.argv[2] ?? "http://localhost:3000";

const seen = new Set();
const queue = ["/"];
/** brokenTarget -> Set of pages linking to it */
const broken = new Map();
const brokenImages = new Map();
let checked = 0;

const record = (map, target, from) => {
  if (!map.has(target)) map.set(target, new Set());
  map.get(target).add(from);
};

/** Strip the query and hash so /machines?family=welding is crawled once. */
function normalise(href) {
  try {
    const url = new URL(href, BASE);
    if (url.origin !== new URL(BASE).origin) return null;
    return url.pathname + url.search;
  } catch {
    return null;
  }
}

/**
 * Status cache. Without it the crawler re-probes every shared link — the nav
 * and footer alone are ~40 links on every one of 300+ pages — which turns a
 * one-minute check into tens of thousands of requests.
 */
const statusCache = new Map();

async function head(path) {
  if (statusCache.has(path)) return statusCache.get(path);
  let status;
  try {
    const res = await fetch(new URL(path, BASE), {
      method: "HEAD",
      redirect: "manual",
    });
    status = res.status;
  } catch {
    status = 0;
  }
  statusCache.set(path, status);
  return status;
}

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  let res;
  try {
    res = await fetch(new URL(path, BASE));
  } catch (error) {
    console.error(`  cannot reach ${path}: ${error.message}`);
    process.exit(1);
  }
  checked++;

  if (!res.ok) continue; // already recorded by whoever linked here
  const html = await res.text();

  // --- outgoing links ---
  for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
    const target = normalise(match[1]);
    if (!target) continue;

    const status = await head(target);
    if (status >= 400 || status === 0) {
      record(broken, `${target} (${status})`, path);
    } else if (!seen.has(target) && !queue.includes(target)) {
      queue.push(target);
    }
  }

  // --- images referenced from the markup ---
  for (const match of html.matchAll(/src="(\/[^"]*\.(?:png|jpe?g|webp|svg))"/gi)) {
    const src = decodeURIComponent(match[1]);
    const status = await head(src);
    if (status >= 400) record(brokenImages, `${src} (${status})`, path);
  }

  // Next.js rewrites <Image> through /_next/image?url=…
  for (const match of html.matchAll(/\/_next\/image\?url=([^&"]+)/g)) {
    const src = decodeURIComponent(decodeURIComponent(match[1]));
    if (!src.startsWith("/")) continue;
    const status = await head(src);
    if (status >= 400) record(brokenImages, `${src} (${status})`, path);
  }
}

console.log(`\nCrawled ${checked} page(s) from ${BASE}\n`);

if (broken.size) {
  console.log(`BROKEN LINKS (${broken.size}):`);
  for (const [target, sources] of [...broken].sort()) {
    console.log(`  ${target}`);
    console.log(`      linked from: ${[...sources].join(", ")}`);
  }
  console.log("");
}

if (brokenImages.size) {
  console.log(`BROKEN IMAGES (${brokenImages.size}):`);
  for (const [src, sources] of [...brokenImages].sort()) {
    console.log(`  ${src}`);
    console.log(`      on: ${[...sources].join(", ")}`);
  }
  console.log("");
}

const total = broken.size + brokenImages.size;
console.log(total === 0 ? "OK — no broken links or images\n" : `FAILED — ${total} issue(s)\n`);
process.exit(total === 0 ? 0 : 1);
