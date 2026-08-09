import { ArrowRight, Cpu, Radio, Workflow } from "lucide-react";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  PartNumber,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder, PlaceholderImage } from "@/components/Placeholder";
import { getRootTechnologies } from "@/lib/technologies";
import { getProductsByFamily } from "@/lib/products";
import { getCompany } from "@/lib/evidence";
import { sitePath, type SiteConfig } from "@/lib/site-config";

/* The two application families, deliberately rendered from one array with one
   card component. Welding is not a subsection of forming — the scoping note's
   fifth finding is that treating it as one is the problem. */
const FAMILIES = [
  {
    key: "forming" as const,
    href: "/forming",
    title: "Forming",
    strapline: "Tipping · bonding · flaring",
    body: "Shaping the end of a thermoplastic tube — tapers, radii, flares, flanges and soft tips — by heating a conductive die and pressing the polymer into it.",
  },
  {
    key: "welding" as const,
    href: "/welding",
    title: "Welding",
    strapline: "Sealing · pouches · inflatables",
    body: "Fusing two layers of polar film into one homogeneous section: fluid bags, pouches with ports, cuffs, bladders and tube sets.",
  },
];

const SERVICES = [
  {
    href: "/services/process-development",
    title: "Process development",
    body: "A validated window, not a starting point.",
  },
  {
    href: "/services/tooling",
    title: "Tooling & dies",
    body: "Dies and mandrels designed around your geometry.",
  },
  {
    href: "/services/validation",
    title: "Validation support",
    body: "Documentation that fits your IQ/OQ plan.",
  },
  {
    href: "/services/service-and-repair",
    title: "Service & repair",
    body: "From the engineers who built the machine.",
  },
];

const TECH_ICON = {
  "rf-induction-heating": Radio,
  "dielectric-rf-heating": Cpu,
} as const;

export function CapabilityHome({ config }: { config: SiteConfig }) {
  const rootTechnologies = getRootTechnologies();
  const company = getCompany();
  const automation = getProductsByFamily("automation");

  return (
    <>
      {/* --- Hero: the competence, stated plainly ------------------------- */}
      <Section tone="inverse" className="pb-20 pt-16 lg:pb-28 lg:pt-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Eyebrow className="!text-accent">
                Vertically integrated since {company.timeline[0].year}
              </Eyebrow>
              <h1 className="mt-3 text-5xl font-bold tracking-tight text-surface">
                We are masters of RF heating.
              </h1>
              <p className="prose-measure mt-6 text-lg text-text-on-inverse">
                Not a catheter tipping company that also welds. One competence —
                controlling radio-frequency energy precisely enough to shape
                medical-grade polymer — expressed through two technologies and
                two application families. We build everything ourselves, down to
                the generators, because that is the only way to hold the
                standard.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={sitePath(config, "/resources/technologies")}
                  variant="inverse"
                  size="large"
                >
                  How the technology works
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <Button
                  href={sitePath(config, "/machines")}
                  variant="ghost"
                  size="large"
                  className="!text-surface hover:!bg-white/10"
                >
                  See all machines
                </Button>
              </div>
            </div>

            <PlaceholderImage
              title="Hero photography"
              ratio="4/3"
              tone="inverse"
              blocking
            >
              The workshop, or a generator being built. Vertical integration is
              the central claim on this page and it is currently invisible —
              a photograph of the electronics being assembled in house proves it
              faster than a paragraph can.
            </PlaceholderImage>
          </div>
        </Container>
      </Section>

      {/* --- The two root technologies ------------------------------------ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Two technologies"
            title="Two ways to put heat exactly where it is needed."
            lede="Both are radio frequency. The difference is what absorbs the energy — and that difference decides which materials you can run, and which machine you need."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {rootTechnologies.map((tech) => {
              const Icon =
                TECH_ICON[tech.slug as keyof typeof TECH_ICON] ?? Radio;
              return (
                <Card
                  key={tech.slug}
                  href={sitePath(config, `/resources/technologies/${tech.slug}`)}
                  className="flex flex-col"
                >
                  <Icon aria-hidden="true" className="size-7 text-accent" />
                  <h3 className="mt-4 text-2xl font-bold text-text-heading">
                    {tech.name}
                  </h3>
                  {tech.summary && (
                    <p className="mt-2 text-lg font-medium text-text-link">
                      {tech.summary}
                    </p>
                  )}
                  <p className="mt-3 flex-1 text-sm text-text-muted">
                    {tech.description}
                  </p>
                  {tech.applies_to && (
                    <p className="mt-4 border-t border-border-subtle pt-3 text-xs font-medium text-text-muted">
                      {tech.applies_to}
                    </p>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- The two application families, at equal weight ---------------- */}
      <Section tone="sunken">
        <Container>
          <SectionHeading
            eyebrow="Two application families"
            title="Forming and welding, on equal footing."
            lede="They use different physics and different machines, but they come from the same mastery. Neither is a sideline."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {FAMILIES.map((family) => {
              const machines = getProductsByFamily(family.key);
              return (
                <Card key={family.key} className="flex flex-col">
                  <Eyebrow>{family.strapline}</Eyebrow>
                  <h3 className="mt-2 text-3xl font-bold text-text-heading">
                    {family.title}
                  </h3>
                  <p className="mt-3 text-text-muted">{family.body}</p>

                  <p className="mt-5 text-sm font-semibold text-text">
                    {machines.length} platforms
                  </p>
                  <ul className="mt-2 space-y-1">
                    {machines.slice(0, 4).map((machine) => (
                      <li
                        key={machine.slug}
                        className="flex items-baseline gap-2 text-sm"
                      >
                        <PartNumber className="shrink-0 text-xs text-text-muted">
                          {machine.aliases?.[0] ?? "—"}
                        </PartNumber>
                        <span className="text-text-muted">{machine.name}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={sitePath(config, family.href)}>
                      {family.title} applications
                    </Button>
                    <Button
                      href={sitePath(config, `/machines?family=${family.key}`)}
                      variant="secondary"
                    >
                      Machines
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* --- Automation --------------------------------------------------- */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Delivered as a system"
                title="Automation & integration"
                lede="A machine solves a process problem. A line solves a business problem. Both Galaxy platforms take the operator out of the cycle so throughput stops being a function of headcount."
              />
              <ul className="mt-6 space-y-3">
                {automation.map((machine) => (
                  <li key={machine.slug} className="flex items-start gap-3">
                    <Workflow
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-accent"
                    />
                    <div>
                      <p className="font-semibold text-text">{machine.name}</p>
                      <p className="text-sm text-text-muted">
                        {machine.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                href={sitePath(config, "/automation")}
                className="mt-8"
              >
                Automation &amp; integration
              </Button>
            </div>

            <Placeholder title="Automation video" kind="video" blocking>
              A line running is the single most persuasive automation asset
              there is, and no footage exists on the site today. Even a phone
              recording of an RF-Galaxy or ATF-Galaxy cell in motion would
              outperform any description of it.
            </Placeholder>
          </div>
        </Container>
      </Section>

      {/* --- Services ----------------------------------------------------- */}
      <Section tone="sunken">
        <Container>
          <SectionHeading
            eyebrow="Delivered as services"
            title="The machine is the middle of the job, not the end of it."
            lede="Process development, tooling, validation and service are not add-ons — they are what makes a machine produce parts instead of occupying floor space."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Card key={service.href} href={sitePath(config, service.href)}>
                <h3 className="font-semibold text-text-heading">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{service.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- Capture ------------------------------------------------------ */}
      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Bring us a process problem.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            A drawing and a material is enough for us to tell you which
            technology applies, and whether we are the right people for it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={sitePath(config, "/contact")} variant="inverse" size="large">
              Talk to an engineer
            </Button>
            <Button
              href={sitePath(config, "/quote")}
              variant="ghost"
              size="large"
              className="!text-surface hover:!bg-white/10"
            >
              Request a quote
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
