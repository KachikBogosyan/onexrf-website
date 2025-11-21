// components/SolutionModule.tsx
import Link from "next/link";

import { getProductBySlug, type Product } from "@/lib/products";
import { getToolingBySlug, type Tooling } from "@/lib/tooling";
import { getMaterialBySlug, type Material } from "@/lib/materials";
import { getSupportBySlug, type Support } from "@/lib/support";

import type { Related } from "@/lib/types";

import { SolutionCard } from "./SolutionCard";

type Props = {
  title?: string;
  related: Related;
  contextLabel: string;
};

export function SolutionModule({ title, related, contextLabel }: Props) {
  const { products, tooling, materials, support } = related;

  const resolvedProducts: Product[] =
    products?.map(getProductBySlug).filter((p): p is Product => p !== undefined) ?? [];

  const resolvedTooling: Tooling[] =
    tooling?.map(getToolingBySlug).filter((t): t is Tooling => t !== undefined) ?? [];

  const resolvedMaterials: Material[] =
    materials?.map(getMaterialBySlug).filter((m): m is Material => m !== undefined) ?? [];

  const resolvedSupport: Support[] =
    support?.map(getSupportBySlug).filter((s): s is Support => s !== undefined) ?? [];

  const empty =
    resolvedProducts.length === 0 &&
    resolvedTooling.length === 0 &&
    resolvedMaterials.length === 0 &&
    resolvedSupport.length === 0;

  if (empty) return null;

  return (
    <section className="mt-10 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        {title ?? "Application Solution"}
      </h2>

      <p className="mt-1 text-sm text-slate-600 max-w-2xl">
        For <span className="font-medium">{contextLabel}</span>, ONEX provides a
        complete solution including the machine, custom tooling, and application
        support such as process development or training.
      </p>

      {/* ========== PRODUCTS ========== */}
      {resolvedProducts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Recommended Machines</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resolvedProducts.map((p) => (
              <SolutionCard
                key={p.slug}
                title={p.name}
                description={p.description || ""}
                image={p.image}
                link={`/products/${p.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========== TOOLING ========== */}
      {resolvedTooling.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Tooling</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resolvedTooling.map((t) => (
              <SolutionCard
                key={t.slug}
                title={t.name}
                description={t.description || ""}
                image={t.image}
                link={`/tooling/${t.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========== SUPPORT ========== */}
      {resolvedSupport.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {resolvedSupport.map((s) => (
              <SolutionCard
                key={s.slug}
                title={s.name}
                description={s.description || ""}
                link={`/support/${s.slug}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ========== CONTACT CTA ========== */}
      <div className="mt-10 border-t pt-5">
        <h3 className="font-semibold text-slate-800 text-sm">
          Discuss your application
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Provide your catheter specs; we’ll recommend the ideal equipment,
          tooling, and process development plan.
        </p>
        <Link
          href={`/contact?application=${encodeURIComponent(contextLabel)}`}
          className="inline-flex items-center rounded-md border border-blue-600 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
        >
          Contact ONEX About This Application
        </Link>
      </div>
    </section>
  );
}
