import type { Metadata } from "next";
import { CaseStudiesIndex } from "@/components/pages/Evidence";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Case studies",
  description:
    "Customer projects in RF catheter forming, welding and automation.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <CaseStudiesIndex config={resolveConfig(variant)} />;
}
