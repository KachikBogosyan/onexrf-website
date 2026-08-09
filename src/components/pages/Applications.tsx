import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getApplications,
  getApplicationBySlug,
  getSubApplicationBySlugs,
} from "@/lib/applications";
import { getTechnologiesForApplication } from "@/lib/reverse";
import { getProductBySlug } from "@/lib/products";
import { getMaterialBySlug } from "@/lib/materials";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { PlaceholderImage } from "@/components/Placeholder";

/* ---------------------------------------------------------------------------
   Index
   ------------------------------------------------------------------------- */

export function ApplicationsIndex({
  config,
  family,
  title,
  lede,
  slugs,
}: {
  config: SiteConfig;
  family?: string;
  title?: string;
  lede?: string;
  /** Restrict to these application slugs — used by the Forming/Welding hubs. */
  slugs?: string[];
}) {
  const all = getApplications();
  const applications = slugs
    ? all.filter((a) => slugs.includes(a.slug))
    : all;

  const totalSub = applications.reduce(
    (n, a) => n + (a.sub_applications?.length ?? 0),
    0
  );

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={family ?? "Applications"}
            title={title ?? "What we make"}
            lede={
              lede ??
              `${totalSub} distinct part geometries across ${applications.length} process families. If yours is not listed, it is usually still within reach — the list reflects what we have been asked for, not what is possible.`
            }
          />
        </Container>
      </Section>

      {applications.map((application) => (
        <Section key={application.slug} className="!py-10">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-bold text-text-heading">
                {application.name}
              </h2>
              <Link
                href={sitePath(config, `/applications/${application.slug}`)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-link"
              >
                Overview
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <p className="prose-measure mt-2 text-text-muted">
              {application.description}
            </p>

            {application.sub_applications?.length ? (
              <ul className="mt-6 flex flex-wrap gap-2">
                {application.sub_applications.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={sitePath(
                        config,
                        `/applications/${application.slug}/${sub.slug}`
                      )}
                      className="inline-block rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm font-medium text-text-link transition-colors hover:border-border-control-accent"
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </Section>
      ))}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Not on the list?
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            Most of what we build started as something a customer could not find
            anywhere else. Send the drawing.
          </p>
          <Button href={sitePath(config, "/contact")} variant="inverse" size="large" className="mt-8">
            Talk to an engineer
          </Button>
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Application detail
   ------------------------------------------------------------------------- */

export function ApplicationDetail({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const application = getApplicationBySlug(slug);
  if (!application) notFound();

  const technologies = getTechnologiesForApplication(slug);
  const products = (application.related?.products ?? [])
    .map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link
              href={sitePath(config, "/applications")}
              className="hover:underline"
            >
              Applications
            </Link>
          </nav>

          <div className="mt-6 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight">
              {application.name}
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              {application.description}
            </p>
          </div>
        </Container>
      </Section>

      {application.sub_applications?.length ? (
        <Section tone="sunken" className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Geometries"
              title={`${application.sub_applications.length} variations we form`}
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {application.sub_applications.map((sub) => (
                <Card
                  key={sub.slug}
                  href={sitePath(
                    config,
                    `/applications/${application.slug}/${sub.slug}`
                  )}
                  className="flex flex-col"
                >
                  <h3 className="font-semibold text-text-heading">
                    {sub.name}
                  </h3>
                  <p className="mt-2 line-clamp-4 flex-1 text-sm text-text-muted">
                    {sub.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {(technologies.length > 0 || products.length > 0) && (
        <Section className="!py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              {technologies.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">How it works</h2>
                  <div className="mt-4 space-y-3">
                    {technologies.map((tech) => (
                      <Card
                        key={tech.slug}
                        href={sitePath(
                          config,
                          `/resources/technologies/${tech.slug}`
                        )}
                      >
                        <h3 className="font-semibold text-text-heading">
                          {tech.name}
                        </h3>
                        <p className="mt-1.5 text-sm text-text-muted">
                          {tech.summary ?? tech.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {products.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Machines</h2>
                  <div className="mt-4 space-y-3">
                    {products.map((product) => (
                      <Card
                        key={product.slug}
                        href={sitePath(config, `/machines/${product.slug}`)}
                      >
                        <h3 className="font-semibold text-text-heading">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm text-text-muted">
                          {product.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Talk through your {application.name.toLowerCase()} process.
          </h2>
          <Button
            href={sitePath(config, `/contact?application=${application.slug}`)}
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

/* ---------------------------------------------------------------------------
   Sub-application detail — the deepest, most specific page on the site, and
   the one most likely to be the entry point from search.
   ------------------------------------------------------------------------- */

export function SubApplicationDetail({
  appSlug,
  subSlug,
  config,
}: {
  appSlug: string;
  subSlug: string;
  config: SiteConfig;
}) {
  const found = getSubApplicationBySlugs(appSlug, subSlug);
  if (!found) notFound();
  const { application, subApp } = found;

  const products = (subApp.related?.products ?? [])
    .map(getProductBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const materials = (subApp.related?.materials ?? [])
    .map(getMaterialBySlug)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link
              href={sitePath(config, "/applications")}
              className="hover:underline"
            >
              Applications
            </Link>
            <span aria-hidden="true"> / </span>
            <Link
              href={sitePath(config, `/applications/${application.slug}`)}
              className="hover:underline"
            >
              {application.name}
            </Link>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow>{application.name}</Eyebrow>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                {subApp.name}
              </h1>
              {subApp.aliases?.length ? (
                <p className="mt-2 text-sm text-text-muted">
                  Also called {subApp.aliases.join(", ")}
                </p>
              ) : null}
              <p className="prose-measure mt-5 text-lg text-text-muted">
                {subApp.description}
              </p>
              <div className="mt-8">
                <Button
                  href={sitePath(config, `/contact?application=${application.slug}`)}
                >
                  Discuss this geometry
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-sunken p-5">
              {subApp.image ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={subApp.image}
                    alt={subApp.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <PlaceholderImage
                  title={`${subApp.name} sample photograph`}
                  ratio="4/3"
                  blocking
                >
                  A macro photograph of the formed part. Buyers judge tip quality
                  visually before they read a single spec — of all the missing
                  assets, these sample shots are the highest value per hour of
                  photography.
                </PlaceholderImage>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {subApp.long_description && (
        <Section tone="sunken" className="!py-14">
          <Container size="narrow">
            <p className="prose-measure text-lg text-text">
              {subApp.long_description}
            </p>
          </Container>
        </Section>
      )}

      {(subApp.use_cases?.length || subApp.process_requirements?.length) && (
        <Section className="!py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              {subApp.use_cases?.length ? (
                <div>
                  <SectionHeading eyebrow="Used in" title="Devices" as="h2" />
                  <ul className="mt-5 space-y-2">
                    {subApp.use_cases.map((useCase) => (
                      <li
                        key={useCase}
                        className="flex gap-2.5 text-text-muted"
                      >
                        <span aria-hidden="true" className="text-accent">
                          &bull;
                        </span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {subApp.process_requirements?.length ? (
                <div>
                  <SectionHeading
                    eyebrow="Process"
                    title="What has to be controlled"
                    as="h2"
                  />
                  <ul className="mt-5 space-y-2">
                    {subApp.process_requirements.map((req) => (
                      <li key={req} className="flex gap-2.5 text-text-muted">
                        <span aria-hidden="true" className="text-accent">
                          &bull;
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      {subApp.details?.length ? (
        <Section tone="sunken" className="!py-14">
          <Container>
            <SectionHeading eyebrow="Detail" title="Typical parameters" />
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {subApp.details.map((detail, i) => (
                    <tr
                      key={detail.label}
                      className={
                        i % 2 ? "bg-surface-sunken" : "bg-surface-raised"
                      }
                    >
                      <th
                        scope="row"
                        className="w-2/5 px-4 py-3 align-top font-medium text-text-muted"
                      >
                        {detail.label}
                      </th>
                      <td className="px-4 py-3 align-top tabular">
                        {detail.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      ) : null}

      {(products.length > 0 || materials.length > 0) && (
        <Section className="!py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              {products.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Machines that do it</h2>
                  <ul className="mt-4 space-y-2">
                    {products.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={sitePath(config, `/machines/${product.slug}`)}
                          className="text-text-link hover:underline"
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {materials.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Materials</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {materials.map((material) => (
                      <li key={material.slug}>
                        <Link
                          href={sitePath(
                            config,
                            `/resources/materials/${material.slug}`
                          )}
                          className="inline-block rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-sm text-text-link hover:border-border-control-accent"
                        >
                          {material.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
