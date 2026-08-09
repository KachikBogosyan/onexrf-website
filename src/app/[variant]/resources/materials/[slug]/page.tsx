import type { Metadata } from "next";
import { MaterialDetail } from "@/components/pages/Materials";
import { resolveConfig } from "@/lib/variant";
import { getAllMaterials, getMaterialBySlug } from "@/lib/materials";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getAllMaterials().map((m) => ({ variant, slug: m.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);
  if (!material) return {};
  return {
    title: `${material.name}${material.aliases?.[0] ? ` (${material.aliases[0]})` : ""}`,
    description: material.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  return <MaterialDetail slug={slug} config={resolveConfig(variant)} />;
}
