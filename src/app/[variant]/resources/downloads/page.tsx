import type { Metadata } from "next";
import { DownloadsIndex } from "@/components/pages/Downloads";
import { resolveConfig, type VariantParams } from "@/lib/variant";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Brochures, specification sheets and design guides for ONEX RF forming and welding systems.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  return <DownloadsIndex config={resolveConfig(variant)} />;
}
