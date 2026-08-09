import Image from "next/image";
import Link from "next/link";
import { FileText, Images, Quote } from "lucide-react";
import {
  getAllCaseStudies,
  getPublishedCaseStudies,
  getAllTestimonials,
  getApprovedTestimonials,
} from "@/lib/evidence";
import { getAllExamples } from "@/lib/examples";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

/* ---------------------------------------------------------------------------
   Hub
   ------------------------------------------------------------------------- */

export function EvidenceHub({ config }: { config: SiteConfig }) {
  const published = getPublishedCaseStudies();
  const drafts = getAllCaseStudies().filter((c) => c.draft);
  const testimonials = getApprovedTestimonials();
  const examples = getAllExamples();

  const sections = [
    {
      icon: FileText,
      href: "/evidence/case-studies",
      title: "Case studies",
      count: published.length,
      pending: drafts.length,
      body: "A customer, a problem, and what changed — the format a buyer can forward to the person holding the budget.",
    },
    {
      icon: Images,
      href: "/evidence/samples",
      title: "Sample gallery",
      count: examples.length,
      pending: 0,
      body: "Parts we have actually formed, photographed close enough to judge.",
    },
    {
      icon: Quote,
      href: "/evidence/testimonials",
      title: "What customers say",
      count: testimonials.length,
      pending: getAllTestimonials().length - testimonials.length,
      body: "Named, attributed, and cleared for publication.",
    },
  ];

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Evidence"
            title="Proof, not adjectives."
            lede="Every manufacturer says they are responsive and precise. This section exists to make the claim checkable — named customers, measured outcomes, and parts you can look at."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {sections.map(({ icon: Icon, ...section }) => (
              <Card
                key={section.href}
                href={sitePath(config, section.href)}
                className="flex flex-col"
              >
                <Icon aria-hidden="true" className="size-6 text-accent" />
                <h2 className="mt-4 text-lg font-semibold text-text-heading">
                  {section.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-text-muted">
                  {section.body}
                </p>
                <p className="mt-4 text-sm font-semibold text-text-link">
                  {section.count} published
                  {section.pending > 0 && (
                    <span className="font-normal text-text-muted">
                      {" "}
                      · {section.pending} awaiting content
                    </span>
                  )}
                </p>
              </Card>
            ))}
          </div>

          {published.length === 0 && (
            <Placeholder
              title="The evidence layer is built but empty"
              blocking
              className="mt-10"
            >
              This is the single largest content gap on the site. The templates,
              routing and schema are all in place — what is missing is cleared
              material. Three tipping case studies already exist on the current
              Servo Tipper page and need extracting and approving; there is no
              welding or automation case study at all, which would restate on
              the new site exactly the imbalance the rebrand is meant to fix.
            </Placeholder>
          )}
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Case studies
   ------------------------------------------------------------------------- */

export function CaseStudiesIndex({ config }: { config: SiteConfig }) {
  const published = getPublishedCaseStudies();
  const drafts = getAllCaseStudies().filter((c) => c.draft);

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Evidence"
            title="Case studies"
            lede="What the problem was, what we did, and what changed."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          {published.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {published.map((study) => (
                <Card
                  key={study.slug}
                  href={sitePath(config, `/evidence/case-studies/${study.slug}`)}
                >
                  <Eyebrow>
                    {study.customer ?? study.customer_anonymised ?? "Customer"}
                  </Eyebrow>
                  <h2 className="mt-1 text-xl font-semibold text-text-heading">
                    {study.title}
                  </h2>
                  <p className="mt-2 text-sm text-text-muted">
                    {study.summary}
                  </p>
                </Card>
              ))}
            </div>
          )}

          {drafts.length > 0 && (
            <div className={published.length > 0 ? "mt-14" : ""}>
              <h2 className="text-xl font-semibold">
                {published.length > 0
                  ? "Also in preparation"
                  : "In preparation"}
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                These are visible in review only. They will not render publicly
                until they carry a cleared narrative and permission to publish.
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {drafts.map((study) => (
                  <Placeholder
                    key={study.slug}
                    title={study.title}
                    blocking={study.family !== "forming"}
                  >
                    {study.summary}
                    {study.needs?.length ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {study.needs.map((need) => (
                          <li key={need}>{need}</li>
                        ))}
                      </ul>
                    ) : null}
                  </Placeholder>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Sample gallery — real photographs that already exist in the repo
   ------------------------------------------------------------------------- */

export function SamplesGallery({ config }: { config: SiteConfig }) {
  const examples = getAllExamples();

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Evidence"
            title="Parts we have formed"
            lede="Photographed close enough to judge the tip, the transition and the finish — which is how the decision actually gets made."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => {
              const image = example.images?.[0];
              return (
                <article
                  key={example.slug}
                  className="overflow-hidden rounded-2xl border border-border bg-surface-raised"
                >
                  <div className="aspect-[4/3] border-b border-border bg-surface-sunken">
                    {image ? (
                      <div className="relative size-full">
                        <Image
                          src={image}
                          alt={example.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-text-heading">
                      {example.title}
                    </h2>
                    <p className="mt-2 text-sm text-text-muted">
                      {example.description}
                    </p>
                    {example.material && (
                      <p className="mt-3 text-xs font-medium text-text-link">
                        {example.material}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <Placeholder title="Expand the gallery" className="mt-10">
            Four samples are photographed. The applications data describes 32
            distinct geometries, and 23 of them reference a sample photograph
            that was never taken. A single photography session against that list
            would do more for this site than any amount of copywriting.
          </Placeholder>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Want one of these in your material?
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            Send tubing and a drawing. We will form samples and send them back.
          </p>
          <Button href={sitePath(config, "/contact")} variant="inverse" size="large" className="mt-8">
            Request prototype samples
          </Button>
        </Container>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Testimonials
   ------------------------------------------------------------------------- */

export function TestimonialsPage() {
  const approved = getApprovedTestimonials();
  const pending = getAllTestimonials().filter((t) => !t.approved);

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Evidence"
            title="What customers say"
            lede="Attributed, with permission. An anonymous quote is decoration, not evidence."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          {approved.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {approved.map((testimonial) => (
                <Card key={testimonial.id}>
                  <blockquote>
                    <p className="text-xl font-semibold text-text-heading">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-4 text-sm text-text-muted">
                      {testimonial.author}
                      {testimonial.role ? ` — ${testimonial.role}` : ""}
                      {testimonial.company ? `, ${testimonial.company}` : ""}
                    </footer>
                  </blockquote>
                </Card>
              ))}
            </div>
          )}

          {pending.length > 0 && (
            <div className={approved.length > 0 ? "mt-14" : ""}>
              <h2 className="text-xl font-semibold">Awaiting approval</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {pending.map((testimonial) => (
                  <Placeholder
                    key={testimonial.id}
                    title={
                      testimonial.quote
                        ? `"${testimonial.quote}" — ${testimonial.author}`
                        : `Account from ${testimonial.author}`
                    }
                    blocking
                  >
                    <p>{testimonial.source}</p>
                    {testimonial.needs?.length ? (
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {testimonial.needs.map((need) => (
                          <li key={need}>{need}</li>
                        ))}
                      </ul>
                    ) : null}
                  </Placeholder>
                ))}
              </div>
            </div>
          )}

          <Placeholder title="Customer logo wall" className="mt-10" blocking>
            Both competitors lead with named customers or logo walls. ONEX has
            over three decades of medical device customers and shows none of
            them. Even a handful of cleared logos would change how the company
            reads to a first-time visitor.
          </Placeholder>
        </Container>
      </Section>
    </>
  );
}
