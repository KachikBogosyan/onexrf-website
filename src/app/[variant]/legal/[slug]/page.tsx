import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section } from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

const PAGES: Record<string, { title: string; body: string; note: string }> = {
  privacy: {
    title: "Privacy policy",
    body: "How ONEX RF collects, uses and stores personal data submitted through this site.",
    note: "Required before any form goes live, and required in a GDPR-specific form before marketing into Europe. Needs drafting with legal input — this is not content that should be generated.",
  },
  terms: {
    title: "Terms of use",
    body: "The terms under which this site and its content may be used.",
    note: "Needs drafting with legal input.",
  },
  accessibility: {
    title: "Accessibility statement",
    body: "ONEX RF aims to meet WCAG 2.2 Level AA across this site.",
    note: "The European Accessibility Act has been enforceable since 28 June 2025 and applies to businesses serving EU consumers, with conformance routed through EN 301 549. Given the European ambition in the scoping note, a published accessibility statement is a market-entry item, not a nicety. This site is built to WCAG 2.2 AA and its contrast is verified automatically, but the statement itself needs an audit behind it before it is published.",
  },
};

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    Object.keys(PAGES).map((slug) => ({ variant, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  return page ? { title: page.title, description: page.body } : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <Section>
      <Container size="narrow">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{page.title}</h1>
        <p className="prose-measure mt-5 text-lg text-text-muted">{page.body}</p>
        <Placeholder title={`${page.title} — needs drafting`} blocking className="mt-10">
          {page.note}
        </Placeholder>
      </Container>
    </Section>
  );
}
