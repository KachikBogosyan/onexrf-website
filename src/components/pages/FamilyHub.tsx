import { getApplications } from "@/lib/applications";
import { getProductsByFamily, type ProductFamily } from "@/lib/products";
import { getAllTechnologies } from "@/lib/technologies";
import { getCaseStudiesByFamily } from "@/lib/evidence";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";
import { ProductCard } from "./MachinesIndex";

export type FamilyHubContent = {
  family: ProductFamily;
  eyebrow: string;
  title: string;
  lede: string;
  /** Which root technology this family runs on. */
  technologySlug: string;
  /** Application slugs that belong to this family. */
  applicationSlugs: string[];
};

/**
 * Site B's Forming and Welding hubs.
 *
 * Both render from the same component on purpose — the scoping note's fifth
 * finding is that welding is treated as a lesser sibling of forming, and one
 * shared template makes structural parity a property of the code rather than
 * something to remember.
 */
export function FamilyHub({
  content,
  config,
}: {
  content: FamilyHubContent;
  config: SiteConfig;
}) {
  const machines = getProductsByFamily(content.family);
  const technology = getAllTechnologies().find(
    (t) => t.slug === content.technologySlug
  );
  const applications = getApplications().filter((a) =>
    content.applicationSlugs.includes(a.slug)
  );
  const caseStudies = getCaseStudiesByFamily(content.family);

  return (
    <>
      <Section tone="inverse" className="!py-16 lg:!py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow !text-accent">{content.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-surface">
              {content.title}
            </h1>
            <p className="prose-measure mt-6 text-lg text-text-on-inverse">
              {content.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={sitePath(config, `/machines?family=${content.family}`)}
                variant="inverse"
                size="large"
              >
                {machines.length} machines
              </Button>
              <Button
                href={sitePath(config, "/contact")}
                variant="ghost"
                size="large"
                className="!text-surface hover:!bg-white/10"
              >
                Talk to an engineer
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {technology && (
        <Section>
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <SectionHeading
                eyebrow="The physics"
                title="How it works"
                as="h2"
              />
              <div>
                <h3 className="text-2xl font-bold text-text-heading">
                  {technology.name}
                </h3>
                {technology.summary && (
                  <p className="mt-2 text-lg font-medium text-text-link">
                    {technology.summary}
                  </p>
                )}
                <p className="prose-measure mt-4 text-text-muted">
                  {technology.description}
                </p>
                <Button
                  href={sitePath(
                    config,
                    `/resources/technologies/${technology.slug}`
                  )}
                  variant="secondary"
                  className="mt-6"
                >
                  Read the full explanation
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {applications.length > 0 && (
        <Section tone="sunken">
          <Container>
            <SectionHeading
              eyebrow="Applications"
              title="What it makes"
              as="h2"
            />
            <div className="mt-10 space-y-8">
              {applications.map((application) => (
                <div key={application.slug}>
                  <h3 className="text-xl font-semibold text-text-heading">
                    {application.name}
                  </h3>
                  <p className="prose-measure mt-2 text-sm text-text-muted">
                    {application.description}
                  </p>
                  {application.sub_applications?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {application.sub_applications.map((sub) => (
                        <li key={sub.slug}>
                          <a
                            href={sitePath(
                              config,
                              `/applications/${application.slug}/${sub.slug}`
                            )}
                            className="inline-block rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm font-medium text-text-link transition-colors hover:border-border-control-accent"
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <SectionHeading eyebrow="Machines" title="The platforms" as="h2" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {machines.map((machine) => (
              <ProductCard
                key={machine.slug}
                product={machine}
                config={config}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <SectionHeading eyebrow="Evidence" title="Proof" as="h2" />
          {caseStudies.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {caseStudies.map((study) => (
                <Card
                  key={study.slug}
                  href={sitePath(config, `/evidence/case-studies/${study.slug}`)}
                >
                  <h3 className="font-semibold text-text-heading">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {study.summary}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Placeholder
              title={`No published ${content.family} case study`}
              blocking
              className="mt-8"
            >
              This section is built and empty. Publishing a site where forming
              has case studies and {content.family} does not would restate the
              exact imbalance the rebrand is meant to correct.
            </Placeholder>
          )}
        </Container>
      </Section>

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Bring us the part.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            A drawing and a material is enough to get a real answer.
          </p>
          <Button
            href={sitePath(config, "/contact")}
            variant="inverse"
            size="large"
            className="mt-8"
          >
            Talk to an engineer
          </Button>
        </Container>
      </Section>
    </>
  );
}
