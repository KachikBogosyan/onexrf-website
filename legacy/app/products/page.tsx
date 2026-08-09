import Link from "next/link";
import Image from "next/image";
import { getProductsByLine } from "@/lib/products";
import { MarketingHero } from "@/components/MarketingHero";

export default function CatheterTippersPage() {
  const products = getProductsByLine("catheter-tippers").sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  return (
    <div className="space-y-16">
      <MarketingHero
        heading="Catheter Tippers"
        body="Precision RF catheter tip forming systems engineered for R&D and high-volume manufacturing."
        media={{
          src: "/images/products-hero.png",
          alt: "Catheter Tippers",
        }}
      />

      {/* PRODUCT GRID */}
      <section>
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex flex-col items-center space-y-3">
                {/* IMAGE */}
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={400}
                    height={300}
                    className="object-contain h-48 w-full rounded"
                  />
                )}

                {/* NAME */}
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {p.name}
                </h2>

                {/* SHORT DESCRIPTION */}
                <p className="text-sm text-slate-600 text-center">
                  {p.description}
                </p>

                {/* NEW TAG */}
                {p.is_new && (
                  <span className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THREE-CARD NAVIGATION */}
      <section>
        <div className="grid md:grid-cols-3 gap-8">
          {/* APPLICATIONS */}
          <Link
            href="/applications"
            className="group border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-3 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Applications Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600">
                Applications
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Explore catheter tipping and forming applications.
              </p>
            </div>
          </Link>

          {/* TOOLING */}
          <Link
            href="/tooling"
            className="group border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-3 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Tooling Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600">
                Tooling
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Custom dies and mandrels engineered for your geometry.
              </p>
            </div>
          </Link>

          {/* SUPPORT */}
          <Link
            href="/support"
            className="group border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="space-y-3 flex flex-col items-center">
              <div className="h-32 w-full bg-slate-100 rounded flex items-center justify-center text-slate-400">
                Support Image
              </div>
              <h3 className="text-lg font-semibold group-hover:text-blue-600">
                Support
              </h3>
              <p className="text-sm text-slate-600 text-center">
                Process development, operator training, and servicing.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
