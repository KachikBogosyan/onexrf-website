import { notFound } from "next/navigation";
import { getToolingBySlug } from "@/lib/tooling";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { MarketingHero } from "@/components/MarketingHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FeatureList } from "@/components/FeatureList";
import { Gallery } from "@/components/Gallery";
import { SectionWithImage } from "@/components/SectionWithImage";

export default async function CatheterTippingDiePage() {
  const tooling = getToolingBySlug("catheter-tipping-die");

  if (!tooling) return notFound();

  const sections: Section[] = [
    { id: 'why-choose', label: 'Why Choose ONEXRF' },
    { id: 'process', label: 'Development Process' },
    { id: 'manufacture', label: 'What We Manufacture' },
    { id: 'replacement', label: 'Replacement & Support' },
    { id: 'quality', label: 'Quality & Verification' },
    { id: 'mandrels', label: 'Mandrels' },
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
        heading="Custom Dies Manufactured, Tested, and Delivered Fast"
        body={
          <>
            We design, manufacture, and validate catheter tipping dies for forming, bonding, and
            flaring applications.
            <br />
            <br />
            <span className="font-medium">Standard lead time: 4 weeks.</span>
            <br />
            <span className="font-medium">Expedite option: 2 weeks.</span>
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
          label: "Request a Quote",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}`,
        }}
        secondaryCTA={{
          label: "Send a Drawing or Sample",
          href: `/contact?tooling=${encodeURIComponent(tooling.name)}&action=quote`,
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Why Companies Select ONEXRF */}
      <section id="why-choose" className="scroll-mt-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why Companies Select ONEXRF for Catheter Dies
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Manufacturing</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Standard delivery in 4 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Expedite available in 2 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Faster than most industry suppliers</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Cost-Effective</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Advantageous pricing compared to large tooling manufacturers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Lean operations allow lower cost without sacrificing precision</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Application-Level Verification
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>We test the die using your catheter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>
                      We confirm geometry, forming behavior, and release characteristics
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>
                      You receive parameter guidance to reduce trial-and-error on your end
                    </span>
                  </li>
                </ul>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Direct Engineer Access</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Communicate directly with ONEXRF engineers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                    <span>Support throughout design, testing, and production</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed pt-2">
            This combination reduces development time, risk, and scrap.
          </p>
        </div>
      </section>

      {/* SECTION 3: Tooling Development Process */}
      <section id="process" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Tooling development process"
          imageRight={false}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Our Tooling Development Process
            </h2>
            <ProcessSteps
              steps={[
                {
                  number: 1,
                  title: "Application Review",
                  description:
                    "We evaluate your catheter design, required tip geometry, and process goals. You may provide a drawing or a physical sample.",
                },
                {
                  number: 2,
                  title: "Die and Mandrel Design",
                  description: (
                    <>
                      We design a matched die/{" "}
                      <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                        mandrel
                      </Link>{" "}
                      set to achieve:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>dimensional accuracy</li>
                        <li>uniform wall transitions</li>
                        <li>stable forming behavior</li>
                        <li>reliable removal after cooling</li>
                      </ul>
                    </>
                  ),
                },
                {
                  number: 3,
                  title: "Manufacturing",
                  description:
                    "Dies are CNC-machined, EDM-shaped when needed, heat treated, and polished to the required finish level.",
                },
                {
                  number: 4,
                  title: "Testing With Your Catheter",
                  description: (
                    <>
                      We verify:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>melt profile</li>
                        <li>dimensional outcome</li>
                        <li>release behavior</li>
                        <li>mandrel interaction</li>
                        <li>overall forming consistency</li>
                      </ul>
                      We provide guidance on forming parameters based on these tests.
                    </>
                  ),
                },
                {
                  number: 5,
                  title: "Sample Parts",
                  description:
                    "Upon request, sample catheter tips can be produced for review or qualification.",
                },
                {
                  number: 6,
                  title: "Ongoing Support",
                  description:
                    "The engineers who designed your tooling remain available during R&D, pilot, and production stages.",
                },
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: What We Manufacture */}
      <section id="manufacture" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Custom dies for catheter manufacturing"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">What We Manufacture</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              ONEXRF produces dies for the following applications:
            </p>
            <FeatureList
              features={[
                "Tip forming (closed end, radius, taper, conical, neckdown)",
                "Soft-tip bonding",
                "Flaring and dilator geometries",
                "Multi-lumen tip forming",
                "CVC, introducer, and sheath geometries",
                "Guidewire forming dies (0.014\"–0.038\")",
              ]}
            />
            <p className="text-sm text-slate-600 leading-relaxed pt-4">
              Size capability starts at 2Fr and above.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you have a sample or drawing, we can match it. If not, we can create the design
              from your catheter.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Replacement and Reverse Engineering */}
      <section id="replacement" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Die replacement and reverse engineering services"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Replacement and Reverse Engineering
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">We offer:</p>
            <FeatureList
              features={[
                "Replacements for worn or damaged tooling",
                "Reverse engineering from a physical sample",
                "Fast-turn replacements (standard 4 weeks, expedite 2 weeks)",
              ]}
            />
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              This minimizes downtime and maintains process consistency.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: Quality and Verification */}
      <section id="quality" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Quality standards and verification"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Quality and Verification</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Each die is measured and inspected for:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureList
                features={[
                  "ID/OD dimensions",
                  "Concentricity",
                  "Surface finish",
                  "Feature accuracy",
                  "Material and hardness compliance",
                ]}
              />
            </div>
            <div className="mt-6">
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                When application testing is performed, we also verify:
              </p>
              <FeatureList
                features={[
                  "forming consistency",
                  "repeatability",
                  "tip geometry accuracy",
                ]}
              />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-4">
              Documentation is provided on request.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 7: Mandrels */}
      <section id="mandrels" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Catheter mandrels"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Mandrels</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mandrels provide the internal support required during tip forming, bonding, and
              flaring. ONEXRF manufactures{" "}
              <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:underline">
                mandrels
              </Link>{" "}
              alongside the die so both tools work as a matched set, ensuring stable lumen support
              and consistent forming behavior.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We supply straight, tapered, stepped, and shaped mandrels in stainless steel, tool
              steel, or Nitinol, with optional low-friction coatings.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Lead time matches die manufacturing: 4 weeks, with 2-week expedite available.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Mandrels can be produced from drawings or reverse engineered from an existing tool or
              catheter sample.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 8: Examples of Common Die Forms */}
      <section id="examples" className="scroll-mt-20 space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Examples of Common Die Forms</h2>
        <p className="text-sm text-slate-600 mb-4">
          Examples include:
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
              alt: "Taper forming die",
              caption: "Taper forming dies",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Bonding die",
              caption: "Bonding dies",
            },
            {
              src: "/images/tooling/placeholder-1.png",
              alt: "Flaring die",
              caption: "Flaring dies",
            },
            {
              src: "/images/tooling/placeholder-2.png",
              alt: "Multi-lumen die",
              caption: "Multi-lumen and shaped cavity dies",
            },
            {
              src: "/images/tooling/placeholder-3.png",
              alt: "Guidewire die",
              caption: "Guidewire dies",
            },
          ]}
          columns={3}
        />
      </section>

      {/* SECTION 9: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Need a die designed, tested, repaired, or replaced?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Send us a drawing or sample and we will provide a timeline and quotation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?tooling=${encodeURIComponent(tooling.name)}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href={`/contact?tooling=${encodeURIComponent(tooling.name)}&action=expedite`}
              className="inline-block border border-blue-600 text-blue-600 px-4 py-2 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
            >
              Expedite My Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
