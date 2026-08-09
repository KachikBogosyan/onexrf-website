import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllMaterials, getMaterialBySlug } from "@/lib/materials";
import {
  getApplicationsUsingMaterial,
  getProductsUsingMaterial,
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

/** `durometer_range` -> `Durometer range`. */
const humanise = (key: string) =>
  key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ");

export function MaterialsIndex({ config }: { config: SiteConfig }) {
  const materials = getAllMaterials();

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Materials"
            title="What we can form, weld and seal."
            lede={`${materials.length} polymers, with the process notes that matter — how each behaves under heat, how it bonds, and what the tooling has to account for. Material is usually the first constraint on a process, not the last.`}
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material) => (
              <Card
                key={material.slug}
                href={sitePath(config, `/resources/materials/${material.slug}`)}
                className="flex flex-col"
              >
                {material.aliases?.[0] && (
                  <Eyebrow>{material.aliases[0]}</Eyebrow>
                )}
                <h2 className="mt-1 text-lg font-semibold text-text-heading">
                  {material.name}
                </h2>
                <p className="mt-2 line-clamp-4 flex-1 text-sm text-text-muted">
                  {material.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function MaterialDetail({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const material = getMaterialBySlug(slug);
  if (!material) notFound();

  const applications = getApplicationsUsingMaterial(slug);
  const products = getProductsUsingMaterial(slug);

  const properties = Object.entries(material.properties ?? {}).filter(
    ([, v]) => v
  );
  const processNotes = Object.entries(material.process_notes ?? {}).filter(
    ([, v]) => v
  );

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link
              href={sitePath(config, "/resources/materials")}
              className="hover:underline"
            >
              Materials
            </Link>
          </nav>

          <div className="mt-6 max-w-3xl">
            {material.aliases?.length ? (
              <Eyebrow>{material.aliases.join(" · ")}</Eyebrow>
            ) : null}
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {material.name}
            </h1>
            <p className="mt-5 text-lg text-text-muted">
              {material.description}
            </p>
          </div>
        </Container>
      </Section>

      {material.long_description && (
        <Section tone="sunken" className="!py-14">
          <Container size="narrow">
            <p className="prose-measure text-lg text-text">
              {material.long_description}
            </p>
          </Container>
        </Section>
      )}

      {properties.length > 0 && (
        <Section className="!py-14">
          <Container>
            <SectionHeading eyebrow="Properties" title="Typical values" />
            <p className="mt-3 text-sm text-text-muted">
              Grade- and supplier-dependent. Confirm against your supplier&rsquo;s
              datasheet before designing to these figures.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="sr-only">
                  Typical properties of {material.name}
                </caption>
                <tbody>
                  {properties.map(([key, value], i) => (
                    <tr
                      key={key}
                      className={
                        i % 2 ? "bg-surface-sunken" : "bg-surface-raised"
                      }
                    >
                      <th
                        scope="row"
                        className="w-2/5 px-4 py-3 align-top font-medium text-text-muted"
                      >
                        {humanise(key)}
                      </th>
                      <td className="px-4 py-3 align-top tabular">
                        {Array.isArray(value) ? value.join(", ") : String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      )}

      {processNotes.length > 0 && (
        <Section tone="sunken" className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Process notes"
              title="How it behaves in our machines"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {processNotes.map(([key, value]) => (
                <Card key={key}>
                  <h3 className="font-semibold text-text-heading">
                    {humanise(key)}
                  </h3>
                  <p className="mt-2 text-sm text-text-muted">
                    {String(value)}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {material.biocompatibility && (
        <Section className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Biocompatibility"
              title="Regulatory position"
            />
            <div className="mt-6 max-w-3xl space-y-3 text-text-muted">
              {material.biocompatibility.usage_scope && (
                <p>{material.biocompatibility.usage_scope}</p>
              )}
              {material.biocompatibility.certifications?.length ? (
                <ul className="flex flex-wrap gap-2">
                  {material.biocompatibility.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="rounded-md bg-surface-accent px-2.5 py-1 text-sm font-medium text-text-link"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Container>
        </Section>
      )}

      {(applications.length > 0 || products.length > 0) && (
        <Section tone="sunken" className="!py-14">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2">
              {applications.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">
                    Applications using {material.name}
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {applications.map((app) => (
                      <li key={app.slug}>
                        <Link
                          href={sitePath(config, `/applications/${app.slug}`)}
                          className="text-text-link hover:underline"
                        >
                          {app.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {products.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Machines that run it</h2>
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
            </div>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Running {material.name}?
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            Send us the grade and the geometry. We will tell you whether it
            forms the way you need it to.
          </p>
          <Button
            href={sitePath(config, `/contact?material=${material.slug}`)}
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
