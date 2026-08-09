/**
 * The two site variants.
 *
 * Both render the same page bodies from the same data. They differ only in how
 * the company is *framed*: Site A leads with the customer's outcome, Site B
 * leads with the technology. The scoping note argues for outcome-first
 * (empathy -> conviction -> proof), but capability-first is how the company
 * currently thinks, so both are built and compared before one is promoted.
 *
 * Shared routes (/contact, /quote, /blog, /company) sit outside both prefixes
 * and are linked from either shell.
 */

export type SiteVariant = "outcome" | "capability";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  heading?: string;
  items: NavChild[];
};

export type NavItem = {
  label: string;
  href: string;
  /** Rendered as a mega-menu panel when present. */
  groups?: NavGroup[];
};

export type SiteConfig = {
  variant: SiteVariant;
  basePath: string;
  /** Shown on the variant chooser and the in-page switcher. */
  name: string;
  premise: string;
  nav: NavItem[];
  cta: { label: string; href: string };
};

/**
 * Prefix a site-relative path with the variant's base.
 *
 * Every route lives under a variant, including contact, blog and company, so
 * that each site is genuinely self-contained and a visitor never crosses from
 * one framing into the other. When a variant is promoted to the root, the
 * prefix simply drops away.
 */
export function sitePath(config: SiteConfig, path: string): string {
  if (path.startsWith("http") || path.startsWith("#")) return path;
  return `${config.basePath}${path === "/" ? "" : path}`;
}

/* ---------------------------------------------------------------------------
   Site A — outcome-led
   Nav is the buyer's problem, not our product taxonomy. Machines are reached
   through the outcome they serve.
   ------------------------------------------------------------------------- */

export const outcomeSite: SiteConfig = {
  variant: "outcome",
  basePath: "/outcome",
  name: "Outcome-led",
  premise:
    "Opens on the customer's problem — time and risk — and reaches the machines through the outcome they deliver.",
  cta: { label: "Talk to an engineer", href: "/contact" },
  nav: [
    {
      label: "Launch a device",
      href: "/launch-a-device",
      groups: [
        {
          heading: "From concept to first article",
          items: [
            {
              label: "Prototype samples",
              href: "/topics/prototype-samples",
              description: "Send tubing, get formed parts back",
            },
            {
              label: "Die & mandrel design",
              href: "/services/tooling",
              description: "Tooling designed around your geometry",
            },
            {
              label: "Process development",
              href: "/services/process-development",
              description: "A validated window, not a starting point",
            },
            {
              label: "Material selection",
              href: "/resources/materials",
              description: "14 polymers, with process notes",
            },
          ],
        },
      ],
    },
    {
      label: "Fix yield & scrap",
      href: "/yield-and-scrap",
      groups: [
        {
          heading: "Get the process under control",
          items: [
            {
              label: "Closed-loop control",
              href: "/topics/closed-loop-control",
              description: "Temperature, depth, force, speed",
            },
            {
              label: "Flash & burr elimination",
              href: "/topics/flash-and-burr",
            },
            {
              label: "Arc damage & die life",
              href: "/topics/arc-damage",
            },
            {
              label: "Troubleshoot an application",
              href: "/contact",
            },
          ],
        },
      ],
    },
    {
      label: "Scale to volume",
      href: "/scale-to-volume",
      groups: [
        {
          heading: "More parts per hour, same operator",
          items: [
            {
              label: "Multi-up forming",
              href: "/topics/multi-up-forming",
              description: "2-up and 4-up configurations",
            },
            {
              label: "Rotary welding",
              href: "/topics/rotary-welding",
            },
            {
              label: "Automation & integration",
              href: "/automation",
              description: "Robot-ready systems and full lines",
            },
            {
              label: "All machines",
              href: "/machines",
            },
          ],
        },
      ],
    },
    {
      label: "Keep lines running",
      href: "/keep-lines-running",
      groups: [
        {
          heading: "Uptime, and someone who answers",
          items: [
            {
              label: "Service & repair",
              href: "/services/service-and-repair",
              description: "Repairs in days, not months",
            },
            { label: "Spares & consumables", href: "/services/spares" },
            {
              label: "Operator training",
              href: "/services/training",
            },
            { label: "Remote assist", href: "/services/remote-assist" },
          ],
        },
      ],
    },
    {
      label: "Evidence",
      href: "/evidence",
      groups: [
        {
          items: [
            { label: "Case studies", href: "/evidence/case-studies" },
            {
              label: "Sample gallery",
              href: "/evidence/samples",
              description: "Parts we have formed, with the settings",
            },
            { label: "What customers say", href: "/evidence/testimonials" },
          ],
        },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      groups: [
        {
          items: [
            { label: "How RF forming works", href: "/resources/technologies" },
            { label: "Materials", href: "/resources/materials" },
            { label: "Downloads", href: "/resources/downloads" },
            { label: "Blog", href: "/blog" },
          ],
        },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
   Site B — capability-led
   Nav is the company's technical spine: one RF mastery, two technologies, two
   application families, services on top. Welding sits level with forming.
   ------------------------------------------------------------------------- */

export const capabilitySite: SiteConfig = {
  variant: "capability",
  basePath: "/capability",
  name: "Capability-led",
  premise:
    "Opens on RF heating mastery, then divides into forming and welding as equal application families.",
  cta: { label: "Talk to an engineer", href: "/contact" },
  nav: [
    {
      label: "Forming",
      href: "/forming",
      groups: [
        {
          heading: "Applications",
          items: [
            { label: "Catheter tipping", href: "/applications/catheter-tipping" },
            { label: "Catheter flaring", href: "/applications/catheter-flaring" },
            { label: "Catheter bonding", href: "/applications/catheter-bonding" },
            { label: "All forming applications", href: "/applications" },
          ],
        },
        {
          heading: "Machines",
          items: [
            { label: "Catheter tippers", href: "/machines?family=forming" },
            { label: "Soft-tip bonders", href: "/machines/soft-tip-bonder" },
            { label: "Tooling & dies", href: "/services/tooling" },
          ],
        },
      ],
    },
    {
      label: "Welding",
      href: "/welding",
      groups: [
        {
          heading: "Applications",
          items: [
            {
              label: "Bags, pouches & inflatables",
              href: "/applications/medical-bags-pouches-inflatables",
            },
            { label: "Tube welding", href: "/applications/catheter-bonding/butt-welding" },
            { label: "Seal & print", href: "/machines/rotary-rf-welder-print" },
            { label: "All welding applications", href: "/applications" },
          ],
        },
        {
          heading: "Machines",
          items: [
            { label: "Rotary RF welders", href: "/machines?family=welding" },
            { label: "Shuttle RF welders", href: "/machines?family=welding" },
            { label: "Heat sealers", href: "/machines?family=welding" },
          ],
        },
      ],
    },
    {
      label: "Automation",
      href: "/automation",
      groups: [
        {
          items: [
            {
              label: "Integrated lines",
              href: "/machines/rf-galaxy-automation-line",
              description: "RF-Galaxy-X2 and custom cells",
            },
            {
              label: "Robot-ready systems",
              href: "/machines/atf-galaxy-tipping-line",
              description: "Machines built for cell integration",
            },
            { label: "Retrofit & upgrade", href: "/contact" },
          ],
        },
      ],
    },
    {
      label: "Services",
      href: "/services",
      groups: [
        {
          items: [
            {
              label: "Process development",
              href: "/services/process-development",
            },
            { label: "Tooling & dies", href: "/services/tooling" },
            { label: "Validation support", href: "/services/validation" },
            { label: "Training", href: "/services/training" },
            {
              label: "Service & repair",
              href: "/services/service-and-repair",
            },
          ],
        },
      ],
    },
    {
      label: "Evidence",
      href: "/evidence",
      groups: [
        {
          items: [
            { label: "Case studies", href: "/evidence/case-studies" },
            { label: "Sample gallery", href: "/evidence/samples" },
            { label: "What customers say", href: "/evidence/testimonials" },
          ],
        },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      groups: [
        {
          items: [
            {
              label: "Technologies",
              href: "/resources/technologies",
              description: "Induction, dielectric, RF generators",
            },
            { label: "Materials", href: "/resources/materials" },
            { label: "Downloads", href: "/resources/downloads" },
            { label: "Blog", href: "/blog" },
          ],
        },
      ],
    },
  ],
};

export const SITES: Record<SiteVariant, SiteConfig> = {
  outcome: outcomeSite,
  capability: capabilitySite,
};

/** Company details, used by the footer, contact page and Organization JSON-LD. */
export const COMPANY = {
  /** Single source of truth for the wordmark — see assumption A6. */
  name: "ONEX RF",
  legalName: "ONEX RF Corp.",
  founded: "1991",
  street: "1824 Flower Avenue",
  city: "Duarte",
  region: "CA",
  postalCode: "91010",
  country: "USA",
  phone: "+1 (626) 358-6639",
  phoneHref: "tel:+16263586639",
  email: "results@onexrf.com",
  social: {
    linkedin: "https://www.linkedin.com/company/onex-rf",
    youtube: "https://www.youtube.com/@onexrf",
  },
} as const;
