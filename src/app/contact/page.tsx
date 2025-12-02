import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import { getApplicationBySlug } from "@/lib/applications";
import { getMaterialBySlug } from "@/lib/materials";
import { getToolingBySlug } from "@/lib/tooling";
import { getSupportBySlug } from "@/lib/support";
import { HubSpotForm } from "@/components/HubSpotForm";

type Props = {
  searchParams: Promise<{
    product?: string;
    application?: string;
    material?: string;
    tooling?: string;
    support?: string;
  }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  
  // Resolve context from query params
  let context: {
    type: "product" | "application" | "material" | "tooling" | "support" | null;
    name: string;
    slug?: string;
  } | null = null;

  if (params.product) {
    // Try as slug first, then as name
    const product = getProductBySlug(params.product);
    if (product) {
      context = { type: "product", name: product.name, slug: product.slug };
    } else {
      context = { type: "product", name: decodeURIComponent(params.product) };
    }
  } else if (params.application) {
    const application = getApplicationBySlug(params.application);
    if (application) {
      context = { type: "application", name: application.name, slug: application.slug };
    } else {
      context = { type: "application", name: decodeURIComponent(params.application) };
    }
  } else if (params.material) {
    const material = getMaterialBySlug(params.material);
    if (material) {
      context = { type: "material", name: material.name, slug: material.slug };
    } else {
      context = { type: "material", name: decodeURIComponent(params.material) };
    }
  } else if (params.tooling) {
    const tooling = getToolingBySlug(params.tooling);
    if (tooling) {
      context = { type: "tooling", name: tooling.name, slug: tooling.slug };
    } else {
      context = { type: "tooling", name: decodeURIComponent(params.tooling) };
    }
  } else if (params.support) {
    const support = getSupportBySlug(params.support);
    if (support) {
      context = { type: "support", name: support.name, slug: support.slug };
    } else {
      context = { type: "support", name: decodeURIComponent(params.support) };
    }
  }

  // Build context message
  const contextMessage = context
    ? `I'm interested in learning more about ${context.name}.`
    : "I'd like to discuss my catheter manufacturing needs.";

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Contact ONEX</h1>
        <p className="text-sm text-slate-700 max-w-2xl">
          Get in touch with our team to discuss your catheter manufacturing needs.
          We'll help you find the right solution for your application.
        </p>
      </header>

      {/* CONTEXT BANNER */}
      {context && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-slate-700">
            <span className="font-medium">Inquiry about:</span>{" "}
            {context.slug ? (
              <Link
                href={
                  context.type === "material"
                    ? `/resources/materials/${context.slug}`
                    : context.type === "technology"
                    ? `/resources/technologies/${context.slug}`
                    : `/${context.type}s/${context.slug}`
                }
                className="text-blue-600 hover:underline"
              >
                {context.name}
              </Link>
            ) : (
              <span className="text-blue-600">{context.name}</span>
            )}
          </p>
        </div>
      )}

      {/* CONTACT INFORMATION */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Get in Touch</h2>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <span className="font-medium">Email:</span>{" "}
              <a
                href="mailto:info@onexrf.com"
                className="text-blue-600 hover:underline"
              >
                info@onexrf.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              <a
                href="tel:+1-XXX-XXX-XXXX"
                className="text-blue-600 hover:underline"
              >
                +1 (XXX) XXX-XXXX
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">What to Include</h2>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Catheter dimensions (ID/OD, length)</li>
            <li>Material type and durometer</li>
            <li>Application requirements</li>
            <li>Production volume</li>
          </ul>
        </div>
      </section>

      {/* HUBSPOT FORM */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Send us a Message</h2>
        <HubSpotForm context={context} />
      </section>

      {/* ALTERNATIVE CONTACT */}
      <section className="border-t pt-6">
        <p className="text-sm text-slate-600">
          Prefer to speak directly?{" "}
          <a
            href="mailto:info@onexrf.com"
            className="text-blue-600 hover:underline font-medium"
          >
            Send us an email
          </a>{" "}
          or call us to discuss your project.
        </p>
      </section>
    </div>
  );
}

