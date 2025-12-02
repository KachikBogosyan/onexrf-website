import { notFound } from "next/navigation";
import { getToolingBySlug } from "@/lib/tooling";
import { getApplicationsUsingTooling, getProductsUsingTooling } from "@/lib/reverse";
import Link from "next/link";
import { ContentModule } from "@/components/ContentModule";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { MarketingHero } from "@/components/MarketingHero";

export default async function ToolingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tooling = getToolingBySlug(slug);

  if (!tooling) return notFound();

  const applications = getApplicationsUsingTooling(slug);
  const products = getProductsUsingTooling(slug);

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
        <Link href="/tooling" className="hover:underline">
          Tooling
        </Link>{" "}
        / <span className="text-slate-700">{tooling.name}</span>
      </nav>

      <MarketingHero
        heading={tooling.name}
        body={tooling.description || ""}
        media={
          tooling.image
            ? {
                src: tooling.image,
                alt: tooling.name,
              }
            : undefined
        }
      />

      <PageNav sections={sections} />

      {/* CONTENT MODULES SECTION */}
      <section id="overview" className="space-y-12">
        <ContentModule
          image="/images/tooling/placeholder-1.png"
          imageAlt={`${tooling.name} - Overview`}
          title="Overview"
          content={`This section provides a comprehensive overview of ${tooling.name}. 

${tooling.description || ""}

Here you can learn about the fundamental design principles, key characteristics, and core benefits of this tooling. This content serves as a foundation for understanding how ${tooling.name} is applied in catheter manufacturing processes.`}
        />

        <ContentModule
          image="/images/tooling/placeholder-2.png"
          imageAlt={`${tooling.name} - Technical Details`}
          title="Technical Details"
          content={`Dive deeper into the technical aspects of ${tooling.name}. 

This section covers the design specifications, precision requirements, process parameters, and technical details that make this tooling effective for catheter forming applications. Understanding these details helps engineers and operators optimize their manufacturing processes and achieve consistent, high-quality results.`}
        />

        <ContentModule
          image="/images/tooling/placeholder-3.png"
          imageAlt={`${tooling.name} - Applications`}
          title="Applications & Use Cases"
          content={`Explore how ${tooling.name} is applied in real-world catheter manufacturing scenarios. 

This section highlights specific use cases, manufacturing challenges that this tooling addresses, and the types of catheter components that benefit from its application. Learn about the versatility and effectiveness of ${tooling.name} across different catheter manufacturing requirements.`}
        />
      </section>

      {/* APPLICATIONS SECTION */}
      {applications.length > 0 && (
        <section id="applications">
          <h2 className="text-lg font-semibold mb-4">Applications Using This Tooling</h2>
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
          <h2 className="text-lg font-semibold mb-4">Products Using This Tooling</h2>
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
      <ContactCTA context={tooling.name} contextType="tooling" />
    </div>
  );
}
