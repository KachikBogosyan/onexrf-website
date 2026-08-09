#!/usr/bin/env node
/**
 * WCAG 2.2 AA contrast audit for the ONEX RF token system.
 *
 * Parses the OKLCH values straight out of src/app/globals.css, converts them
 * to sRGB, and asserts every foreground/background pair the design system
 * actually uses. Run it after any token change:
 *
 *     node scripts/check-contrast.mjs
 *
 * Why WCAG 2.x and not APCA: APCA was pulled from the WCAG 3 working draft and
 * has never been reinstated, so 2.x ratios remain the compliance benchmark.
 * EN 301 549 — the route to European Accessibility Act conformance — resolves
 * to WCAG 2.1 AA today and 2.2 AA in v4.1.1.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CSS = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");

/* -- colour conversion ---------------------------------------------------- */

/** OKLCH -> linear sRGB (Ottosson). Returns channels that may be out of gamut. */
function oklchToLinearSrgb(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const encode = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

/** WCAG relative luminance from linear-light sRGB. */
const luminance = ([r, g, b]) =>
  0.2126 * clamp01(r) + 0.7152 * clamp01(g) + 0.0722 * clamp01(b);

const contrast = (l1, l2) =>
  (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

function toHex(linear) {
  return (
    "#" +
    linear
      .map((c) =>
        Math.round(clamp01(encode(clamp01(c))) * 255)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

/** True when the OKLCH triple falls outside the sRGB gamut. */
const outOfGamut = (linear) => linear.some((c) => c < -0.0005 || c > 1.0005);

/* -- token extraction ------------------------------------------------------ */

/**
 * Pull `--color-foo: oklch(L% C H);` declarations from the @theme block.
 * Plain hex values (#fff) are supported too.
 */
function parseTokens(css) {
  const tokens = new Map();
  const oklchRe =
    /--color-([a-z0-9-]+):\s*oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/gi;
  let m;
  while ((m = oklchRe.exec(css))) {
    const [, name, L, C, H] = m;
    if (tokens.has(name)) continue; // first definition wins (light mode)
    const linear = oklchToLinearSrgb(Number(L) / 100, Number(C), Number(H));
    tokens.set(name, {
      linear,
      hex: toHex(linear),
      lum: luminance(linear),
      oklch: `oklch(${L}% ${C} ${H})`,
      gamut: !outOfGamut(linear),
    });
  }
  return tokens;
}

const tokens = parseTokens(CSS);
const WHITE = { hex: "#ffffff", lum: 1, linear: [1, 1, 1], gamut: true };

function get(name) {
  if (name === "white") return WHITE;
  const t = tokens.get(name);
  if (!t) {
    console.error(`  token --color-${name} not found in globals.css`);
    process.exitCode = 1;
    return null;
  }
  return t;
}

/* -- the pairs the design system actually relies on ------------------------ */

// size: "normal" needs 4.5:1, "large" needs 3:1 (>=24px, or >=18.66px bold),
// "ui" is a non-text element (border, focus ring, icon) and needs 3:1.
const PAIRS = [
  // Body and heading text on light surfaces
  ["neutral-12", "white", "normal", "Primary text on white"],
  ["neutral-12", "neutral-1", "normal", "Primary text on page background"],
  ["neutral-12", "neutral-2", "normal", "Primary text on sunken surface"],
  ["neutral-11", "white", "normal", "Muted text on white"],
  ["neutral-11", "neutral-2", "normal", "Muted text on sunken surface"],
  ["brand-12", "white", "normal", "Heading on white"],
  ["brand-12", "brand-2", "normal", "Heading on accent surface"],
  ["brand-11", "white", "normal", "Link on white"],
  ["brand-11", "neutral-2", "normal", "Link on sunken surface"],
  ["brand-11", "brand-2", "normal", "Link on accent surface"],
  ["brand-11", "brand-3", "normal", "Link on component background"],

  // The identity colour. Allowed for large type and UI only — never body text.
  ["brand-9", "white", "large", "Brand anchor as large display type"],
  ["brand-9", "white", "ui", "Brand anchor as icon / rule / mark"],

  // Focus indicators and control boundaries. WCAG 2.2 SC 1.4.11 (Non-text
  // Contrast) and 2.4.13 (Focus Appearance) put a hard 3:1 floor here.
  // Purely decorative rules (--border, --border-subtle, --border-accent) carry
  // no floor and are deliberately not asserted.
  ["brand-9", "white", "ui", "Focus ring on white"],
  ["brand-9", "neutral-2", "ui", "Focus ring on sunken surface"],
  ["brand-9", "brand-2", "ui", "Focus ring on accent surface"],
  ["neutral-9", "white", "ui", "Form control border on white"],
  ["neutral-9", "neutral-2", "ui", "Form control border on sunken surface"],

  // Interactive fills carrying white labels
  ["white", "brand-10", "normal", "White label on action fill"],
  ["white", "brand-11", "normal", "White label on action hover"],
  ["white", "brand-12", "normal", "White text on inverse surface"],
  ["neutral-3", "brand-12", "normal", "Muted text on inverse surface"],

  // Status colours: text weight on their own tinted backgrounds
  ["success-11", "white", "normal", "Success text on white"],
  ["success-11", "success-3", "normal", "Success text on success tint"],
  ["warning-11", "white", "normal", "Warning text on white"],
  ["warning-11", "warning-3", "normal", "Warning text on warning tint"],
  ["danger-11", "white", "normal", "Danger text on white"],
  ["danger-11", "danger-3", "normal", "Danger text on danger tint"],
  ["success-9", "white", "ui", "Success indicator mark"],
  ["warning-9", "white", "ui", "Warning indicator mark"],
  ["danger-9", "white", "ui", "Danger indicator mark"],
];

const MIN = { normal: 4.5, large: 3.0, ui: 3.0 };

/* -- report ---------------------------------------------------------------- */

console.log("\nWCAG 2.2 AA contrast audit — ONEX RF tokens\n");

let failures = 0;
let checked = 0;

for (const [fg, bg, size, label] of PAIRS) {
  const f = get(fg);
  const b = get(bg);
  if (!f || !b) continue;

  const ratio = contrast(f.lum, b.lum);
  const min = MIN[size];
  const pass = ratio >= min;
  checked++;
  if (!pass) failures++;

  const mark = pass ? "PASS" : "FAIL";
  console.log(
    `  ${mark}  ${ratio.toFixed(2).padStart(5)}:1  (needs ${min.toFixed(1)}, ${size.padEnd(6)})  ${label}`
  );
  if (!pass) {
    console.log(
      `        ${fg} ${f.hex} on ${bg} ${b.hex} — darken the foreground or lighten the background`
    );
  }
}

/* -- gamut check ----------------------------------------------------------- */

const clipped = [...tokens.entries()].filter(([, t]) => !t.gamut);
if (clipped.length) {
  console.log("\n  Out of sRGB gamut (will be clipped by the browser):");
  for (const [name, t] of clipped) {
    console.log(`    --color-${name}  ${t.oklch}  ->  ${t.hex}`);
  }
  failures += clipped.length;
}

/* -- the brand anchor must round-trip to #4885b8 --------------------------- */

const anchor = tokens.get("brand-9");
if (anchor) {
  const ok = anchor.hex.toLowerCase() === "#4885b8";
  console.log(
    `\n  ${ok ? "PASS" : "FAIL"}  brand-9 renders ${anchor.hex} (ONEX blue is #4885b8)`
  );
  if (!ok) failures++;
}

/* -- guard the rule that governs the system -------------------------------- */

const b9 = tokens.get("brand-9");
if (b9) {
  const onWhite = contrast(b9.lum, 1);
  if (onWhite >= 4.5) {
    console.log(
      `\n  NOTE  brand-9 now measures ${onWhite.toFixed(2)}:1 on white and could carry body text.` +
        `\n        The "identity only" rule in globals.css can be relaxed.`
    );
  } else {
    console.log(
      `\n  brand-9 measures ${onWhite.toFixed(2)}:1 on white — identity use only,` +
        `\n  as documented in globals.css. Body text and button labels use brand-10/11.`
    );
  }
}

console.log(
  `\n${failures === 0 ? "OK" : "FAILED"} — ${checked - failures}/${checked} pairs pass, ` +
    `${clipped.length} gamut issue(s)\n`
);

process.exit(failures === 0 ? 0 : 1);
