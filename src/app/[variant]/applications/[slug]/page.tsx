import type { Metadata } from "next";
import { ApplicationDetail } from "@/components/pages/Applications";
import { resolveConfig } from "@/lib/variant";
import { getApplications, getApplicationBySlug } from "@/lib/applications";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getApplications().map((a) => ({ variant, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return {};
  return { title: application.name, description: application.description };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  return <ApplicationDetail slug={slug} config={resolveConfig(variant)} />;
}
