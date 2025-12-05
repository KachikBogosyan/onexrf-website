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

export default async function CatheterTippingDiePage() {
  const tooling = getToolingBySlug("catheter-tipping-die");

  if (!tooling) return notFound();

  const sections: Section[] = [
    { id: 'why-choose', label: 'Why Choose ONEXRF' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'manufacture', label: 'What We Manufacture' },
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
        heading="Custom Catheter Tipping Dies Engineered for Consistency, Accuracy, and Fast Delivery"
        body={
          <>
            High-precision dies and{" "}
            <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
              mandrels
            </Link>{" "}
            built for your specific catheter geometry — delivered in 2–4 weeks with stable
            performance and repeatable quality across development and production.
          </>
        }
        media={
          tooling.image
            ? {
                src: tooling.image,
                alt: "Catheter Tipping Die",
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

      {/* SECTION 2: Why Engineers Choose ONEXRF Dies */}
      <section id="why-choose" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Precision catheter tipping die"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Why Engineers Choose ONEXRF Dies
            </h2>
            <p className="text-base text-slate-700 font-medium">
              Reliable Performance. Predictable Results. Fast Turnaround.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your catheter tip quality is only as good as the tooling shaping it.
              ONEXRF dies are designed to give engineers:
            </p>
          </div>
          <FeatureList
            features={[
              "Dimensional repeatability across production cycles",
              "Smooth internal surfaces for controlled polymer flow and clean release",
              <>
                Precision-matched die +{" "}
                <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                  mandrel
                </Link>{" "}
                sets
              </>,
              "Stable heating and cooling behavior",
              "Consistent geometry that holds tolerance",
            ]}
          />
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            While competitors focus mainly on machining capability, ONEXRF focuses on
            solving the catheter application — from the tooling to the process
            parameters that make it work.
          </p>
        </SectionWithImage>
      </section>

      {/* SECTION 3: ONEXRF Advantages */}
      <section id="advantages" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          ONEXRF Advantages
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          No hype — just the operational realities that matter to engineers with deadlines.
        </p>
        <ComparisonTable
          rows={[
            {
              capability: "Die Delivery Lead Time",
              onexrf: "2–4 weeks (2-week expedite)",
              competitors: "6–8 weeks",
            },
            {
              capability: (
                <>
                  <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                    Mandrel
                  </Link>{" "}
                  Delivery Lead Time
                </>
              ),
              onexrf: "2–4 weeks",
              competitors: "6–8 weeks",
            },
            {
              capability: "Engineering Communication",
              onexrf: "Direct access, no bureaucracy",
              competitors: "Often routed through sales → engineering queues",
            },
            {
              capability: "Process Development Included",
              onexrf: "Yes — full recipe optimization",
              competitors: "Limited or paid add-on",
            },
            {
              capability: "Repair / Rebuild Services",
              onexrf: "Yes",
              competitors: "Limited",
            },
            {
              capability: "Lifecycle Support",
              onexrf: "R&D → qualification → production",
              competitors: "Varies",
            },
          ]}
        />
      </section>

      {/* SECTION 4: What We Manufacture */}
      <section id="manufacture" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Custom dies and mandrels for catheter manufacturing"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              What We Manufacture
            </h2>
            <p className="text-base font-medium text-slate-700">
              Custom Dies and{" "}
              <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                Mandrels
              </Link>{" "}
              for Every Catheter Geometry
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We manufacture tooling for OD ranges starting at 2Fr and above, including:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FeatureList
                title="Die Types"
                features={[
                  "Tip forming (closed-end, tapered, conical, radius, neckdown, step transitions)",
                  "Soft tip bonding dies",
                  "Flaring and dilator geometries",
                  "Multi-lumen dies",
                  "Balloon catheter end forms",
                  "CVC, sheath, and introducer tip geometries",
                  "Guidewire tip dies (0.014\"–0.038\")",
                ]}
              />
            </div>
            <div className="space-y-4">
              <FeatureList
                title="Material Options"
                features={[
                  "Stainless steel",
                  "Heat-treated tool steels",
                  "Carbide for high-wear applications",
                  "Optional coatings for release improvement",
                ]}
              />
              <div className="pt-4">
                <h3 className="text-base font-semibold text-slate-900 mb-3">Precision</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Tolerances down to ±0.01 mm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Concentricity held for uniform wall thickness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Mirror-polished forming cavities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Tooling Development Process */}
      <section id="process" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Tooling development process"
          imageRight={false}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Tooling Development Process
            </h2>
            <ProcessSteps
              steps={[
                {
                  number: 1,
                  title: "Application Review",
                  description:
                    "You send a drawing, sample catheter, or sample die. We evaluate geometry, materials, and functional requirements.",
                },
                {
                  number: 2,
                  title: "Tooling Design",
                  description: (
                    <>
                      We design or reverse-engineer the die +{" "}
                      <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                        mandrel
                      </Link>{" "}
                      set to achieve:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>consistent melt profile</li>
                        <li>controlled polymer flow</li>
                        <li>predictable release</li>
                        <li>accurate dimensional transitions</li>
                      </ul>
                    </>
                  ),
                },
                {
                  number: 3,
                  title: "Precision Manufacturing",
                  description:
                    "Each die is machined, EDM-cut if required, heat treated, and polished by specialists.",
                },
                {
                  number: 4,
                  title: "Process Development",
                  description: (
                    <>
                      Unlike most tooling suppliers, ONEXRF validates each die with a full
                      parameter search:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>heat levels</li>
                        <li>dwell time</li>
                        <li>pull distance</li>
                        <li>pressure</li>
                        <li>cooling</li>
                      </ul>
                      You receive a working process recipe, not just a die.
                    </>
                  ),
                },
                {
                  number: 5,
                  title: "Sample Production",
                  description:
                    "We produce samples for engineering evaluation and qualification studies.",
                },
                {
                  number: 6,
                  title: "Long-Term Support",
                  description:
                    "Direct access to the engineers who built your tooling — during R&D and through production scale-up.",
                },
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: Repair & Reverse Engineering */}
      <section id="repair" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Die repair and reverse engineering services"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Repair, Reverse Engineering & Emergency Support
            </h2>
            <p className="text-base font-medium text-slate-700">
              Need a replacement quickly? Need to duplicate or repair an existing die?
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              We provide:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "Die repair and refurbishment",
                  "Surface restoration and re-polishing",
                  <>
                    <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                      Mandrel
                    </Link>{" "}
                    straightening or replacement
                  </>,
                  "Reverse engineering from a sample die",
                  "2-week expedited manufacturing options",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              If a repair isn't feasible, we recreate the die exactly — geometry, fit, and
              performance — in under 3 weeks.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 7: Quality Standards */}
      <section id="quality" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Quality standards and inspection"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Quality Standards</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Every die undergoes:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "Dimensional inspection",
                  "Concentricity verification",
                  "Material hardness confirmation",
                  "Optical-grade surface finish",
                  "Functional validation during process trials",
                ]}
              />
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm font-semibold text-slate-900 mb-2">You receive:</p>
              <ul className="space-y-1 text-sm text-slate-700">
                <li>• Inspection report</li>
                <li>• Material specs</li>
                <li>• Process parameters (if process development is included)</li>
              </ul>
              <p className="text-sm text-slate-600 mt-3">
                This ensures your die integrates into manufacturing with minimal
                trial-and-error.
              </p>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 8: Example Die Forms Gallery */}
      <section id="examples" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Example Die Forms</h2>
        <p className="text-sm text-slate-600 mb-4">
          Visual gallery of die types we manufacture
        </p>
        <Gallery
          items={[
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Closed-end forming die",
              caption: "Closed-end forming dies",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Taper die",
              caption: "Taper dies",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Multi-lumen forming die",
              caption: "Multi-lumen forming dies",
            },
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Flaring die",
              caption: "Flaring dies",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Bonding die",
              caption: "Bonding dies",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Balloon forming die",
              caption: "Balloon forming dies",
            },
          ]}
          columns={3}
        />
      </section>

      {/* SECTION 9: Partner in Entire Application */}
      <section id="partner" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Partnership in catheter application development"
          imageRight={true}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              A Partner in the Entire Catheter Application
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rather than simply machining tooling, ONEXRF supports your entire catheter
              application from:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="font-semibold text-slate-900 mb-2">Prototype development</h3>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Pre-clinical and clinical builds
                </h3>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Scale-up into production
                </h3>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Because we develop the machine, tooling, and process together, engineers get:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <FeatureList
                features={[
                  "faster development cycles",
                  "fewer iterations",
                  "predictable production results",
                  "lower scrap and rework",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              This integration is the core ONEXRF differentiator — and it's what keeps
              engineers coming back.
            </p>
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Need a die designed, repaired, or replaced?
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Send us your drawing or sample. We'll take it from there.
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

