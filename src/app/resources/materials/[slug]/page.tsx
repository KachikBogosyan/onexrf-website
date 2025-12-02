import { notFound } from "next/navigation";
import { getMaterialBySlug } from "@/lib/materials";
import { getApplicationsUsingMaterial, getProductsUsingMaterial } from "@/lib/reverse";
import Link from "next/link";
import { ContentModule } from "@/components/ContentModule";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { MarketingHero } from "@/components/MarketingHero";

export default async function MaterialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const material = getMaterialBySlug(slug);

  if (!material) return notFound();

  const applications = getApplicationsUsingMaterial(slug);
  const products = getProductsUsingMaterial(slug);

  // Define sections for this page
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    ...(applications.length > 0
      ? [{ id: 'applications', label: 'Applications' }]
      : []),
    ...(products.length > 0 ? [{ id: 'products', label: 'Products' }] : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        /{" "}
        <Link href="/resources/materials" className="hover:underline">
          Materials
        </Link>{" "}
        / <span className="text-slate-700">{material.name}</span>
      </nav>

      <MarketingHero
        heading={material.name}
        body={material.description || ""}
        media={
          material.image
            ? {
                src: material.image,
                alt: material.name,
              }
            : undefined
        }
      />

      <PageNav sections={sections} />

      {/* CONTENT MODULES SECTION */}
      <section id="overview" className="space-y-12">
        <ContentModule
          image="/images/materials/placeholder-1.png"
          imageAlt={`${material.name} - Overview`}
          title="Overview"
          content={`This section provides a comprehensive overview of ${material.name}. 

${material.description || ""}

Here you can learn about the fundamental properties, key characteristics, and core benefits of this material. This content serves as a foundation for understanding how ${material.name} is applied in catheter manufacturing processes.`}
        />

        <ContentModule
          image="/images/materials/placeholder-2.png"
          imageAlt={`${material.name} - Technical Details`}
          title="Technical Details"
          content={`Dive deeper into the technical aspects of ${material.name}. 

This section covers the material properties, durometer ranges, process parameters, and technical specifications that make this material effective for catheter forming applications. Understanding these details helps engineers and operators optimize their manufacturing processes and achieve consistent, high-quality results.`}
        />

        <ContentModule
          image="/images/materials/placeholder-3.png"
          imageAlt={`${material.name} - Applications`}
          title="Applications & Use Cases"
          content={`Explore how ${material.name} is applied in real-world catheter manufacturing scenarios. 

This section highlights specific use cases, manufacturing challenges that this material addresses, and the types of catheter components that benefit from its application. Learn about the versatility and effectiveness of ${material.name} across different catheter manufacturing requirements.`}
        />
      </section>

      {/* APPLICATIONS SECTION */}
      {applications.length > 0 && (
        <section id="applications">
          <h2 className="text-lg font-semibold mb-4">Applications Using This Material</h2>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.slug} className="border-l-2 border-slate-200 pl-4">
                <Link
                  href={`/applications/${app.slug}`}
                  className="text-base font-semibold text-blue-600 hover:underline block mb-2"
                >
                  {app.name}
                </Link>
                {app.description && (
                  <p className="text-sm text-slate-600">{app.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PRODUCTS SECTION */}
      {products.length > 0 && (
        <section id="products">
          <h2 className="text-lg font-semibold mb-4">Products Using This Material</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {product.image && (
                    <div className="w-24 h-24 relative rounded-md overflow-hidden bg-slate-100 border flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-blue-600 hover:underline">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT SECTION */}
      <ContactCTA context={material.name} contextType="material" />
    </div>
  );
}

