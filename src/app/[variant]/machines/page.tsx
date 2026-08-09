import type { Metadata } from "next";
import { MachinesIndex } from "@/components/pages/MachinesIndex";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import type { ProductFamily } from "@/lib/products";

export const metadata: Metadata = {
  title: "Machines",
  description:
    "Every ONEX RF platform — catheter forming, RF welding, heat sealing and automation — with configurations and specifications.",
};

export default async function MachinesPage({
  params,
  searchParams,
}: {
  params: VariantParams;
  searchParams: Promise<{ family?: string }>;
}) {
  const { variant } = await params;
  const { family } = await searchParams;
  const config = resolveConfig(variant);

  const validFamily =
    family === "forming" || family === "welding" || family === "automation"
      ? (family as ProductFamily)
      : undefined;

  return <MachinesIndex config={config} family={validFamily} />;
}
