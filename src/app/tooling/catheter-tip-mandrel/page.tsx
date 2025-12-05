import { notFound } from "next/navigation";
import { getToolingBySlug } from "@/lib/tooling";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { MarketingHero } from "@/components/MarketingHero";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FeatureList } from "@/components/FeatureList";
import { Gallery } from "@/components/Gallery";
import { SectionWithImage } from "@/components/SectionWithImage";

export default async function CatheterTipMandrelPage() {
  const tooling = getToolingBySlug("catheter-tip-mandrel");

  if (!tooling) return notFound();

  const sections: Section[] = [
    { id: 'why-choose', label: 'Why Choose ONEXRF' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'manufacture', label: 'What We Manufacture' },
    { id: 'materials', label: 'Materials & Coatings' },
    { id: 'process', label: 'Development Process' },
    { id: 'repair', label: 'Repair & Support' },
    { id: 'quality', label: 'Quality Standards' },
    { id: 'examples', label: 'Examples' },
    { id: 'partner', label: 'Partnership' },
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
        heading="Custom Catheter Mandrels Built for Dimensional Stability and Consistent Processing"
        body="High-precision, tight-tolerance mandrels designed to support your catheter geometry during forming, bonding, flaring, or assembly — delivered in 2–4 weeks, with an optional 2-week expedite."
        media={
          tooling.image
            ? {
                src: tooling.image,
                alt: "Catheter Mandrel",
              }
            : undefined
        }
        primaryCTA={{
          label: "Request Quote",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}`,
        }}
        secondaryCTA={{
          label: "Send Your Drawing or Sample",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}&action=quote`,
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Why ONEXRF Mandrels */}
      <section id="why-choose" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Precision catheter mandrels"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why ONEXRF Mandrels?
            </h2>
            <p className="text-base text-slate-700 font-medium">
              Accuracy, Stability, and Seamless Integration With Your Process
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Catheter mandrels must maintain geometry under heat, tension, compression, and
              removal. ONEXRF mandrels are designed to:
            </p>
          </div>
          <FeatureList
            features={[
              "Support the catheter internally during forming, bonding, or flaring",
              "Prevent lumen distortion or collapse",
              "Maintain stable dimensions across repeated thermal cycles",
              "Enable predictable forming quality with minimal rework",
              "Pair precisely with ONEXRF dies for optimal fit and concentricity",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            Most suppliers simply machine mandrels.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            ONEXRF goes further — we evaluate your catheter, your{" "}
            <Link href="/tooling/catheter-tipping-die" className="text-blue-600 hover:underline">
              die
            </Link>
            , your process, and produce mandrels that work as a system, not as isolated
            components.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            Engineers choose us because our mandrels reduce variation, shorten development time,
            and stabilize production.
          </p>
        </SectionWithImage>
      </section>

      {/* SECTION 3: Competitive Advantages */}
      <section id="advantages" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          Competitive Advantages Engineers Actually Care About
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Engineers consistently report that ONEXRF's speed, responsiveness, and ability to
          troubleshoot applications differentiate us more than any single technical feature.
        </p>
        <ComparisonTable
          rows={[
            {
              capability: "Lead Time",
              onexrf: "2–4 weeks (2-week expedite)",
              competitors: "6–8 weeks",
            },
            {
              capability: "Integrated Die + Mandrel Development",
              onexrf: "Yes",
              competitors: "Rare",
            },
            {
              capability: "Process Development",
              onexrf: "Included on request",
              competitors: "Limited or none",
            },
            {
              capability: "Direct Engineer Access",
              onexrf: "Yes, no corporate layers",
              competitors: "Not typical",
            },
            {
              capability: "Reverse Engineering",
              onexrf: "Yes",
              competitors: "Varies",
            },
            {
              capability: "Lifecycle Support",
              onexrf: "R&D → Production → Sustaining",
              competitors: "Varies",
            },
            {
              capability: "Customization (geometry/material/coatings)",
              onexrf: "High",
              competitors: "Standard options",
            },
          ]}
        />
      </section>

      {/* SECTION 4: What We Manufacture */}
      <section id="manufacture" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Custom mandrels for catheter manufacturing"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              What We Manufacture
            </h2>
            <p className="text-base font-medium text-slate-700">
              Mandrels for Every Catheter Application
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              ONEXRF designs and manufactures mandrels in a wide range of geometries and
              materials, tailored to your specific application.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FeatureList
                title="Supported Mandrel Types"
                features={[
                  "Straight mandrels",
                  "Tapered and stepped mandrels",
                  "Shaped / profiled mandrels for unique lumen geometries",
                  "Eccentric, grooved, or notched mandrels",
                  "Hollow-core mandrels",
                  "Multi-diameter transitioning mandrels",
                  "Mandrels for soft tip bonding",
                  "Mandrels specifically matched to die cavities for exact tip geometry",
                ]}
              />
            </div>
            <div className="space-y-4">
              <FeatureList
                title="Typical Catheter Applications"
                features={[
                  <>
                    <Link href="/applications/catheter-tipping" className="text-blue-600 hover:underline">
                      Tip forming
                    </Link>
                  </>,
                  <>
                    <Link href="/applications/catheter-bonding" className="text-blue-600 hover:underline">
                      Bonding
                    </Link>{" "}
                  </>,
                  <>
                    <Link href="/applications/catheter-flaring" className="text-blue-600 hover:underline">
                      Flaring
                    </Link>
                  </>,
                  "Laminating",
                  "Balloon forming",
                  "Assembly support operations",
                ]}
              />
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed pt-4">
            Mandrels and{" "}
            <Link href="/tooling/catheter-tipping-die" className="text-blue-600 hover:underline">
              dies
            </Link>{" "}
            are engineered together to produce stable, repeatable catheter geometry.
          </p>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Materials & Coatings */}
      <section id="materials" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Mandrel materials and coatings"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Materials & Coatings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FeatureList
                  title="Common Materials"
                  features={[
                    "Stainless steel (304, 316, 17-4)",
                    "Nitinol (for flexibility or kink resistance)",
                    "Tool steel (for wear resistance)",
                  ]}
                />
              </div>
              <div className="space-y-4">
                <FeatureList
                  title="Optional Coatings"
                  features={[
                    "PTFE / non-stick coatings",
                    "Parylene",
                    "Custom low-friction coatings when needed for difficult polymer removal",
                  ]}
                />
              </div>
            </div>
            <div className="pt-4">
              <h3 className="text-base font-semibold text-slate-900 mb-3">Precision Standards</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                  <span>Tolerances to ±0.01 mm</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                  <span>Straightness verified across full length</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                  <span>Surface finish optimized for smooth removal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                  <span>Dimensional stability through repeated heating cycles</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              Engineers value mandrels that remove cleanly without tearing material — this is a
              major area where ONEXRF's experience makes a noticeable difference.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: Development Process */}
      <section id="process" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Mandrel development process"
          imageRight={true}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Our Mandrel Development Process
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A consistent catheter tip or bond starts with a mandrel designed specifically for
              your geometry and manufacturing method.
            </p>
            <ProcessSteps
              steps={[
                {
                  number: 1,
                  title: "Application Evaluation",
                  description:
                    "We review your catheter design, material, and intended process (forming, bonding, etc.).",
                },
                {
                  number: 2,
                  title: "Mandrel Geometry Design",
                  description: (
                    <>
                      We design the mandrel profile to:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>maintain lumen definition</li>
                        <li>prevent collapse during heating</li>
                        <li>ensure smooth release</li>
                        <li>align precisely with your die cavity</li>
                      </ul>
                    </>
                  ),
                },
                {
                  number: 3,
                  title: "Manufacturing & Surface Finishing",
                  description:
                    "Mandrels are machined with high concentricity and polished to reduce friction and material adhesion.",
                },
                {
                  number: 4,
                  title: "System Integration",
                  description: (
                    <>
                      When paired with an ONEXRF{" "}
                      <Link href="/tooling/catheter-tipping-die" className="text-blue-600 hover:underline">
                        die
                      </Link>
                      , mandrels are checked as a tooling system, ensuring:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>matched tolerances</li>
                        <li>predictable heating patterns</li>
                        <li>consistent internal support at all stages</li>
                      </ul>
                    </>
                  ),
                },
                {
                  number: 5,
                  title: "Process Verification",
                  description: (
                    <>
                      If ONEXRF conducts the process development, we verify:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>insertion fit</li>
                        <li>material flow</li>
                        <li>heating and cooling stability</li>
                        <li>removal characteristics</li>
                      </ul>
                    </>
                  ),
                },
                {
                  number: 6,
                  title: "Validation & Samples",
                  description:
                    "We can produce sample parts or qualification batches to validate mandrel performance before production.",
                },
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 7: Repair & Replacement */}
      <section id="repair" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Mandrel repair and replacement services"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Repair, Replacement & Reverse Engineering
            </h2>
            <p className="text-base font-medium text-slate-700">
              Fast help when your line is down or your tooling is damaged
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              ONEXRF provides:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "Mandrel repair",
                  "Mandrel replacement",
                  "Dimension matching to an existing mandrel",
                  "Reverse engineering from a sample tool or catheter",
                  "Quick-turn production for urgent needs",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              If a mandrel can't be repaired, we deliver a new matched mandrel in under 3 weeks.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 8: Quality & Verification */}
      <section id="quality" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Quality standards and verification"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Quality & Verification</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Every ONEXRF mandrel is inspected for:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "Diameter tolerances",
                  "Straightness",
                  "Surface finish",
                  "Concentricity",
                  "Material integrity",
                ]}
              />
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-2">Documentation available:</p>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• Dimensional report</li>
                <li>• Material certificates</li>
                <li>• Process notes when applicable</li>
              </ul>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 9: Common Applications Gallery */}
      <section id="examples" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Common Mandrel Applications</h2>
        <p className="text-sm text-slate-600 mb-4">
          Visual gallery of mandrel types we manufacture
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
              alt: "Taper/step mandrel",
              caption: "Taper/step mandrels",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Shaped mandrel",
              caption: "Shaped or custom-profile mandrels",
            },
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Soft-tip bonding mandrel",
              caption: "Soft-tip bonding mandrels",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Multi-catheter assembly mandrel",
              caption: "Multi-catheter assembly mandrels",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Balloon forming mandrel",
              caption: "Balloon forming mandrels",
            },
          ]}
          columns={3}
        />
      </section>

      {/* SECTION 10: Complete Solution */}
      <section id="partner" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Mandrels as part of complete solution"
          imageRight={false}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Mandrels Designed as Part of the Complete Solution
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Most suppliers deliver mandrels as standalone components.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              ONEXRF delivers mandrels as part of the catheter application solution — alongside:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureList
                features={[
                  "Custom dies",
                  "Parameter optimization",
                  "Prototype runs",
                  "Production scaling support",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Because ONEX develops{" "}
              <Link href="/products" className="text-blue-600 hover:underline">
                machines
              </Link>
              , tooling, and{" "}
              <Link href="/support/process-development" className="text-blue-600 hover:underline">
                processes
              </Link>
              , our mandrels are engineered to support:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureList
                features={[
                  "Shorter development cycles",
                  "Fewer iterations",
                  "Stable, repeatable production",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              This system-level approach is ONEXRF's core differentiator.
            </p>
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Need custom mandrels for forming, bonding, flaring, or assembly?
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Send us a drawing or a sample catheter. We'll evaluate your application and
                provide a fast-turn solution.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/contact?tooling=${encodeURIComponent(tooling.name)}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  Request Quote
                </Link>
                <Link
                  href={`/contact?tooling=${encodeURIComponent(tooling.name)}&action=expedite`}
                  className="inline-block border border-blue-600 text-blue-600 px-4 py-2 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
                >
                  Expedite My Project
                </Link>
              </div>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* CONTACT SECTION */}
      <ContactCTA context={tooling.name} contextType="tooling" />
    </div>
  );
}

