import type { Metadata } from "next";
import { OutcomeHome } from "@/components/pages/OutcomeHome";
import { CapabilityHome } from "@/components/pages/CapabilityHome";
import { resolveConfig, type VariantParams } from "@/lib/variant";

const META: Record<string, Metadata> = {
  outcome: {
    title: "A line that runs, and makes perfect parts",
    description:
      "RF forming, welding and automation for medical devices — quoted in weeks, repaired in days, supported by the engineers who built the machine.",
  },
  capability: {
    title: "Masters of RF heating",
    description:
      "RF induction and dielectric heating for medical device manufacturing: catheter forming, RF welding and automation, built in house down to the generators.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: VariantParams;
}): Promise<Metadata> {
  const { variant } = await params;
  return META[variant] ?? {};
}

export default async function VariantHome({
  params,
}: {
  params: VariantParams;
}) {
  const { variant } = await params;
  const config = resolveConfig(variant);

  return config.variant === "outcome" ? (
    <OutcomeHome config={config} />
  ) : (
    <CapabilityHome config={config} />
  );
}
