import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  getProductsGroupedByCategory,
  FAMILY_LABELS,
  type Product,
  type ProductFamily,
} from "@/lib/products";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Container,
  PartNumber,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { PlaceholderImage } from "@/components/Placeholder";

export function ProductCard({
  product,
  config,
}: {
  product: Product;
  config: SiteConfig;
}) {
  const href = sitePath(config, `/machines/${product.slug}`);
  const modelNumber = product.aliases?.[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised transition-colors hover:border-border-control-accent">
      <div className="aspect-[4/3] bg-surface-sunken p-4">
        {product.image ? (
          <div className="relative size-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <PlaceholderImage
            title={`${product.name} photography`}
            ratio="4/3"
            className="!h-full"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {modelNumber && (
          <PartNumber className="text-xs text-text-muted">
            {modelNumber}
          </PartNumber>
        )}
        <h3 className="mt-1 text-lg font-semibold text-text-heading">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-text-muted">
          {product.description}
        </p>
        <a
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-text-link"
        >
          {product.specs_status === "verified"
            ? "See the full spec"
            : "See configuration"}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  );
}

export function MachinesIndex({
  config,
  family,
  title,
  lede,
}: {
  config: SiteConfig;
  family?: ProductFamily;
  title?: string;
  lede?: string;
}) {
  const groups = getProductsGroupedByCategory(family);
  const total = groups.reduce((n, g) => n + g.products.length, 0);

  return (
    <>
      <Section className="!pb-8">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={family ? FAMILY_LABELS[family] : "Machines"}
            title={title ?? (family ? `${FAMILY_LABELS[family]} machines` : "All machines")}
            lede={
              lede ??
              `${total} platforms, all built on the same RF competence. Every one is designed and manufactured in house, which is why the process can be changed after it ships.`
            }
          />
        </Container>
      </Section>

      {groups.map((group) => (
        <Section key={group.category} className="!py-8">
          <Container>
            <h2 className="text-xl font-semibold text-text-heading">
              {group.category}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.products.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  config={config}
                />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="sunken">
        <Container size="narrow" className="text-center">
          <h2 className="text-2xl font-bold">
            Not sure which platform fits your part?
          </h2>
          <p className="mt-3 text-text-muted">
            Send the drawing and the material. We will tell you which machine
            forms it — and if none of ours does, we will say that too.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href={sitePath(config, "/contact")}>Talk to an engineer</Button>
            <Button href={sitePath(config, "/quote")} variant="secondary">
              Request a quote
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
