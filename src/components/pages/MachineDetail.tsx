import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAMILY_LABELS, getProductBySlug } from "@/lib/products";
import {
  getApplicationsUsingProduct,
  getSubApplicationsUsingProduct,
  getMaterialsUsingProduct,
} from "@/lib/reverse";
import { getDownloadsByFamily } from "@/lib/evidence";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import { productSchema } from "@/lib/seo";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  PartNumber,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { PlaceholderImage } from "@/components/Placeholder";
import { SpecTable } from "./SpecTable";
import { DownloadCard } from "./DownloadCard";

export function MachineDetail({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const applications = getApplicationsUsingProduct(slug);
  const subApplications = getSubApplicationsUsingProduct(slug);
  const materials = getMaterialsUsingProduct(slug);
  const downloads = product.family ? getDownloadsByFamily(product.family) : [];

  // Every call to action carries the machine with it, so the enquiry arrives
  // already attached to a product rather than landing on a blank form.
  const contactHref = sitePath(config, `/contact?product=${product.slug}`);
  const quoteHref = sitePath(config, `/quote?product=${product.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
      <Section className="!pb-10">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link href={sitePath(config, "/machines")} className="hover:underline">
              Machines
            </Link>
            {product.category && <span aria-hidden="true"> / </span>}
            {product.category && <span>{product.category}</span>}
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
            <div>
              {product.family && (
                <Eyebrow>{FAMILY_LABELS[product.family]}</Eyebrow>
              )}
              <h1 className="mt-2 text-4xl font-bold tracking-tight">
                {product.name}
              </h1>
              {product.aliases?.[0] && (
                <PartNumber className="mt-3 block text-base text-text-muted">
                  {product.aliases[0]}
                </PartNumber>
              )}
              <p className="prose-measure mt-5 text-lg text-text-muted">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={contactHref}>Talk to an engineer</Button>
                <Button href={quoteHref} variant="secondary">
                  Request a quote
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-sunken p-6">
              {product.image ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              ) : (
                <PlaceholderImage
                  title={`${product.name} photography`}
                  ratio="4/3"
                  blocking
                >
                  A machine shot on white for the catalogue, plus at least one
                  photograph of the platform on a customer floor.
                </PlaceholderImage>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="specs" tone="sunken" className="!py-14">
        <Container>
          <SectionHeading eyebrow="Specification" title="The numbers" />
          <div className="mt-8">
            <SpecTable product={product} />
          </div>
        </Container>
      </Section>

      {(applications.length > 0 || subApplications.length > 0) && (
        <Section className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Applications"
              title="What this machine makes"
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
              {subApplications.slice(0, 6).map(({ application, subApp }) => (
                <Card
                  key={`${application.slug}-${subApp.slug}`}
                  href={sitePath(
                    config,
                    `/applications/${application.slug}/${subApp.slug}`
                  )}
                >
                  <Eyebrow>{application.name}</Eyebrow>
                  <h3 className="mt-1 font-semibold text-text-heading">
                    {subApp.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-muted">
                    {subApp.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {materials.length > 0 && (
        <Section tone="sunken" className="!py-14">
          <Container>
            <SectionHeading
              eyebrow="Materials"
              title="Polymers this platform runs"
            />
            <ul className="mt-6 flex flex-wrap gap-2">
              {materials.map((material) => (
                <li key={material.slug}>
                  <Link
                    href={sitePath(
                      config,
                      `/resources/materials/${material.slug}`
                    )}
                    className="inline-block rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm font-medium text-text-link hover:border-border-control-accent"
                  >
                    {material.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {downloads.length > 0 && (
        <Section className="!py-14">
          <Container>
            <SectionHeading eyebrow="Downloads" title="Take it with you" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {downloads.map((download) => (
                <DownloadCard
                  key={download.slug}
                  download={download}
                  config={config}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Send us the part.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            A drawing and a material is enough to get a real answer about
            whether the {product.name} is the right platform.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={contactHref} variant="inverse" size="large">
              Talk to an engineer
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
