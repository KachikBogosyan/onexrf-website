import { notFound } from "next/navigation";
import { getToolingBySlug } from "@/lib/tooling";
import Link from "next/link";
import { getApplications } from "@/lib/applications";

export default async function ToolingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tooling = getToolingBySlug(slug);

  if (!tooling) return notFound();

  // reverse lookup based on tooling.related
  const apps = getApplications().filter((a) =>
    a.related.tooling?.includes(slug)
  );

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Tooling</p>
        <h1 className="text-3xl font-semibold">{tooling.name}</h1>
        <p className="max-w-2xl text-sm text-slate-700">{tooling.description}</p>
      </header>

      {/* IMAGE */}
      {tooling.image && (
        <img
          src={tooling.image}
          alt={tooling.name}
          className="max-w-md rounded-lg border"
        />
      )}

      {/* APPLICATIONS */}
      {apps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Applications</h2>
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

      {/* CTA */}
      <section className="border-t pt-6">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Request tooling consultation
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Provide catheter drawings and material to scope your custom die or mandrel.
        </p>
        <Link
          href={`/contact?tooling=${encodeURIComponent(tooling.name)}`}
          className="inline-block border border-blue-600 px-3 py-1.5 text-xs text-blue-600 rounded hover:bg-blue-50"
        >
          Contact ONEX About This Tooling
        </Link>
      </section>
    </div>
  );
}
