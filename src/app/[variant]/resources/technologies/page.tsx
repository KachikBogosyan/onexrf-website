import type { Metadata } from "next";
import { TechnologiesIndex } from "@/components/pages/Technologies";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "RF induction heating and dielectric RF heating — the two technologies behind ONEX RF catheter forming, welding and sealing systems.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <TechnologiesIndex config={resolveConfig(variant)} />;
}
