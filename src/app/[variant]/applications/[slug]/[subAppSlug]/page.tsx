import type { Metadata } from "next";
import { SubApplicationDetail } from "@/components/pages/Applications";
import { resolveConfig } from "@/lib/variant";
import { getApplications, getSubApplicationBySlugs } from "@/lib/applications";

type Params = Promise<{
  variant: string;
  slug: string;
  subAppSlug: string;
}>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getApplications().flatMap((application) =>
      (application.sub_applications ?? []).map((sub) => ({
        variant,
        slug: application.slug,
        subAppSlug: sub.slug,
      }))
    )
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, subAppSlug } = await params;
  const found = getSubApplicationBySlugs(slug, subAppSlug);
  if (!found) return {};
  return {
    title: `${found.subApp.name} — ${found.application.name}`,
    description: found.subApp.description,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug, subAppSlug } = await params;
  return (
    <SubApplicationDetail
      appSlug={slug}
      subSlug={subAppSlug}
      config={resolveConfig(variant)}
    />
  );
}
