import type { Metadata } from "next";
import { EvidenceHub } from "@/components/pages/Evidence";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "Case studies, formed sample parts and customer accounts from ONEX RF.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <EvidenceHub config={resolveConfig(variant)} />;
}
