import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { MarketingHero } from "@/components/MarketingHero";
import { FeatureList } from "@/components/FeatureList";
import { SectionWithImage } from "@/components/SectionWithImage";

export default function CatheterFormingRFPage() {
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'day1', label: 'Day 1: Fundamentals' },
    { id: 'day2', label: 'Day 2: Advanced (Optional)' },
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
        / <span className="text-slate-700">RF Heating Training</span>
      </nav>

      {/* SECTION 1: HERO */}
      <MarketingHero
        heading="RF Heating Training for Catheter Forming Applications"
        body={
          <>
            ONEXRF offers technical training seminars focused on the use of radio-frequency (RF) heating technology for catheter tip forming, flaring, and bonding applications.
            <br />
            <br />
            These seminars are designed to help engineering and manufacturing teams better understand RF-based processes, tooling considerations, and machine operation.
          </>
        }
        media={{
          src: "/images/support/placeholder.png",
          alt: "RF Heating Training",
        }}
        primaryCTA={{
          label: "Request Training Information",
          href: "/contact?subject=RF%20Training",
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Overview */}
      <section id="overview" className="scroll-mt-20">
        <div className="space-y-6">
           <SectionWithImage
            image="/images/tooling/placeholder-1.png"
            imageAlt="Training Seminar Overview"
            imageRight={true}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                RF Catheter Forming Systems Training
              </h2>
              <p className="text-slate-700 leading-relaxed">
                ONEXRF provides a one-day condensed training seminar for customers using RF catheter forming systems.
              </p>
              <p className="text-slate-700 leading-relaxed">
                For customers seeking a deeper technical understanding of RF generator operation and coil tuning, an optional second day of hands-on training is available at ONEXRF.
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
              Day 1 — RF Heating Fundamentals & Application Principles
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The first day focuses on establishing a solid technical foundation, including:
            </p>
            <FeatureList
              features={[
                "Fundamentals of radio frequency and electromagnetic induction heating",
                "How RF energy is applied in catheter tip forming, flaring, and bonding",
                "Tooling considerations, including die design and its impact on heat distribution",
                "Methods for controlling the heat zone to achieve consistent part quality",
                "An overview of RF system architecture",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              Depending on the technical background of the participants, this session may also include an introduction to RF electronics concepts to support deeper understanding of system behavior.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: Day 2 */}
      <section id="day2" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Day 2 Advanced Training"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Day 2 (Optional) — Advanced RF Generator & Coil Tuning (Hands-On)
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              The optional second day is intended for advanced users and engineering personnel who require hands-on experience with RF systems. This session includes:
            </p>
            <FeatureList
              features={[
                "RF generator fundamentals and operational principles",
                "Coil design considerations and tuning methods",
                "Die and coil tuning using different die sizes and geometries",
                "Troubleshooting common RF heating and process issues",
                "Practical exercises using ONEXRF equipment",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              This session is best suited for engineers responsible for process optimization, troubleshooting, or advanced system setup.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Interested in RF Training?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Contact us to schedule a seminar or request more details about the curriculum.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?subject=RF%20Training"
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

