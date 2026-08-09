import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OutcomeHub } from "@/components/pages/OutcomeHub";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import { getOutcome } from "@/lib/outcomes";

const SLUG = "yield-and-scrap";

export async function generateMetadata(): Promise<Metadata> {
  const outcome = getOutcome(SLUG);
  return outcome
    ? { title: outcome.title, description: outcome.situation }
    : {};
}

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  // Outcome hubs belong to Site A only — Site B reaches the same content
  // through its capability nav instead.
  if (config.variant !== "outcome") notFound();
  return <OutcomeHub slug={SLUG} config={config} />;
}
