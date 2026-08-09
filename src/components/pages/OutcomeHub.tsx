import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { getOutcome } from "@/lib/outcomes";
import { getProductsByFamily, FAMILY_LABELS } from "@/lib/products";
import { sitePath, type SiteConfig } from "@/lib/site-config";
import {
  Button,
  Card,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { ProductCard } from "./MachinesIndex";

/**
 * One of Site A's four hubs.
 *
 * Deliberately ordered pain -> answer -> machines. The machines come last
 * because on this variant they are the means, not the subject.
 */
export function OutcomeHub({
  slug,
  config,
}: {
  slug: string;
  config: SiteConfig;
}) {
  const outcome = getOutcome(slug);
  if (!outcome) notFound();

  const machines = outcome.families
    .flatMap((family) => getProductsByFamily(family))
    .slice(0, 6);

  return (
    <>
      <Section tone="inverse" className="!py-16 lg:!py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow !text-accent">{outcome.title}</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-surface">
              {outcome.situation}
            </h1>
            <p className="prose-measure mt-6 text-lg text-text-on-inverse">
              {outcome.lede}
            </p>
            <Button
              href={sitePath(config, "/contact")}
              variant="inverse"
              size="large"
              className="mt-8"
            >
              {outcome.cta}
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What usually goes wrong"
            title="Sound familiar?"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {outcome.pains.map((pain) => (
              <li
                key={pain}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface-sunken p-4"
              >
                <AlertTriangle
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                />
                <span className="text-sm text-text-muted">{pain}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <SectionHeading
            eyebrow="What we do about it"
            title="How this gets solved"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {outcome.answers.map((answer) => (
              <Card key={answer.href} href={sitePath(config, answer.href)}>
                <h3 className="text-lg font-semibold text-text-heading">
                  {answer.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{answer.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {machines.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="The machines"
              title="What actually does the work"
              lede={`Platforms across ${outcome.families
                .map((f) => FAMILY_LABELS[f].toLowerCase())
                .join(" and ")} that apply to this job.`}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {machines.map((machine) => (
                <ProductCard
                  key={machine.slug}
                  product={machine}
                  config={config}
                />
              ))}
            </div>
            <Button
              href={sitePath(config, "/machines")}
              variant="secondary"
              className="mt-8"
            >
              See all machines
            </Button>
          </Container>
        </Section>
      )}

      <Section tone="inverse">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-surface">
            {outcome.cta}.
          </h2>
          <p className="mt-4 text-lg text-text-on-inverse">
            You will get an engineer, not a sales script.
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
