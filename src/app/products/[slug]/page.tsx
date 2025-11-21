import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { getApplicationsUsingProduct, getSubApplicationsUsingProduct } from "@/lib/reverse";
import Link from "next/link";

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

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Machine</p>
        <h1 className="text-3xl font-semibold">{product.name}</h1>
        <p className="max-w-2xl text-sm text-slate-700">{product.description}</p>
      </header>

      {/* IMAGE BLOCK (placeholder) */}
      {product.image && (
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="max-w-lg rounded-md border"
          />
        </div>
      )}

      {/* APPLICATIONS USING THIS PRODUCT */}
      {apps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Applications</h2>
          <ul className="list-disc list-inside text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link
                  href={`/applications/${app.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* SUB-APPLICATIONS */}
      {subApps.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Specific Use Cases</h2>
          <ul className="list-disc list-inside text-sm">
            {subApps.map(({ application, subApp }) => (
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
        </section>
      )}

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
