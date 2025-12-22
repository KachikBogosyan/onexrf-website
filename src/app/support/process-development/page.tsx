import { notFound } from "next/navigation";
import { getSupportBySlug } from "@/lib/support";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { MarketingHero } from "@/components/MarketingHero";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FeatureList } from "@/components/FeatureList";
import { SectionWithImage } from "@/components/SectionWithImage";

export default async function ProcessDevelopmentPage() {
  const support = getSupportBySlug("process-development");

  if (!support) return notFound();

  const sections: Section[] = [
    { id: 'benefits', label: 'Benefits' },
    { id: 'use-cases', label: 'When to Use' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'deliverables', label: 'Deliverables' },
    { id: 'getting-started', label: 'Getting Started' },
  ];

  return (
    <div className="space-y-12">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/support" className="hover:underline">
          Support
        </Link>{" "}
        / <span className="text-slate-700">{support.name}</span>
      </nav>

      {/* SECTION 1: HERO */}
      <MarketingHero
        heading="Proof of Principle & Process Development"
        body={
          <>
            <span className="font-semibold block mb-2">Save Time. Get Results.</span>
            ONEXRF’s Proof of Principle and process development service exists to save your team time and remove uncertainty around catheter manufacturability.
            <br />
            <br />
            Instead of dedicating internal engineering resources to trial-and-error development, ONEXRF develops the forming, bonding, or flaring process for you and provides a verified, repeatable baseline.
          </>
        }
        media={
          support.image
            ? {
                src: support.image,
                alt: "Process Development",
              }
            : undefined
        }
        primaryCTA={{
          label: "Begin Process Development",
          href: "/contact?support=process-development",
        }}
        secondaryCTA={{
          label: "Send Drawings or Samples",
          href: "/contact?support=process-development&action=sample",
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Benefits */}
      <section id="benefits" className="scroll-mt-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Why Choose Process Development?
          </h2>
             <SectionWithImage
              image="/images/tooling/placeholder-1.png"
              imageAlt="Process Development Benefits"
              imageRight={true}
            >
              <div className="space-y-4">
                <FeatureList
                  features={[
                    "Confirm that a catheter design can be produced consistently and with high yield using RF forming",
                    "Avoid low-yield or slow manual methods (e.g., heat guns)",
                    "Offload process development so internal teams can focus on design, testing, and program execution",
                    "Obtain sample parts formed under controlled, production-relevant conditions",
                    "Make fast tooling adjustments when geometry or yield needs improvement",
                  ]}
                />
              </div>
            </SectionWithImage>
        </div>
      </section>

      {/* SECTION 3: When to Use */}
      <section id="use-cases" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Engineering Use Cases"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">When Engineering Teams Use This Service</h2>
            <p className="text-sm text-slate-600 mb-4">
              This service is commonly used when:
            </p>
            <FeatureList
              features={[
                "Developing a new catheter design",
                "Modifying an existing design",
                "Evaluating manufacturability early in a program",
                "Transitioning from manual heating to RF forming",
                "Preparing for verification or pilot builds",
                "Internal engineering bandwidth is limited",
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: How the Service Works */}
      <section id="how-it-works" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Process Development Steps"
          imageRight={true}
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              How the Service Works
            </h2>
            <p className="text-sm text-slate-600">
              This service focuses on developing and validating a forming process using your materials and application geometry.
            </p>
            <ProcessSteps
              steps={[
                {
                  number: 1,
                  title: "Application Review",
                  description:
                    "You provide catheter drawings and material samples. ONEXRF reviews geometry, material behavior, and feasibility for RF-based forming.",
                },
                {
                  number: 2,
                  title: "Tooling (if required)",
                  description:
                    "If tooling does not exist, ONEXRF designs and manufactures the required die and mandrel. If tooling exists, it is evaluated and modified if necessary.",
                },
                {
                  number: 3,
                  title: "Process Development",
                  description: (
                    <>
                      Using the tooling and catheter materials, ONEXRF determines the appropriate:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>heat and RF timing</li>
                        <li>forming duration</li>
                        <li>pressure or pull requirements</li>
                        <li>cooling behavior</li>
                      </ul>
                      Parameters are adjusted until consistent results are achieved.
                    </>
                  ),
                },
                {
                  number: 4,
                  title: "Sample Output",
                  description:
                    "Sample catheter tips are produced using the developed parameters for engineering evaluation.",
                },
                {
                  number: 5,
                  title: "Documentation",
                  description: (
                    <>
                      You receive:
                      <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                        <li>recommended forming parameters</li>
                        <li>notes on process sensitivity and controls</li>
                        <li>any tooling adjustments made or recommended</li>
                        <li>sample parts</li>
                      </ul>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Deliverables */}
      <section id="deliverables" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Deliverables"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Deliverables</h2>
            <p className="text-sm text-slate-600 mb-4">
              Depending on the project, ONEXRF provides:
            </p>
            <FeatureList
              features={[
                "Sample catheter tips",
                "Forming or bonding parameters",
                "Notes on expected variation and controls",
                "Tooling (if created or modified)",
                "Recommendations for next steps toward production",
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: Getting Started */}
      <section id="getting-started" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Getting Started
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            To begin a Proof of Principle or process development project, provide:
          </p>
           <div className="mb-6">
             <FeatureList
              features={[
                "Catheter drawings",
                "Catheter material samples",
                "Relevant dimensional or functional requirements",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              ONEXRF will review the application and provide a timeline and quotation.
            </p>
           </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?support=process-development"
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Begin Process Development
            </Link>
            <Link
              href="/contact?support=process-development&action=sample"
              className="inline-block border border-blue-600 text-blue-600 px-4 py-2 text-sm font-medium rounded hover:bg-blue-50 transition-colors"
            >
              Send Drawings or Samples
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
