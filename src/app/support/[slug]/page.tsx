import { notFound } from "next/navigation";
import { getSupportBySlug } from "@/lib/support";
import Link from "next/link";

export default async function SupportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const support = getSupportBySlug(slug);

  if (!support) return notFound();

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Support</p>
        <h1 className="text-3xl font-semibold">{support.name}</h1>
        <p className="max-w-2xl text-sm text-slate-700">
          {support.description}
        </p>
      </header>

      {/* Process Steps */}
      {support.process_steps && support.process_steps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Process Steps</h2>
          <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
            {support.process_steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {/* Included With */}
      {support.included_with && support.included_with.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Included With</h2>
          <ul className="list-disc list-inside text-sm text-slate-700">
            {support.included_with.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="border-t pt-6">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Request application support
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Provide catheter dimensions, material, and your goals; our engineers will assist.
        </p>
        <Link
          href={`/contact?support=${encodeURIComponent(support.name)}`}
          className="inline-block border border-blue-600 px-3 py-1.5 text-xs text-blue-600 rounded hover:bg-blue-50"
        >
          Contact ONEX About {support.name}
        </Link>
      </section>
    </div>
  );
}
