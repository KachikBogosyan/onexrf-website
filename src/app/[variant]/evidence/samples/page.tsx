import type { Metadata } from "next";
import { SamplesGallery } from "@/components/pages/Evidence";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Sample gallery",
  description:
    "Catheter tips, flares and welds formed on ONEX RF machines, photographed in detail.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <SamplesGallery config={resolveConfig(variant)} />;
}
