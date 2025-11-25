import { notFound } from "next/navigation";
import { getProductBySlug, resolveSpecValue } from "@/lib/products";
import { getApplicationsUsingProduct, getSubApplicationsUsingProduct, getMaterialsUsingProduct } from "@/lib/reverse";
import Link from "next/link";
import { getExamplesForProductPage } from "@/lib/examples";
import { ExamplesCarousel } from "@/components/examples/ExamplesCarousel";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  const apps = getApplicationsUsingProduct(slug);
  const subApps = getSubApplicationsUsingProduct(slug);
  const materials = getMaterialsUsingProduct(slug);
  const examples = getExamplesForProductPage(slug);

  // Group sub-applications by their parent application
  const appsWithSubApps = apps.map((app) => {
    const subAppsForApp = subApps.filter(
      (item) => item.application.slug === app.slug
    );
    return {
      application: app,
      subApplications: subAppsForApp.map((item) => item.subApp),
    };
  });

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Machine</p>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="max-w-2xl text-sm text-slate-700">{product.description}</p>
      </header>

      {/* IMAGE AND KEY FEATURES/HIGHLIGHTS */}
      {(product.image || product.key_features || product.highlights) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGE */}
          {product.image && (
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-lg rounded-md border"
              />
            </div>
          )}

          {/* KEY FEATURES & HIGHLIGHTS */}
          <div className="space-y-4">
            {product.key_features && product.key_features.length > 0 && (
              <div>
                <h3 className="text-base font-semibold mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {product.key_features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.highlights && product.highlights.length > 0 && (
              <div>
                <h3 className="text-base font-semibold mb-2">Highlights</h3>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {product.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SHORT SPECS */}
      {product.specs_short && product.specs_long && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {Object.entries(product.specs_short).map(([key, value]) => {
              const resolvedValue = resolveSpecValue(value, product.specs_long);
              const label = key
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
              return (
                <div key={key} className="border-b border-slate-200 pb-2">
                  <dt className="font-medium text-slate-700">{label}</dt>
                  <dd className="text-slate-600 mt-0.5">{resolvedValue}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      {/* APPLICATIONS SECTION */}
      {appsWithSubApps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Applications</h2>
          <div className="space-y-4">
            {appsWithSubApps.map(({ application, subApplications }) => (
              <div key={application.slug} className="border-l-2 border-slate-200 pl-4">
                <Link
                  href={`/applications/${application.slug}`}
                  className="text-base font-semibold text-blue-600 hover:underline block mb-2"
                >
                  {application.name}
                </Link>
                {subApplications.length > 0 && (
                  <ul className="list-disc list-inside text-sm ml-4 space-y-1">
                    {subApplications.map((subApp) => (
                      <li key={subApp.slug}>
                        <Link
                          href={`/applications/${application.slug}/${subApp.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {subApp.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MATERIALS SECTION */}
      {materials.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Materials</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {materials.slice(0, 5).map((material) => (
              <Link
                key={material.slug}
                href={`/materials/${material.slug}`}
                className="flex flex-col items-center text-center hover:opacity-80 transition-opacity"
              >
                <div className="w-full aspect-square bg-slate-100 rounded-md border border-slate-200 flex items-center justify-center mb-2 overflow-hidden">
                  {material.image ? (
                    <img
                      src={material.image}
                      alt={material.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs">No image</div>
                  )}
                </div>
                <span className="text-xs text-slate-700 font-medium">
                  {material.slug}
                </span>
              </Link>
            ))}
          </div>
          {materials.length > 5 && (
            <div className="mt-4">
              <Link
                href={`/materials?product=${slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View all {materials.length} materials →
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Examples Section */}
      <ExamplesCarousel examples={examples} title="Examples" />

      {/* CTA */}
      <section className="border-t pt-6">
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Discuss your catheter needs
        </h3>
        <p className="text-xs text-slate-600 mb-2">
          Provide your catheter dimensions and material; we'll confirm if this equipment is suitable.
        </p>
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="inline-block border border-blue-600 px-3 py-1.5 text-xs text-blue-600 rounded hover:bg-blue-50"
        >
          Contact ONEX About This Machine
        </Link>
      </section>
    </div>
  );
}
