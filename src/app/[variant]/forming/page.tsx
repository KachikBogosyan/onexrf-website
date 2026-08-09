import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyHub, type FamilyHubContent } from "@/components/pages/FamilyHub";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Forming — tipping, bonding, flaring",
  description:
    "RF induction forming for catheters: tipping, flaring, bonding and neckdown, across every thermoplastic.",
};

const CONTENT: FamilyHubContent = {
  family: "forming",
  eyebrow: "Tipping · bonding · flaring",
  title: "Shaping the end of a tube, precisely and repeatably.",
  lede: "Tapers, radii, flares, flanges, soft tips and butt joints — formed by heating a conductive die with an RF field and pressing the polymer into it. Because the die is the heat source, the process runs on any thermoplastic, including materials that cannot be RF welded at all.",
  technologySlug: "rf-induction-heating",
  applicationSlugs: [
    "catheter-tipping",
    "catheter-flaring",
    "catheter-bonding",
  ],
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  if (config.variant !== "capability") notFound();
  return <FamilyHub content={CONTENT} config={config} />;
}
