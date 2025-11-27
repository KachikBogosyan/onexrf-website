import { notFound } from "next/navigation";
import { getMaterialBySlug } from "@/lib/materials";
import { getApplications } from "@/lib/applications";
import Link from "next/link";
import { getExamplesForMaterialPage } from "@/lib/examples";
import { ExamplesCarousel } from "@/components/examples/ExamplesCarousel";
import { PageNav, type Section } from "@/components/PageNav";

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) return notFound();

  const apps = getApplications().filter((a) =>
    a.related.materials?.includes(slug)
  );
  const examples = getExamplesForMaterialPage(slug);

  // Define sections for this page
  const sections: Section[] = [
    ...(apps.length > 0 ? [{ id: 'applications', label: 'Used In' }] : []),
    ...(examples.length > 0 ? [{ id: 'examples', label: 'Examples' }] : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-10">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/materials" className="hover:underline">
          Materials
        </Link>{" "}
        / <span className="text-slate-700">{material.name}</span>
      </nav>

      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Material</p>
        <h1 className="text-3xl font-semibold">{material.name}</h1>
        <p className="max-w-2xl text-sm text-slate-700">{material.description}</p>
      </header>

      <PageNav sections={sections} />

      {/* APPLICATIONS */}
      {apps.length > 0 && (
        <section id="applications">
          <h2 className="text-lg font-semibold mb-2">Used In</h2>
          <ul className="list-disc list-inside text-sm">
            {apps.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/applications/${a.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Examples Section */}
      {examples.length > 0 && (
        <section id="examples">
          <ExamplesCarousel examples={examples} title="Examples" />
        </section>
      )}

      {/* CTA */}
      <section id="contact" className="border-t pt-6">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Discuss your material
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Tell us your durometer, ID/OD, and length; we'll confirm compatibility and tooling.
        </p>
        <Link
          href={`/contact?material=${encodeURIComponent(material.name)}`}
          className="inline-block border border-blue-600 px-3 py-1.5 text-xs text-blue-600 rounded hover:bg-blue-50"
        >
          Contact ONEX About This Material
        </Link>
      </section>
    </div>
  );
}
