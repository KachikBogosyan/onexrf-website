import type { Metadata } from "next";
import { TechnologyDetail } from "@/components/pages/Technologies";
import { resolveConfig } from "@/lib/variant";
import { getAllTechnologies, getTechnologyBySlug } from "@/lib/technologies";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getAllTechnologies().map((t) => ({ variant, slug: t.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const technology = getTechnologyBySlug(slug);
  if (!technology) return {};
  return {
    title: technology.name,
    description: technology.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  return <TechnologyDetail slug={slug} config={resolveConfig(variant)} />;
}
