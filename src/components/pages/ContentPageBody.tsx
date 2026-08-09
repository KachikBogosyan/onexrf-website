import Link from "next/link";
import type { ContentPage } from "@/lib/content-pages";
import { getProductBySlug } from "@/lib/products";
import { getTechnologyBySlug } from "@/lib/technologies";
import { getApplicationBySlug } from "@/lib/applications";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

/** Shared template for topic and service pages. */
export function ContentPageBody({
  page,
  config,
}: {
  page: ContentPage;
  config: SiteConfig;
}) {
  const machines = (page.related?.machines ?? [])
    .map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const technologies = (page.related?.technologies ?? [])
    .map(getTechnologyBySlug)
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const applications = (page.related?.applications ?? [])
    .map(getApplicationBySlug)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const hasRelated =
    machines.length + technologies.length + applications.length > 0;

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {page.title}
            </h1>
            <p className="prose-measure mt-5 text-lg text-text-muted">
              {page.lede}
            </p>
          </div>
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="max-w-3xl space-y-10">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-semibold text-text-heading">
                  {section.heading}
                </h2>
                {section.body && (
                  <p className="prose-measure mt-3 text-text-muted">
                    {section.body}
                  </p>
                )}
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2.5 text-text-muted">
                        <span aria-hidden="true" className="text-accent">
                          &bull;
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            {page.needs?.length ? (
              <Placeholder title="What ONEX still needs to supply for this page">
                <ul className="list-disc space-y-1 pl-5">
                  {page.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              </Placeholder>
            ) : null}
          </div>
        </Container>
      </Section>

      {hasRelated && (
        <Section tone="sunken">
          <Container>
            <SectionHeading eyebrow="Related" title="Where this applies" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine) => (
                <Card
                  key={machine.slug}
                  href={sitePath(config, `/machines/${machine.slug}`)}
                >
                  <p className="eyebrow">Machine</p>
                  <h3 className="mt-1 font-semibold text-text-heading">
                    {machine.name}
                  </h3>
                </Card>
              ))}
              {technologies.map((technology) => (
                <Card
                  key={technology.slug}
                  href={sitePath(
                    config,
                    `/resources/technologies/${technology.slug}`
                  )}
                >
                  <p className="eyebrow">Technology</p>
                  <h3 className="mt-1 font-semibold text-text-heading">
                    {technology.name}
                  </h3>
                </Card>
              ))}
              {applications.map((application) => (
                <Card
                  key={application.slug}
                  href={sitePath(config, `/applications/${application.slug}`)}
                >
                  <p className="eyebrow">Application</p>
                  <h3 className="mt-1 font-semibold text-text-heading">
                    {application.name}
                  </h3>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            {page.cta}.
          </h2>
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

/** Index listing for the services hub. */
export function ContentPageIndex({
  pages,
  config,
  basePath,
  eyebrow,
  title,
  lede,
}: {
  pages: ContentPage[];
  config: SiteConfig;
  basePath: string;
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} />
        </Container>
      </Section>
      <Section className="!pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Card
                key={page.slug}
                href={sitePath(config, `${basePath}/${page.slug}`)}
                className="flex flex-col"
              >
                <h2 className="text-lg font-semibold text-text-heading">
                  {page.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  {page.lede}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Small helper so pages can link out without importing Link everywhere. */
export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-text-link hover:underline">
      {children}
    </Link>
  );
}
