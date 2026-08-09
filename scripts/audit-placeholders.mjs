#!/usr/bin/env node
/**
 * Produce the content request list for ONEX.
 *
 * Crawls the running site, finds every rendered <Placeholder>, and groups them
 * into what blocks launch and what does not. Also pulls the structured `needs`
 * arrays straight out of the data files, so items that have not yet been wired
 * into a page still show up.
 *
 *     npm run dev
 *     node scripts/audit-placeholders.mjs [baseUrl] > CONTENT-NEEDED.md
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA = join(ROOT, "src/data");

/* -- 1. placeholders rendered in the pages -------------------------------- */

const seen = new Set();
const queue = ["/"];
/** title -> { blocking, pages:Set } */
const placeholders = new Map();

const attr = (tag, name) =>
  tag.match(new RegExp(`${name}="([^"]*)"`))?.[1] ?? "";

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);

  let html;
  try {
    const res = await fetch(new URL(path, BASE));
    if (!res.ok) continue;
    html = await res.text();
  } catch {
    console.error(`# could not reach ${path} — is the dev server running?`);
    process.exit(1);
  }

  for (const match of html.matchAll(/<div[^>]*data-placeholder="[^"]*"[^>]*>/g)) {
    const tag = match[0];
    const title = attr(tag, "data-placeholder-title");
    if (!title) continue;
    const blocking = attr(tag, "data-placeholder-blocking") === "true";
    if (!placeholders.has(title)) {
      placeholders.set(title, { blocking, pages: new Set() });
    }
    placeholders.get(title).pages.add(path);
  }

  // Crawl one variant only — the other renders the same placeholders.
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const target = m[1];
    if (target.startsWith("/capability")) continue;
    if (!seen.has(target) && !queue.includes(target)) queue.push(target);
  }
}

/* -- 2. structured `needs` in the data ------------------------------------ */

const dataNeeds = [];
for (const file of [
  "products.json",
  "case-studies.json",
  "testimonials.json",
  "downloads.json",
  "company.json",
]) {
  const path = join(DATA, file);
  if (!existsSync(path)) continue;
  const data = JSON.parse(readFileSync(path, "utf8"));
  const walk = (node, label) => {
    if (Array.isArray(node)) return node.forEach((n) => walk(n, label));
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node.needs) && node.needs.length) {
      dataNeeds.push({
        file,
        subject: node.name ?? node.title ?? label,
        items: node.needs,
      });
    }
  };
  walk(data, file.replace(".json", ""));
}

/* -- report --------------------------------------------------------------- */

const blocking = [...placeholders].filter(([, v]) => v.blocking);
const nonBlocking = [...placeholders].filter(([, v]) => !v.blocking);

const out = [];
out.push("# Content ONEX needs to supply\n");
out.push(
  `Generated from the site itself — every gap below is a visible placeholder ` +
    `on a real page, not a wishlist. ${seen.size} pages scanned.\n`
);

out.push(`\n## Blocks launch (${blocking.length})\n`);
for (const [title, info] of blocking.sort()) {
  out.push(`- **${title}**`);
  out.push(`  - appears on ${info.pages.size} page(s), e.g. \`${[...info.pages][0]}\``);
}

out.push(`\n## Needed, does not block launch (${nonBlocking.length})\n`);
for (const [title, info] of nonBlocking.sort()) {
  out.push(`- ${title} — ${info.pages.size} page(s)`);
}

out.push(`\n## Specific data gaps, by record (${dataNeeds.length})\n`);
for (const need of dataNeeds) {
  out.push(`\n### ${need.subject}  \`${need.file}\``);
  for (const item of need.items) out.push(`- ${item}`);
}

console.log(out.join("\n"));
console.error(
  `\n${blocking.length} blocking, ${nonBlocking.length} non-blocking, ` +
    `${dataNeeds.length} records with data gaps\n`
);
