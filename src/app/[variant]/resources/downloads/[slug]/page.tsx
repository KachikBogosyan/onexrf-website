import type { Metadata } from "next";
import { DownloadDetail } from "@/components/pages/Downloads";
import { resolveConfig } from "@/lib/variant";
import { getAllDownloads, getDownloadBySlug } from "@/lib/evidence";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getAllDownloads().map((d) => ({ variant, slug: d.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const download = getDownloadBySlug(slug);
  if (!download) return {};
  return { title: download.title, description: download.description };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  return <DownloadDetail slug={slug} config={resolveConfig(variant)} />;
}
