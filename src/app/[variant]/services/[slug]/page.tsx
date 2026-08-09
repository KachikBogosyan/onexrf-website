import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageBody } from "@/components/pages/ContentPageBody";
import { resolveConfig } from "@/lib/variant";
import { SERVICES, getService } from "@/lib/content-pages";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    SERVICES.map((s) => ({ variant, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return service ? { title: service.title, description: service.lede } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ContentPageBody page={service} config={resolveConfig(variant)} />;
}
