import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTechnologies,
  getRootTechnologies,
  getAppliedTechnologies,
  getTechnologyBySlug,
} from "@/lib/technologies";
import {
  getApplicationsUsingTechnology,
  getProductsUsingTechnology,
} from "@/lib/reverse";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder, PlaceholderImage } from "@/components/Placeholder";

/* ---------------------------------------------------------------------------
   Index
   ------------------------------------------------------------------------- */

export function TechnologiesIndex({ config }: { config: SiteConfig }) {
  const roots = getRootTechnologies();
  const applied = getAppliedTechnologies();

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Technologies"
            title="How ONEX RF puts heat where it is needed."
            lede="Everything the company makes comes from two ways of using radio frequency. Understanding which one applies to your material is usually the fastest route to the right machine."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <h2 className="text-xl font-semibold">The two root technologies</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {roots.map((tech) => (
              <Card
                key={tech.slug}
                href={sitePath(config, `/resources/technologies/${tech.slug}`)}
                className="flex flex-col"
              >
                <h3 className="text-2xl font-bold text-text-heading">
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
            ))}
          </div>

          <h2 className="mt-16 text-xl font-semibold">Applied topics</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applied.map((tech) => (
              <Card
                key={tech.slug}
                href={sitePath(config, `/resources/technologies/${tech.slug}`)}
              >
                <h3 className="font-semibold text-text-heading">{tech.name}</h3>
                <p className="mt-2 text-sm text-text-muted">
                  {tech.summary ?? tech.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Detail
   ------------------------------------------------------------------------- */

export function TechnologyDetail({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const technology = getTechnologyBySlug(slug);
  if (!technology) notFound();

  const applications = getApplicationsUsingTechnology(slug);
  const products = getProductsUsingTechnology(slug);
  const paragraphs = technology.long_description?.split("\n\n") ?? [];

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link
              href={sitePath(config, "/resources/technologies")}
              className="hover:underline"
            >
              Technologies
            </Link>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              {technology.root_technology && (
                <Eyebrow>Root technology</Eyebrow>
              )}
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                {technology.name}
              </h1>
              {technology.summary && (
                <p className="mt-4 text-xl font-medium text-text-link">
                  {technology.summary}
                </p>
              )}
              <p className="prose-measure mt-5 text-lg text-text-muted">
                {technology.description}
              </p>
              {technology.applies_to && (
                <p className="mt-6 inline-block rounded-lg bg-surface-accent px-3 py-2 text-sm font-medium text-text-link">
                  {technology.applies_to}
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface-sunken p-6">
              {technology.image ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={technology.image}
                    alt={technology.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  title={`${technology.name} diagram`}
                  ratio="4/3"
                >
                  A cross-section or field diagram would carry this explanation
                  far better than prose. This is a drawing, not a photograph —
                  it can be produced without a studio.
                </PlaceholderImage>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {paragraphs.length > 0 && (
        <Section tone="sunken" className="!py-14">
          <Container size="narrow">
            <div className="prose-measure space-y-5 text-lg">
              {paragraphs.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-text" : "text-text-muted"}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {paragraphs.length === 0 && (
        <Section tone="sunken" className="!py-14">
          <Container size="narrow">
            <Placeholder title={`Full explanation of ${technology.name}`}>
              Detailed technical content for this topic exists in the current
              site and in ONEX&rsquo;s training material. It needs porting into
              this template — this is the kind of page that earns organic search
              traffic and establishes authority, so it is worth doing properly
              rather than summarising.
            </Placeholder>
          </Container>
        </Section>
      )}

      {products.length > 0 && (
        <Section className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Machines"
              title="Platforms built on this technology"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.slug}
                  href={sitePath(config, `/machines/${product.slug}`)}
                >
                  <h3 className="font-semibold text-text-heading">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-text-muted">
                    {product.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {applications.length > 0 && (
        <Section tone="sunken" className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Applications"
              title="What it is used to make"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <Card
                  key={app.slug}
                  href={sitePath(config, `/applications/${app.slug}`)}
                >
                  <h3 className="font-semibold text-text-heading">
                    {app.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-text-muted">
                    {app.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Which technology fits your material?
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            It is usually the first question, and it is usually answerable in
            one conversation.
          </p>
          <Button
            href={sitePath(config, `/contact?technology=${technology.slug}`)}
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
