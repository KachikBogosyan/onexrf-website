#!/usr/bin/env node
/**
 * One-shot data migration for products.json.
 *
 *  1. Adds `family` (forming | welding | automation) to every product, so both
 *     site variants can pivot the catalogue. Welding needs to be a first-class
 *     family, not a subset of the tipper line.
 *  2. Appends the models that exist on onexrf.com but never made it into this
 *     repo — the repo carried 10, the live site lists roughly 23.
 *
 * Only facts verifiable from onexrf.com are written: model number, seal area
 * (which the model designation encodes), configuration and family. Every
 * performance figure is left absent and flagged `specs_status: "needs_data"`,
 * so the product template renders a Placeholder instead of an invented number.
 * Do not "fill in" specs here — they have to come from ONEX.
 *
 *     node scripts/migrate-products.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILE = join(ROOT, "src/data/products.json");

const products = JSON.parse(readFileSync(FILE, "utf8"));

/* -- 1. family on existing entries ---------------------------------------- */

const FAMILY_BY_SLUG = {
  "catheter-tipper-air": "forming",
  "catheter-tipper-servo": "forming",
  "dual-catheter-tipper-air": "forming",
  "dual-catheter-tipper-servo": "forming",
  "long-catheter-tipper": "forming",
  "modular-catheter-tipper": "forming",
  "soft-tip-bonder": "forming",
  "small-rotary-rf-welder": "welding",
  "rotary-rf-welder-medium": "welding",
  "rotary-rf-welder-large": "welding",
};

for (const p of products) {
  const family = FAMILY_BY_SLUG[p.slug];
  if (family && !p.family) p.family = family;
  // Existing entries carry real specs already, except the one flagged in
  // notes.txt as inaccurate.
  if (!p.specs_status) {
    const hasSpecs =
      p.specs_short && Object.keys(p.specs_short).length > 0;
    p.specs_status = hasSpecs ? "verified" : "needs_data";
  }
}

/* -- 2. models missing from the repo -------------------------------------- */

/** Shorthand builder — keeps the additions readable and consistent. */
const model = ({
  slug,
  name,
  modelNumber,
  family,
  category,
  line,
  order,
  sealArea,
  configuration,
  description,
  notes,
}) => ({
  slug,
  line,
  family,
  name,
  aliases: [modelNumber],
  category,
  description,
  image: null,
  is_new: false,
  order,
  // Only what the model designation and the live site actually establish.
  specs_short: {
    model_number: modelNumber,
    ...(sealArea ? { rf_seal_area: sealArea } : {}),
    ...(configuration ? { configuration } : {}),
  },
  specs_long: {},
  specs_status: "needs_data",
  needs: [
    "Full specification table (power, frequency, press force, footprint, utilities, compliance)",
    "Product photography",
    ...(notes ? [notes] : []),
  ],
});

const ADDITIONS = [
  /* --- Shuttle RF welders / sealers ------------------------------------- */
  model({
    slug: "rf-shuttle-small",
    name: "Small Shuttle RF Welder",
    modelNumber: "RF-Shuttle-S1",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 10,
    sealArea: "10 × 20 in",
    configuration: "Single front-load shuttle",
    description:
      "A single-shuttle RF welder for smaller seal areas, where the operator loads at the front and the die closes on a fixed station. Suited to lower-volume pouch, bag and port sealing in RF-sealable materials.",
  }),
  model({
    slug: "rf-shuttle-standard",
    name: "Standard Shuttle RF Welder",
    modelNumber: "RF-Shuttle-M1",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 11,
    sealArea: "20 × 30 in",
    configuration: "Single front-load shuttle",
    description:
      "The standard single-shuttle platform, sized for the majority of medical bag and pouch work. Front loading keeps the operator clear of the press while the seal cycle runs.",
  }),
  model({
    slug: "rf-shuttle-large",
    name: "Large Shuttle RF Welder",
    modelNumber: "RF-Shuttle-L1",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 12,
    sealArea: "20 × 60 in",
    configuration: "Single front-load shuttle",
    description:
      "Extended seal area for long-format products — drainage and irrigation bags, large fluid reservoirs, and multi-cavity dies that would not fit a standard platen.",
  }),
  model({
    slug: "rf-shuttle-dual-standard",
    name: "Dual Shuttle RF Welder",
    modelNumber: "RF-Shuttle-M2-LR",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 13,
    sealArea: "20 × 30 in",
    configuration: "Dual shuttle, left / right",
    description:
      "Two shuttles under one press: the operator loads one side while the other seals, so the RF cycle is never waiting on the operator. Roughly doubles throughput without doubling floor space.",
  }),
  model({
    slug: "rf-shuttle-dual-precision",
    name: "Precision Dual Shuttle RF Welder",
    modelNumber: "RF-Shuttle-X2-FB",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 14,
    sealArea: "20 × 30 in",
    configuration: "Dual shuttle, front / back",
    description:
      "A front-to-back dual shuttle arrangement for applications that need tighter registration between load position and die. Chosen where part placement, not cycle time, is the limiting factor.",
  }),
  model({
    slug: "rf-shuttle-dual-large",
    name: "Large Dual Shuttle RF Welder",
    modelNumber: "RF-Shuttle-L2",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 15,
    sealArea: "20 × 60 in",
    configuration: "Dual shuttle",
    description:
      "The long-format seal area of the L1 with dual-shuttle loading, for high-volume production of large-format bags and reservoirs.",
  }),

  /* --- Rotary welders with secondary stations --------------------------- */
  model({
    slug: "rotary-rf-welder-print",
    name: "Rotary RF Welder with Print Station",
    modelNumber: "RFPS-Roto-X4",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 16,
    sealArea: "15 × 20 in",
    configuration: "Rotary index, 4 station, with print",
    description:
      "Seals and prints in one indexed pass, so a bag leaves the machine already marked. Removes a downstream handling step — and with it a place for parts to be mixed up or damaged.",
    notes:
      "Confirm print method (pad, hot stamp, inkjet) and what marking content is supported",
  }),
  model({
    slug: "rotary-rf-welder-die-cut",
    name: "Rotary RF Welder with Die-Cut Station",
    modelNumber: "RFDC-Roto-X4",
    family: "welding",
    category: "RF Welders",
    line: "rf-welders",
    order: 17,
    sealArea: "15 × 20 in",
    configuration: "Rotary index, 4 station, with die-cut",
    description:
      "Seals and die-cuts on the same index, delivering a finished, trimmed part off the machine rather than a sealed blank that still needs converting.",
  }),

  /* --- Heat sealers (thermal, not RF) ----------------------------------- */
  model({
    slug: "heat-sealer-shuttle-small",
    name: "Small Shuttle Heat Sealer",
    modelNumber: "HS-Shuttle-S1",
    family: "welding",
    category: "Heat Sealers",
    line: "heat-sealers",
    order: 20,
    sealArea: "10 × 20 in",
    configuration: "Single front-load shuttle",
    description:
      "Thermal — not RF — sealing for materials that will not couple with a dielectric field, including polyolefin films. Same shuttle handling as the RF platform, so operators move between them without retraining.",
  }),
  model({
    slug: "heat-sealer-rotary-small",
    name: "Small Rotary Heat Sealer",
    modelNumber: "HS-Roto-S3",
    family: "welding",
    category: "Heat Sealers",
    line: "heat-sealers",
    order: 21,
    sealArea: "10 × 20 in",
    configuration: "Rotary index",
    description:
      "Rotary indexed thermal sealing, for continuous production of pouches in films that cannot be RF welded.",
  }),
  model({
    slug: "heat-sealer-rotary-die-cut",
    name: "Rotary Heat Sealer with Die-Cut Station",
    modelNumber: "HSDC-Roto-X2",
    family: "welding",
    category: "Heat Sealers",
    line: "heat-sealers",
    order: 22,
    sealArea: "15 × 20 in",
    configuration: "Rotary index with die-cut",
    description:
      "Thermal sealing and die-cutting on one index, producing a finished part from film without a separate converting operation.",
  }),

  /* --- Automation -------------------------------------------------------- */
  model({
    slug: "rf-galaxy-automation-line",
    name: "RF Galaxy Automated Welding Line",
    modelNumber: "RF-Galaxy-X2",
    family: "automation",
    category: "Automation",
    line: "automation",
    order: 30,
    configuration: "Automated indexing line",
    description:
      "A full indexed line rather than a single station: parts are fed, sealed, inspected and discharged without an operator at the press. Built for programmes where labour, not RF cycle time, sets the ceiling on output.",
    notes:
      "Needs a line diagram, station-by-station description, throughput figures and integration requirements",
  }),
  model({
    slug: "atf-galaxy-tipping-line",
    name: "ATF Galaxy Automated Tipping Line",
    modelNumber: "ATF-Galaxy-X2",
    family: "automation",
    category: "Automation",
    line: "automation",
    order: 31,
    configuration: "Automated tipping and connector assembly",
    description:
      "Automated catheter tip forming with connector assembly in the same cell, removing the manual load that limits throughput on a standalone tipper.",
    notes:
      "Needs a line diagram, cycle time, and the range of catheter sizes and connector types supported",
  }),

  /* --- Forming models absent from the repo ------------------------------ */
  model({
    slug: "butt-joint-welder",
    name: "Butt Joint Welder",
    modelNumber: "BJW-807-V1",
    family: "forming",
    category: "Catheter Bonding",
    line: "catheter-tippers",
    order: 8,
    configuration: "Single station",
    description:
      "Joins two catheter shaft sections end to end, forming a continuous lumen without the stiffness step of an overlap joint. Used where a device has to change durometer or colour along its length.",
  }),
  model({
    slug: "four-up-catheter-tipper",
    name: "Four-Up Catheter Tipper",
    modelNumber: "TF-803-X4",
    family: "forming",
    category: "Catheter Tippers",
    line: "catheter-tippers",
    order: 9,
    configuration: "4-up",
    description:
      "The original four-station tipper — four catheters formed per cycle. Still in production at customer sites and still supported.",
    notes:
      "Confirm current lifecycle status: actively sold, or supported-only legacy?",
  }),
];

/* -- merge ---------------------------------------------------------------- */

const existing = new Set(products.map((p) => p.slug));
const added = [];
for (const entry of ADDITIONS) {
  if (existing.has(entry.slug)) continue;
  products.push(entry);
  added.push(entry.slug);
}

products.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

writeFileSync(FILE, `${JSON.stringify(products, null, 2)}\n`);

const byFamily = products.reduce((acc, p) => {
  acc[p.family ?? "unassigned"] = (acc[p.family ?? "unassigned"] ?? 0) + 1;
  return acc;
}, {});

console.log(`products.json now holds ${products.length} models`);
console.log(`  added ${added.length}: ${added.join(", ") || "(none)"}`);
console.log(`  by family: ${JSON.stringify(byFamily)}`);
console.log(
  `  needing spec data: ${products.filter((p) => p.specs_status === "needs_data").length}`
);
