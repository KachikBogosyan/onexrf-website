import { notFound } from "next/navigation";
import { getToolingBySlug } from "@/lib/tooling";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { MarketingHero } from "@/components/MarketingHero";
import { FeatureList } from "@/components/FeatureList";
import { Gallery } from "@/components/Gallery";
import { SectionWithImage } from "@/components/SectionWithImage";

export default async function CatheterTipMandrelPage() {
  const tooling = getToolingBySlug("catheter-tip-mandrel");

  if (!tooling) return notFound();

  const sections: Section[] = [
    { id: 'capabilities', label: 'Mandrel Capabilities' },
    { id: 'examples', label: 'Examples' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-12">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/tooling" className="hover:underline">
          Tooling
        </Link>{" "}
        / <span className="text-slate-700">{tooling.name}</span>
      </nav>

      {/* SECTION 1: HERO */}
      <MarketingHero
        heading="Custom Catheter Mandrels for Forming, Bonding, and Flaring"
        body={
          <>
            ONEXRF manufactures custom mandrels used to support the catheter lumen during forming,
            bonding, and flaring operations. Mandrels are produced to match the{" "}
            <Link href="/tooling/catheter-tipping-die" className="text-blue-600 hover:underline">
              die
            </Link>{" "}
            geometry and application requirements, ensuring stable internal support and consistent
            results. We supply straight, tapered, stepped, and shaped mandrels for a wide range of
            catheter materials and tip configurations.
            <br />
            <br />
            <span className="font-medium">Standard lead time is 4 weeks, with a 2-week expedite option.</span>
          </>
        }
        media={
          tooling.image
            ? {
                src: tooling.image,
                alt: "Catheter Mandrel",
              }
            : undefined
        }
        primaryCTA={{
          label: "Submit a Drawing or Sample",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}&action=quote`,
        }}
        secondaryCTA={{
          label: "Request Quote",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}`,
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Mandrel Capabilities */}
      <section id="capabilities" className="scroll-mt-20">
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-slate-900">Mandrel Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <SectionWithImage
              image="/images/tooling/placeholder-1.png"
              imageAlt="Mandrel geometries"
              imageRight={false}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Geometries</h3>
                <FeatureList
                  features={[
                    "Straight",
                    "Tapered / stepped",
                    "Shaped or profiled",
                    "Eccentric, grooved, or notched",
                    "Hollow-core designs where required",
                  ]}
                />
              </div>
            </SectionWithImage>

            <SectionWithImage
              image="/images/tooling/placeholder-2.png"
              imageAlt="Mandrel materials"
              imageRight={true}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Materials</h3>
                <FeatureList
                  features={["Stainless steel", "Tool steel", "Nitinol"]}
                />
              </div>
            </SectionWithImage>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionWithImage
              image="/images/tooling/placeholder-3.png"
              imageAlt="Mandrel coatings"
              imageRight={false}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Optional Coatings</h3>
                <FeatureList
                  features={[
                    "PTFE",
                    "Parylene",
                    "Other low-friction coatings on request",
                  ]}
                />
              </div>
            </SectionWithImage>

            <SectionWithImage
              image="/images/tooling/placeholder-1.png"
              imageAlt="Mandrel specifications"
              imageRight={true}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Specifications</h3>
                <FeatureList
                  features={[
                    "Tolerances to ±0.01 mm",
                    "Surface finish optimized for clean removal",
                    "Length and profile matched to ONEXRF die sets",
                  ]}
                />
              </div>
            </SectionWithImage>
          </div>
        </div>
      </section>

      {/* SECTION 3: Examples */}
      <section id="examples" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Examples of Mandrel Types</h2>
        <p className="text-sm text-slate-600 mb-4">
          Visual gallery of mandrel geometries we manufacture
        </p>
        <Gallery
          items={[
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Straight mandrel",
              caption: "Straight mandrels",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Tapered mandrel",
              caption: "Tapered / stepped mandrels",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Shaped mandrel",
              caption: "Shaped or profiled mandrels",
            },
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Eccentric mandrel",
              caption: "Eccentric, grooved, or notched mandrels",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Hollow-core mandrel",
              caption: "Hollow-core mandrels",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Custom mandrel",
              caption: "Custom geometry mandrels",
            },
          ]}
          columns={3}
        />
      </section>

      {/* SECTION 4: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Need custom mandrels for your catheter application?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Send us a drawing or sample and we will provide a timeline and quotation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?tooling=${encodeURIComponent(tooling.name)}&action=quote`}
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Submit a Drawing or Sample
            </Link>
            <Link
              href={`/contact?tooling=${encodeURIComponent(tooling.name)}`}
              className="inline-block border border-blue-600 text-blue-600 px-4 py-2 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
