import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { MarketingHero } from "@/components/MarketingHero";
import { FeatureList } from "@/components/FeatureList";
import { SectionWithImage } from "@/components/SectionWithImage";

export default function RFWeldingTrainingPage() {
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'day1', label: 'Day 1: Principles' },
    { id: 'day2', label: 'Day 2: Systems & Process' },
    { id: 'day3', label: 'Day 3: Advanced (Optional)' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-12">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/support" className="hover:underline">
          Support
        </Link>{" "}
        /{" "}
        <Link href="/support/training" className="hover:underline">
          Training
        </Link>{" "}
        / <span className="text-slate-700">RF Welding Seminar</span>
      </nav>

      {/* SECTION 1: HERO */}
      <MarketingHero
        heading="RF Welding & Heat Sealing Training Seminar"
        body={
          <>
            ONEXRF offers technical training seminars focused on radio-frequency (RF) heating technology as applied to RF welding and RF heat sealing processes.
            <br />
            <br />
            These seminars are designed for engineering and manufacturing teams who want a deeper understanding of RF welding systems, tooling, and process optimization for plastics and other RF-responsive materials.
          </>
        }
        media={{
          src: "/images/support/placeholder.png",
          alt: "RF Welding Seminar",
        }}
        primaryCTA={{
          label: "Request Training Information",
          href: "/contact?subject=RF%20Welding%20Training",
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Overview */}
      <section id="overview" className="scroll-mt-20">
        <div className="space-y-6">
           <SectionWithImage
            image="/images/tooling/placeholder-1.png"
            imageAlt="RF Welding Training Overview"
            imageRight={true}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                RF Welding Training Seminar Overview
              </h2>
              <p className="text-slate-700 leading-relaxed">
                The RF Welding Training Seminar is structured as a multi-day program, with increasing technical depth.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Participants may attend the first day only, or continue into advanced sessions depending on their role and experience level.
              </p>
            </div>
          </SectionWithImage>
        </div>
      </section>

      {/* SECTION 3: Day 1 */}
      <section id="day1" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Day 1 Training"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Day 1 — RF Heating Principles for Welding & Sealing
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The first day focuses on fundamental concepts, including:
            </p>
            <FeatureList
              features={[
                "Principles of radio frequency heating and electromagnetic wave behavior",
                "Interaction of RF energy with polar molecules during material heating",
                "Fundamentals of RF welding and RF heat sealing processes",
                "Material considerations for plastics and other RF-responsive materials",
                "Overview of typical RF welding applications",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              This session establishes the theoretical foundation required to understand RF welding behavior and process outcomes.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: Day 2 */}
      <section id="day2" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Day 2 Training"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Day 2 — RF Welding Systems, Tooling, and Process Optimization
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The second day builds on the fundamentals and focuses on system-level understanding, including:
            </p>
            <FeatureList
              features={[
                "RF electronics fundamentals as applied to welding systems",
                "Construction and operation of RF welding and RF heat sealing machines",
                "RF sealing die design and its impact on weld quality and consistency",
                "Process optimization techniques for RF welding and sealing applications",
                "Common process challenges and practical mitigation strategies",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              This session is intended for engineers and technicians responsible for system setup, tooling design, and process tuning.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Day 3 */}
      <section id="day3" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Day 3 Advanced Training"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Day 3 (Optional) — Advanced RF Systems & Hands-On Training
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The optional third day is designed for advanced users and senior engineers and includes hands-on instruction covering:
            </p>
            <FeatureList
              features={[
                "RF generator construction and operational principles",
                "Troubleshooting RF welding and sealing systems",
                "Auto-tuner design and operation",
                "Impedance matching using different die sizes and material combinations",
                "Practical exercises using ONEXRF RF welding equipment",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              This advanced session is best suited for personnel responsible for system diagnostics, optimization, and advanced technical support.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Interested in RF Welding Training?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Contact us to schedule a seminar or request more details about the curriculum.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?subject=RF%20Welding%20Training"
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Request Training Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
