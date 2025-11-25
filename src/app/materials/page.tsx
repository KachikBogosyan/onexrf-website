import Link from "next/link";
import { getAllMaterials } from "@/lib/materials";
import { getMaterialsUsingProduct } from "@/lib/reverse";
import { getProductBySlug } from "@/lib/products";

type Props = {
  searchParams: Promise<{ product?: string }>;
};

export default async function MaterialsPage({ searchParams }: Props) {
  const params = await searchParams;
  const productSlug = params.product;
  
  let materials = getAllMaterials();
  let product = null;
  let isFiltered = false;

  if (productSlug) {
    product = getProductBySlug(productSlug);
    if (product) {
      materials = getMaterialsUsingProduct(productSlug);
      isFiltered = true;
    }
  }

  materials = materials.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-16">
      {/* PAGE HEADER */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Materials</h1>
            {isFiltered && product && (
              <p className="text-sm text-slate-600 mt-1">
                Materials compatible with <span className="font-medium">{product.name}</span>
              </p>
            )}
            {!isFiltered && (
              <p className="text-sm text-slate-600 max-w-2xl mt-1">
                Comprehensive range of catheter materials compatible with ONEX RF forming
                systems for precision medical device manufacturing.
              </p>
            )}
          </div>
          {isFiltered && (
            <Link
              href="/materials"
              className="inline-block border border-blue-600 px-4 py-2 text-sm text-blue-600 rounded hover:bg-blue-50 transition-colors"
            >
              View All Materials
            </Link>
          )}
        </div>
      </header>

      {/* MATERIALS GRID */}
      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material) => (
            <Link
              key={material.slug}
              href={`/materials/${material.slug}`}
              className="group rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="space-y-3">
                {/* NAME */}
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {material.name}
                </h2>

                {/* ALIASES */}
                {material.aliases && material.aliases.length > 0 && (
                  <p className="text-xs text-slate-500 uppercase tracking-wide">
                    {material.aliases.join(", ")}
                  </p>
                )}

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-600">
                  {material.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MARKETING SECTION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Material Compatibility & Expertise
        </h2>
        <p className="text-slate-700 max-w-3xl text-sm">
          ONEX RF forming systems are designed to work with a wide variety of
          catheter materials, from common polymers like PE and PU to specialized
          materials like PEEK and PTFE. Our expertise spans material properties,
          durometer ranges, and forming parameters to ensure optimal results for
          your specific application.
        </p>

        {/* Placeholder for future GIF or branded image */}
        <div className="border rounded-lg h-48 flex items-center justify-center text-slate-400 italic">
          GIF or animation placeholder
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

