// app/applications/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getApplicationBySlug } from "@/lib/applications";
import { SolutionModule } from "@/components/SolutionModule";
import { getExamplesForApplicationPage } from "@/lib/examples";
import { ExamplesCarousel } from "@/components/examples/ExamplesCarousel";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return notFound();

  const { name, aliases, description, sub_applications, related } = application;
  const examples = getExamplesForApplicationPage(slug);

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/applications" className="hover:underline">
          Applications
        </Link>{" "}
        / <span className="text-slate-700">{name}</span>
      </nav>

      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Application
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        {aliases && aliases.length > 0 && (
          <p className="text-xs text-slate-500">
            Also known as: {aliases.join(", ")}
          </p>
        )}
        <p className="text-sm text-slate-700 max-w-2xl">{description}</p>
      </header>

      {sub_applications && sub_applications.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Specific Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sub_applications.map((sub) => (
              <Link
                key={sub.slug}
                href={`/applications/${application.slug}/${sub.slug}`}
                className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-semibold">{sub.name}</h3>
                <p className="mt-1 text-xs text-slate-700 line-clamp-3">
                  {sub.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Examples Section */}
      <ExamplesCarousel examples={examples} title="Examples" />

      <SolutionModule
        related={related}
        contextLabel={name}
        title="Solution for this Application"
      />
    </div>
  );
}
