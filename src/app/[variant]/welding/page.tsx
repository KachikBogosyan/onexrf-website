import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyHub, type FamilyHubContent } from "@/components/pages/FamilyHub";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Welding — RF sealing for bags, pouches and inflatables",
  description:
    "Dielectric RF welding and heat sealing for fluid bags, pouches with ports, cuffs, bladders and tube sets.",
};

const CONTENT: FamilyHubContent = {
  family: "welding",
  eyebrow: "Sealing · pouches · inflatables",
  title: "Fusing two films into one continuous section.",
  lede: "Fluid bags, pouches with ports, blood pressure cuffs, air bladders and tube sets. Dielectric heating deposits energy throughout the material rather than conducting it in from a hot surface, so the seal is not two layers stuck together — it is a single homogeneous piece of polymer.",
  technologySlug: "dielectric-rf-heating",
  applicationSlugs: ["medical-bags-pouches-inflatables"],
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  if (config.variant !== "capability") notFound();
  return <FamilyHub content={CONTENT} config={config} />;
}
