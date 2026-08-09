/**
 * URL map from the live HubSpot site to this one.
 *
 * onexrf.com carries roughly four pages per machine — an overview, a spec page,
 * a support page and an RFQ form — plus two generations of HubSpot blog URLs.
 * All of that collapses into one rich page per machine here, so every old URL
 * needs somewhere to land or its ranking is thrown away at cutover.
 *
 * Targets are written root-relative (`/machines/...`). They resolve once a
 * variant is promoted to the root domain; while the comparison is running they
 * point at paths that do not exist yet, which is expected.
 *
 * `scripts/check-redirects.mjs` fetches the live sitemap and reports any URL
 * this map does not cover.
 */

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Live product URL fragment -> machine slug on the new site. */
const MACHINE_URL_SLUGS: Record<string, string> = {
  "servo-tipper-pro": "catheter-tipper-servo",
  "air-tipper": "catheter-tipper-air",
  "ctf-807-lx1": "catheter-tipper-air",
  "ctf-807-lxs1": "catheter-tipper-servo",
  "ctf-807-lx2": "dual-catheter-tipper-air",
  "ctf-807-lxs2": "dual-catheter-tipper-servo",
  "ctf-807-lx3": "long-catheter-tipper",
  "mtf-807-lx1": "modular-catheter-tipper",
  "stb-807-lx1": "soft-tip-bonder",
  "bjw-807-v1": "butt-joint-welder",
  "tf-803-x4": "four-up-catheter-tipper",
  "rf-roto-s3": "small-rotary-rf-welder",
  "rf-roto-m4": "rotary-rf-welder-medium",
  "rf-roto-l6": "rotary-rf-welder-large",
  "rf-shuttle-s1": "rf-shuttle-small",
  "rf-shuttle-m1": "rf-shuttle-standard",
  "rf-shuttle-l1": "rf-shuttle-large",
  "rf-shuttle-m2": "rf-shuttle-dual-standard",
  "rf-shuttle-x2": "rf-shuttle-dual-precision",
  "rf-shuttle-l2": "rf-shuttle-dual-large",
  "rfps-roto-x4": "rotary-rf-welder-print",
  "rfdc-roto-x4": "rotary-rf-welder-die-cut",
  "hs-shuttle-s1": "heat-sealer-shuttle-small",
  "hs-roto-s3": "heat-sealer-rotary-small",
  "hsdc-roto-x2": "heat-sealer-rotary-die-cut",
  "rf-galaxy-x2": "rf-galaxy-automation-line",
  "atf-galaxy-x2": "atf-galaxy-tipping-line",
};

/**
 * The live site encodes the model in the URL suffix, e.g.
 * `/catheter-tipping-flaring-system-overview-servo-tipper-pro`. Matching on the
 * suffix rather than the whole path means the overview/spec/support/RFQ
 * variants all collapse to the same destination without listing each one.
 */
export function machineRedirects(): Redirect[] {
  return Object.entries(MACHINE_URL_SLUGS).map(([fragment, slug]) => ({
    source: `/:prefix*-${fragment}`,
    destination: `/machines/${slug}`,
    permanent: true,
  }));
}

export const STATIC_REDIRECTS: Redirect[] = [
  // --- top-level section pages ---
  { source: "/catheter-tipping-machines", destination: "/machines?family=forming", permanent: true },
  { source: "/catheter-tip-forming-and-flaring-system-in-focus", destination: "/machines?family=forming", permanent: true },
  { source: "/rf-welding-machines", destination: "/machines?family=welding", permanent: true },
  { source: "/rotary-rf-welders-with-turntable-rotary-rf-heat-sealing-machine", destination: "/machines?family=welding", permanent: true },
  { source: "/catheter-tipping-machines-tipping-dies-molds", destination: "/services/tooling", permanent: true },
  { source: "/about-us", destination: "/company", permanent: true },
  { source: "/service-for-rf-welding-and-catheter-tipping-systems", destination: "/services/service-and-repair", permanent: true },
  { source: "/remote-assist", destination: "/services/remote-assist", permanent: true },
  { source: "/training-seminars", destination: "/services/training", permanent: true },

  // --- technology ---
  { source: "/rf-welding-hybrid-generator-technology-for-rf-heating-sealing-machines", destination: "/resources/technologies/hybrid-rf-generator", permanent: true },
  { source: "/catheter-tip-forming-theory", destination: "/resources/technologies/catheter-tip-theory", permanent: true },
  { source: "/rf-welding-theory", destination: "/resources/technologies/rf-welding", permanent: true },

  // --- case studies that exist on the live site ---
  { source: "/smiths-tipping", destination: "/evidence/case-studies", permanent: true },
  { source: "/cr-bard-urine-bag", destination: "/evidence/case-studies", permanent: true },

  // --- legacy HubSpot COS blog URLs ---
  // Two older shapes, both carrying a numeric post id that the new site drops.
  { source: "/blog/:topic/bid/:id/:slug", destination: "/blog/:slug", permanent: true },
  { source: "/news-more-info/:section/bid/:id/:slug", destination: "/blog/:slug", permanent: true },
  { source: "/blog/:topic/:slug", destination: "/blog/:slug", permanent: true },

  // --- the /nd/ tree: internal notes, manuals and video pages, never a
  //     public destination. Sent to contact rather than left to 404. ---
  { source: "/nd/:path*", destination: "/contact", permanent: false },
  { source: "/newsletter-:id", destination: "/blog", permanent: true },

  // --- routes from the previous iteration of this rebuild ---
  { source: "/products", destination: "/machines", permanent: true },
  { source: "/products/:slug", destination: "/machines/:slug", permanent: true },
  { source: "/technologies", destination: "/resources/technologies", permanent: true },
  { source: "/technologies/:slug", destination: "/resources/technologies/:slug", permanent: true },
  { source: "/materials", destination: "/resources/materials", permanent: true },
  { source: "/materials/:slug", destination: "/resources/materials/:slug", permanent: true },
  { source: "/tooling", destination: "/services/tooling", permanent: true },
  { source: "/tooling/:slug", destination: "/services/tooling", permanent: true },
  { source: "/support", destination: "/services", permanent: true },
  { source: "/support/process-development", destination: "/services/process-development", permanent: true },
  { source: "/support/training/:slug*", destination: "/services/training", permanent: true },
  { source: "/support/machine-servicing", destination: "/services/service-and-repair", permanent: true },
];

export function allRedirects(): Redirect[] {
  // Machine redirects use a wildcard prefix, so they must come after the exact
  // static rules or they would swallow them.
  return [...STATIC_REDIRECTS, ...machineRedirects()];
}
