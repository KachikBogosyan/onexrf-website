import type { Metadata } from "next";
import { ApplicationsIndex } from "@/components/pages/Applications";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Applications",
  description:
    "Catheter tipping, flaring, bonding and RF welding applications — the part geometries ONEX RF machines produce.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <ApplicationsIndex config={resolveConfig(variant)} />;
}
