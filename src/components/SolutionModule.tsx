// components/SolutionModule.tsx
import Link from "next/link";
import type { Related } from "@/lib/types";

type SolutionModuleProps = {
  title?: string;
  related: Related;
  contextLabel: string; // e.g. "Catheter Tipping" or "Bullet Nose Tip Forming"
};

export function SolutionModule({ title, related, contextLabel }: SolutionModuleProps) {
  const { products, materials, tooling, services } = related;

  if (
    !products?.length &&
    !materials?.length &&
    !tooling?.length &&
    !services?.length
  ) {
    return null;
  }

  return (
    <section className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        {title ?? "Application Solution"}
      </h2>
      <p className="mt-1 text-sm text-slate-600 max-w-2xl">
        For <span className="font-medium">{contextLabel}</span>, ONEX provides a
        complete solution including machine, custom tooling, and process
        development. You can choose all components or only what you need.
      </p>

      <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
        {products && products.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-800">Recommended Machines</h3>
            <ul className="mt-1 list-disc list-inside text-slate-700">
              {products.map((p) => (
                <li key={p}>
                  <Link
                    href={`/products/${p}`}
                    className="text-blue-600 hover:underline"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tooling && tooling.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-800">Tooling</h3>
            <ul className="mt-1 list-disc list-inside text-slate-700">
              {tooling.map((t) => (
                <li key={t}>
                  <Link
                    href={`/tooling/${t}`}
                    className="text-blue-600 hover:underline"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {materials && materials.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-800">Compatible Materials</h3>
            <ul className="mt-1 list-disc list-inside text-slate-700">
              {materials.map((m) => (
                <li key={m}>
                  <Link
                    href={`/materials/${m}`}
                    className="text-blue-600 hover:underline"
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {services && services.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-800">Services</h3>
            <ul className="mt-1 list-disc list-inside text-slate-700">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href={`/support/${s}`}
                    className="text-blue-600 hover:underline"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Simple contact area for now */}
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold text-slate-800 text-sm">
          Discuss your application
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Tell us about your catheter, material, and volume needs. We&apos;ll
          help define the solution package that fits your constraints.
        </p>
        <Link
          href={`/contact?application=${encodeURIComponent(contextLabel)}`}
          className="inline-flex items-center rounded-md border border-blue-600 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
        >
          Contact ONEX about this application
        </Link>
      </div>
    </section>
  );
}
