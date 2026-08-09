import type { Metadata } from "next";
import { MachineDetail } from "@/components/pages/MachineDetail";
import { resolveConfig } from "@/lib/variant";
import { getAllProducts, getProductBySlug } from "@/lib/products";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getAllProducts().map((product) => ({ variant, slug: product.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const modelNumber = product.aliases?.[0];
  return {
    title: modelNumber ? `${product.name} (${modelNumber})` : product.name,
    description: product.description,
  };
}

export default async function MachinePage({ params }: { params: Params }) {
  const { variant, slug } = await params;
  const config = resolveConfig(variant);
  return <MachineDetail slug={slug} config={config} />;
}
