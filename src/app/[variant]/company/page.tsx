import type { Metadata } from "next";
import { getCompany } from "@/lib/evidence";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import { COMPANY, sitePath } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "About ONEX RF",
  description:
    "Vertically integrated since 1991 — ONEX RF designs and builds its own RF generators, controls and mechanics for medical device manufacturing.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  const company = getCompany();

  return (
    <>
      <Section tone="inverse" className="!py-16 lg:!py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow !text-accent">About {COMPANY.name}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-surface">
              {company.positioning}
            </h1>
            <p className="prose-measure mt-6 text-lg text-text-on-inverse">
              {company.summary}
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What makes it possible"
            title="Why building it ourselves matters"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {company.differentiators.map((item) => (
              <Card key={item.title} tone="sunken">
                <h3 className="text-lg font-semibold text-text-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <SectionHeading
            eyebrow="History"
            title="Three decades, one competence"
            lede="ONEX did not start as an RF company. It started as engineers solving automation problems, and narrowed to the thing it turned out to be exceptional at."
          />
          <ol className="mt-10 max-w-3xl space-y-6 border-l-2 border-border-accent pl-6">
            {company.timeline.map((entry) => (
              <li key={entry.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-accent"
                />
                <p className="part-number text-sm font-semibold text-text-link">
                  {entry.year}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-text-heading">
                  {entry.title}
                </h3>
                <p className="mt-1 text-text-muted">{entry.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Still needed"
            title="What this page cannot say yet"
            lede="A company page is where a cautious buyer decides whether you are real. These gaps are the ones a procurement or quality reviewer will notice first."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {company.needs.map((need) => (
              <Placeholder
                key={need}
                title={need}
                blocking={need.toLowerCase().includes("iso")}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            Come and see how it is built.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            {COMPANY.city}, {COMPANY.region} — and increasingly, wherever your
            line is.
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
