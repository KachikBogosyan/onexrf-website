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
    (products?.map(getProductBySlug).filter((p: Product | undefined): p is Product => p !== undefined) ?? [])
      .sort((a: Product, b: Product) => (a.order ?? 999) - (b.order ?? 999));

  const resolvedTooling: Tooling[] =
    tooling?.map(getToolingBySlug).filter((t: Tooling | undefined): t is Tooling => t !== undefined) ?? [];

  const resolvedMaterials: Material[] =
    materials?.map(getMaterialBySlug).filter((m: Material | undefined): m is Material => m !== undefined) ?? [];

  const resolvedSupport: Support[] =
    support?.map(getSupportBySlug).filter((s: Support | undefined): s is Support => s !== undefined) ?? [];

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
                is_new={p.is_new}
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
    </section>
  );
}
