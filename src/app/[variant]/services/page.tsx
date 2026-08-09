import type { Metadata } from "next";
import { ContentPageIndex } from "@/components/pages/ContentPageBody";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import { SERVICES } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Process development, tooling design, validation support, training, service and repair for ONEX RF systems.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return (
    <ContentPageIndex
      pages={SERVICES}
      config={resolveConfig(variant)}
      basePath="/services"
      eyebrow="Services"
      title="The machine is the middle of the job, not the end of it."
      lede="Process development, tooling, validation and service are what turn a machine into parts. They are not add-ons — they are most of what ONEX actually does."
    />
  );
}
