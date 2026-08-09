import type { Metadata } from "next";
import { MaterialsIndex } from "@/components/pages/Materials";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Polymers for RF catheter forming and welding — Pebax, PVC, TPU, PTFE, PEEK and more, with thermal processability and bonding notes.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <MaterialsIndex config={resolveConfig(variant)} />;
}
