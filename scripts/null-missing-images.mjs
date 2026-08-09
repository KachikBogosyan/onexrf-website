#!/usr/bin/env node
/**
 * Replace image paths that point at files which do not exist with `null`.
 *
 * The repo referenced 26 images that were never added, so those pages rendered
 * broken images. Nulling the path lets the template fall back to a Placeholder
 * that names the missing asset, which is both honest in review and stable in
 * layout. The original path is preserved in `image_needed` so the content
 * request list can tell ONEX exactly which shot is missing.
 *
 *     node scripts/null-missing-images.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const DATA = join(ROOT, "src/data");

const FILES = [
  "applications.json",
  "products.json",
  "materials.json",
  "technologies.json",
  "tooling.json",
  "examples.json",
  "blog.json",
];

const exists = (p) =>
  typeof p === "string" && p.startsWith("/")
    ? existsSync(join(PUBLIC, p.slice(1)))
    : true;

let cleared = 0;
const missing = new Set();

/** Walk any object graph and null out dead image paths in place. */
function walk(node) {
  if (Array.isArray(node)) {
    node.forEach(walk);
    return;
  }
  if (!node || typeof node !== "object") return;

  for (const key of ["image", "featured_image", "cover"]) {
    const value = node[key];
    if (typeof value === "string" && value.startsWith("/") && !exists(value)) {
      missing.add(value);
      node[`${key}_needed`] = value;
      node[key] = null;
      cleared++;
    }
  }

  // examples.json holds an `images` array.
  if (Array.isArray(node.images)) {
    const kept = node.images.filter((img) => {
      const path = typeof img === "string" ? img : img?.src;
      if (path && !exists(path)) {
        missing.add(path);
        cleared++;
        return false;
      }
      return true;
    });
    if (kept.length !== node.images.length) {
      node.images_needed = node.images.length - kept.length;
      node.images = kept;
    }
  }

  for (const value of Object.values(node)) walk(value);
}

for (const file of FILES) {
  const path = join(DATA, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  walk(data);
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

console.log(`Cleared ${cleared} dead image reference(s).`);
console.log(`${missing.size} distinct asset(s) ONEX needs to supply:\n`);
for (const m of [...missing].sort()) console.log(`  ${m}`);
