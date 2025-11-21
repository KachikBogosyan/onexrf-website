// app/applications/[slug]/[subAppSlug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSubApplicationBySlugs } from "@/lib/applications";
import { SolutionModule } from "@/components/SolutionModule";

type Props = {
  params: Promise<{ slug: string; subAppSlug: string }>;
};

export default async function SubApplicationPage({ params }: Props) {
  const { slug, subAppSlug } = await params;
  const result = getSubApplicationBySlugs(slug, subAppSlug);
  if (!result) return notFound();

  const { application, subApp } = result;

  // merge related (application + subApp) – simple union
  const mergedRelated = {
    products: Array.from(
      new Set([
        ...(application.related.products || []),
        ...(subApp.related?.products || []),
      ])
    ),
    materials: Array.from(
      new Set([
        ...(application.related.materials || []),
        ...(subApp.related?.materials || []),
      ])
    ),
    tooling: Array.from(
      new Set([
        ...(application.related.tooling || []),
        ...(subApp.related?.tooling || []),
      ])
    ),
    technologies: Array.from(
      new Set([
        ...(application.related.technologies || []),
        ...(subApp.related?.technologies || []),
      ])
    ),
    support: Array.from(
      new Set([
        ...(application.related.support || []),
        ...(subApp.related?.support || []),
      ])
    ),
  };

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/applications" className="hover:underline">
          Applications
        </Link>{" "}
        /{" "}
        <Link
          href={`/applications/${application.slug}`}
          className="hover:underline"
        >
          {application.name}
        </Link>{" "}
        / <span className="text-slate-700">{subApp.name}</span>
      </nav>

      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Application Use Case
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">{subApp.name}</h1>
        <p className="text-sm text-slate-700 max-w-2xl">
          {subApp.description}
        </p>
      </header>

      {/* Placeholder for future image gallery */}
      {subApp.image && (
        <section>
          <img
            src={subApp.image}
            alt={subApp.name}
            className="max-w-md rounded-lg border bg-white"
          />
        </section>
      )}

      <SolutionModule
        related={mergedRelated}
        contextLabel={subApp.name}
        title="Solution for this Use Case"
      />
    </div>
  );
}
