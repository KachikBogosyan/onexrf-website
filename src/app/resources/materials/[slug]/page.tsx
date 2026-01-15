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

  const relatedApplications = getApplicationsUsingMaterial(slug);
  const relatedProducts = getProductsUsingMaterial(slug);

  // Dynamically build sections based on available data
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    ...(material.applications && material.applications.length > 0
      ? [{ id: 'applications', label: 'Applications' }]
      : []),
    ...(material.process_notes
      ? [{ id: 'process', label: 'Process Considerations' }]
      : []),
    ...(material.properties
      ? [{ id: 'properties', label: 'Material Properties' }]
      : []),
    ...(material.biocompatibility
      ? [{ id: 'biocompatibility', label: 'Biocompatibility' }]
      : []),
    ...(relatedApplications.length > 0 || relatedProducts.length > 0
      ? [{ id: 'related', label: 'Related' }]
      : []),
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 mb-2 px-4 sm:px-6 lg:px-8 pt-4">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        /{" "}
        <Link href="/resources/materials" className="hover:underline">
          Materials
        </Link>{" "}
        / <span className="text-slate-700">{material.name}</span>
      </nav>

      <PageNav sections={sections} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
              {material.name}
            </h1>
            {material.aliases && material.aliases.length > 0 && (
              <p className="text-lg text-gray-600">
                Also known as: <span className="font-semibold">{material.aliases.join(', ')}</span>
              </p>
            )}
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            {material.description}
          </p>
        </div>
      </section>

      {/* Overview Section - Narrative */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          {material.long_description ? (
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {material.long_description.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-700 leading-relaxed">
              {material.description}
            </p>
          )}
        </div>
      </section>

      {/* Applications Section */}
      {material.applications && material.applications.length > 0 && (
        <section id="applications" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Applications</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {material.name} is commonly used in the following catheter manufacturing applications:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {material.applications.map((app, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <p className="text-gray-800">{app}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Notes Section - Technical Narrative */}
      {material.process_notes && (
        <section id="process" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Process Considerations</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Understanding how {material.name} behaves during manufacturing is critical for achieving consistent, high-quality results.
            </p>

            <div className="space-y-6">
              {material.process_notes.thermal_processability && (
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Thermal Processability
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {material.process_notes.thermal_processability}
                  </p>
                </div>
              )}

              {material.process_notes.bonding_behavior && (
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Bonding Behavior
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {material.process_notes.bonding_behavior}
                  </p>
                </div>
              )}

              {material.process_notes.tooling_considerations && (
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Tooling Considerations
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {material.process_notes.tooling_considerations}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Material Properties Section - Data Table */}
      {material.properties && (
        <section id="properties" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Material Properties</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Technical specifications and characteristics of {material.name}:
            </p>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {material.properties.durometer_range && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Durometer Range
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.durometer_range}
                      </td>
                    </tr>
                  )}
                  {material.properties.melting_point && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Melting Point
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.melting_point}
                      </td>
                    </tr>
                  )}
                  {material.properties.elongation && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Elongation
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.elongation}
                      </td>
                    </tr>
                  )}
                  {material.properties.tensile_strength && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Tensile Strength
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.tensile_strength}
                      </td>
                    </tr>
                  )}
                  {material.properties.density && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Density
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.density}
                      </td>
                    </tr>
                  )}
                  {material.properties.water_absorption_24h && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Water Absorption (24h)
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.water_absorption_24h}
                      </td>
                    </tr>
                  )}
                  {material.properties.sterilization_methods && material.properties.sterilization_methods.length > 0 && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Sterilization Methods
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <ul className="space-y-1">
                          {material.properties.sterilization_methods.map((method, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 text-blue-600">•</span>
                              <span>{method}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                  {material.properties.radiopacity && (
                    <tr>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 bg-gray-50 w-1/3">
                        Radiopacity
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {material.properties.radiopacity}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Biocompatibility Section */}
      {material.biocompatibility && (
        <section id="biocompatibility" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Biocompatibility & Regulatory</h2>
            
            {material.biocompatibility.certifications && material.biocompatibility.certifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-3">
                  {material.biocompatibility.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {material.biocompatibility.usage_scope && (
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Scope</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {material.biocompatibility.usage_scope}
                </p>
                <p className="text-sm text-gray-600 italic">
                  Note: Final device-level biocompatibility testing and validation should be performed per regulatory requirements and intended use.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Content Section */}
      {(relatedApplications.length > 0 || relatedProducts.length > 0) && (
        <section id="related" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Content</h2>

            {/* Related Applications */}
            {relatedApplications.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Applications Using This Material</h3>
                <div className="space-y-4">
                  {relatedApplications.map((app) => (
                    <div key={app.slug} className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
                      <Link
                        href={`/applications/${app.slug}`}
                        className="text-lg font-semibold text-blue-600 hover:underline block mb-2"
                      >
                        {app.name}
                      </Link>
                      {app.description && (
                        <p className="text-sm text-gray-600">{app.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Products for Processing This Material</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {product.image && (
                        <div className="w-full h-32 relative rounded-md overflow-hidden bg-slate-100 border mb-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <h4 className="text-base font-semibold text-blue-600 hover:underline mb-2">
                        {product.name}
                      </h4>
                      {product.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Have Questions About {material.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Our team can help you understand how {material.name} fits your catheter manufacturing process, assist with material selection, and support process development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Our Team
            </Link>
            <Link 
              href="/resources/materials" 
              className="inline-block bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors border border-blue-400"
            >
              View All Materials
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

