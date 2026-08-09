import type { Metadata } from "next";
import { FamilyHub, type FamilyHubContent } from "@/components/pages/FamilyHub";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Automation & integration",
  description:
    "Robot-ready RF systems and complete automated indexing lines for catheter forming and RF welding.",
};

const CONTENT: FamilyHubContent = {
  family: "automation",
  eyebrow: "Integration · lines · cells",
  title: "Taking the operator out of the cycle.",
  lede: "A machine solves a process problem; a line solves a business problem. When throughput is limited by how fast someone can load rather than by the RF cycle, the answer is not a faster machine — it is a cell that does not wait for a person.",
  technologySlug: "hybrid-rf-generator",
  applicationSlugs: [],
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  // Unlike /forming and /welding, this page exists on both variants: Site A's
  // "Scale to volume" hub needs somewhere to send a reader whose bottleneck is
  // the operator rather than the cycle.
  return <FamilyHub content={CONTENT} config={config} />;
}
