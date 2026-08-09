import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPageBody } from "@/components/pages/ContentPageBody";
import { resolveConfig } from "@/lib/variant";
import { TOPICS, getTopic } from "@/lib/content-pages";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    TOPICS.map((t) => ({ variant, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  return topic ? { title: topic.title, description: topic.lede } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return <ContentPageBody page={topic} config={resolveConfig(variant)} />;
}
