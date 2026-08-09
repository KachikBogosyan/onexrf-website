import { Mail, MapPin, Phone } from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { getApplicationBySlug } from "@/lib/applications";
import { getMaterialBySlug } from "@/lib/materials";
import { getTechnologyBySlug } from "@/lib/technologies";
import { COMPANY, type SiteConfig } from "@/lib/site-config";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";
import { HubSpotForm } from "@/components/HubSpotForm";

export type EnquiryContext = {
  type: "product" | "application" | "material" | "technology";
  name: string;
  slug: string;
} | null;

/**
 * Resolve `?product=`/`?application=`/`?material=`/`?technology=` into a named
 * context.
 *
 * Every call to action on the site carries the thing it was clicked from, so an
 * enquiry arrives already attached to a machine or a geometry. The scoping
 * note's second finding is that today's CTAs are generic and land on the
 * homepage, losing whatever the visitor was actually looking at.
 */
export function resolveEnquiryContext(params: {
  product?: string;
  application?: string;
  material?: string;
  technology?: string;
}): EnquiryContext {
  if (params.product) {
    const product = getProductBySlug(params.product);
    if (product)
      return { type: "product", name: product.name, slug: product.slug };
  }
  if (params.application) {
    const application = getApplicationBySlug(params.application);
    if (application)
      return {
        type: "application",
        name: application.name,
        slug: application.slug,
      };
  }
  if (params.material) {
    const material = getMaterialBySlug(params.material);
    if (material)
      return { type: "material", name: material.name, slug: material.slug };
  }
  if (params.technology) {
    const technology = getTechnologyBySlug(params.technology);
    if (technology)
      return {
        type: "technology",
        name: technology.name,
        slug: technology.slug,
      };
  }
  return null;
}

const CONTEXT_LABEL: Record<NonNullable<EnquiryContext>["type"], string> = {
  product: "About",
  application: "About",
  material: "About",
  technology: "About",
};

export function ContactPage({
  context,
  mode = "contact",
}: {
  context: EnquiryContext;
  config: SiteConfig;
  mode?: "contact" | "quote";
}) {
  const isQuote = mode === "quote";

  return (
    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>{isQuote ? "Request a quote" : "Contact"}</Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {isQuote
                ? "Tell us what you need to make."
                : "Talk to an engineer."}
            </h1>
            <p className="prose-measure mt-5 text-lg text-text-muted">
              {isQuote
                ? "A drawing, a material and a volume is enough to put a real number in front of you. Quotes come from the engineers who would build the system, so they reflect what the job actually involves."
                : "Not a sales queue. The person who replies understands the process, the regulatory context, and what your part has to do."}
            </p>

            {context && (
              <div className="mt-6 rounded-xl border border-border-accent bg-surface-accent p-4">
                <p className="text-sm text-text-muted">
                  {CONTEXT_LABEL[context.type]}
                </p>
                <p className="font-semibold text-text-link">{context.name}</p>
              </div>
            )}

            <dl className="mt-10 space-y-5">
              <div className="flex gap-3">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <div>
                  <dt className="text-sm font-medium text-text">Phone</dt>
                  <dd>
                    <a
                      href={COMPANY.phoneHref}
                      className="text-text-link hover:underline"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <div>
                  <dt className="text-sm font-medium text-text">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-text-link hover:underline"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <div>
                  <dt className="text-sm font-medium text-text">
                    United States
                  </dt>
                  <dd className="text-text-muted">
                    {COMPANY.street}, {COMPANY.city}, {COMPANY.region}{" "}
                    {COMPANY.postalCode}
                  </dd>
                </div>
              </div>
            </dl>

            <Placeholder title="European contact route" className="mt-8">
              A visitor in Europe currently has one option: call California. The
              scoping note proposes displaying an EU address now, ahead of any
              physical footprint, precisely so this page does not read as
              &ldquo;we are somewhere else&rdquo;.
            </Placeholder>
          </div>

          <div className="rounded-2xl border border-border bg-surface-raised p-6 lg:p-8">
            <HubSpotForm
              context={
                context
                  ? {
                      type: context.type,
                      name: context.name,
                      slug: context.slug,
                    }
                  : null
              }
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
