import { notFound } from "next/navigation";
import { getSupportBySlug } from "@/lib/support";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { MarketingHero } from "@/components/MarketingHero";
import { FeatureList } from "@/components/FeatureList";
import { SectionWithImage } from "@/components/SectionWithImage";

export default async function MachineServicingPage() {
  const support = getSupportBySlug("machine-servicing");

  if (!support) return notFound();

  const sections: Section[] = [
    { id: 'technical-support', label: 'Technical Support' },
    { id: 'installation', label: 'Installation & Training' },
    { id: 'maintenance', label: 'Preventive Maintenance' },
    { id: 'parts', label: 'Parts Support' },
    { id: 'upgrades', label: 'System Upgrades' },
    { id: 'process', label: 'Process Support' },
    { id: 'lifecycle', label: 'Lifecycle Support' },
    { id: 'contact', label: 'Contact' },
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
        heading="Service & Support"
        body={
          <>
            <span className="font-semibold block mb-2">Structured Support for RF Catheter Forming and RF Welding Systems</span>
            ONEXRF provides technical service and support for all ONEXRF-manufactured catheter forming and RF welding systems. Support is designed to ensure reliable operation, fast issue resolution, and long-term system performance across R&D, validation, and production environments.
            <br />
            <br />
            Our support model is built around direct access to ONEXRF engineers, fast response, and deep application expertise.
          </>
        }
        media={
          support.image
            ? {
                src: support.image,
                alt: "Machine Servicing & Support",
              }
            : undefined
        }
        primaryCTA={{
          label: "Request Service",
          href: "/contact?support=machine-servicing",
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Technical Support */}
      <section id="technical-support" className="scroll-mt-20">
        <div className="space-y-6">
          <SectionWithImage
            image="/images/tooling/placeholder-1.png"
            imageAlt="Technical Support"
            imageRight={true}
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                Technical Support
              </h2>
              <p className="text-slate-700 leading-relaxed">
                ONEXRF provides both remote and onsite technical support for RF catheter forming and RF welding systems.
              </p>
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Remote Support</h3>
                <FeatureList
                  features={[
                    "Initial troubleshooting via phone or remote communication",
                    "Direct interaction with ONEXRF engineers familiar with your system and application",
                    "Guidance for onsite technicians and engineers to resolve issues quickly",
                  ]}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Onsite Support</h3>
                <FeatureList
                  features={[
                    "Field service visits when remote resolution is not sufficient",
                    "Diagnosis and repair of RF generators, controls, tooling interfaces, and mechanical subsystems",
                    "Process troubleshooting related to catheter forming, bonding, flaring, or RF welding",
                  ]}
                />
              </div>

              <p className="text-sm text-slate-600">
                Support is focused on restoring stable operation as quickly as possible while minimizing disruption to production.
              </p>
            </div>
          </SectionWithImage>
        </div>
      </section>

      {/* SECTION 3: Installation, Commissioning & Training */}
      <section id="installation" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Installation and Training"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Installation, Commissioning & Training
            </h2>
            <p className="text-slate-700 leading-relaxed">
              ONEXRF supports customers during system installation and initial operation to ensure a smooth transition into use.
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Installation & Commissioning</h3>
              <FeatureList
                features={[
                  "System setup and verification",
                  "Functional checks of RF generator, controls, and safety systems",
                  "Initial process verification using customer tooling and materials",
                ]}
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Training</h3>
              <FeatureList
                features={[
                  "Operator and technician training during installation",
                  "Engineering-level training for system understanding and troubleshooting",
                  <>
                    Optional advanced{" "}
                    <Link href="/support/training" className="text-blue-600 hover:underline">
                      training seminars
                    </Link>{" "}
                    covering RF heating theory, tooling behavior, and generator operation
                  </>,
                ]}
              />
            </div>

            <p className="text-sm text-slate-600">
              Training is intended to reduce ramp-up time and improve long-term system reliability.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: Preventive Maintenance */}
      <section id="maintenance" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Preventive Maintenance"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Preventive Maintenance & System Inspection
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Preventive maintenance services are available to help customers avoid unplanned downtime and maintain consistent performance.
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Services may include:
            </p>
            <FeatureList
              features={[
                "System inspection and functional verification",
                "Review of RF generator performance",
                "Evaluation of control systems and safety components",
                "Identification of wear items or components requiring attention",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              Preventive maintenance can be scheduled as part of routine support or during planned onsite visits.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 5: Parts & Consumables Support */}
      <section id="parts" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Parts Support"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Parts & Consumables Support
            </h2>
            <p className="text-slate-700 leading-relaxed">
              ONEXRF supports customers with OEM replacement parts and guidance on maintaining system readiness.
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Parts Support Includes:
            </p>
            <FeatureList
              features={[
                "Replacement electronic components",
                "Control system components",
                "Mechanical and electrical wear items",
                "Guidance on recommended spare parts for production environments",
                <>
                  Die, mandrel, and{" "}
                  <Link href="/tooling" className="text-blue-600 hover:underline">
                    tooling
                  </Link>{" "}
                  components
                </>,
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              ONEXRF engineers can assist with spare part planning to support both routine maintenance and emergency needs.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 6: System Upgrades & Retrofits */}
      <section id="upgrades" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="System Upgrades"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              System Upgrades & Retrofits
            </h2>
            <p className="text-slate-700 leading-relaxed">
              ONEXRF continuously develops improvements to system controls, software, and electronics. When upgrades are available, customers are informed of applicable options.
            </p>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Upgrade Support Includes:</h3>
              <FeatureList
                features={[
                  "Evaluation of upgrade compatibility with existing systems",
                  "Software updates",
                  "Control system and electronics upgrades",
                  "Onsite installation and verification",
                ]}
              />
            </div>

            <p className="text-sm text-slate-600">
              Where possible, ONEXRF designs upgrades to remain compatible with existing equipment to extend system life and protect customer investment.
            </p>

            <div className="mt-6 bg-slate-50 p-4 rounded-lg space-y-3">
              <h3 className="text-base font-semibold text-slate-900">Examples of Recent System Enhancements</h3>
              
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Catheter Tippers — Software Revision 11.1</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 ml-4 mt-1 space-y-1">
                  <li>Process data recording</li>
                  <li>Die–coil–material recording</li>
                  <li>Dual pressure smooth slide control</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-800">RF Welders</h4>
                <ul className="list-disc list-inside text-sm text-slate-600 ml-4 mt-1 space-y-1">
                  <li>Process data collection</li>
                  <li>Data transfer for audit and traceability</li>
                  <li>Conversion of hand wiring to PCB–PLC direct-connect modules</li>
                </ul>
              </div>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 7: Process & Application Support */}
      <section id="process" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-3.png"
          imageAlt="Process Support"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Process & Application Support
            </h2>
            <p className="text-slate-700 leading-relaxed">
              ONEXRF support extends beyond hardware and includes{" "}
              <Link href="/support/process-development" className="text-blue-600 hover:underline">
                process-level assistance
              </Link>
              .
            </p>
            <p className="text-sm text-slate-600 mb-4">
              This includes:
            </p>
            <FeatureList
              features={[
                "Troubleshooting forming, bonding, flaring, or welding issues",
                "Support during process changes or material changes",
                "Assistance optimizing yield and repeatability",
                "Guidance when scaling from R&D into production",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              Because ONEXRF engineers are involved in tooling design and process development, support is grounded in real application knowledge rather than generic service procedures.
            </p>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4">
              <h3 className="text-base font-semibold text-slate-900 mb-2">Certification & Verification Support</h3>
              <p className="text-sm text-slate-600 mb-2">
                ONEXRF can support system verification activities as part of service visits or inspections, including:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-600 ml-2 space-y-1">
                <li>Verification of RF generator response</li>
                <li>Confirmation of system operating characteristics</li>
                <li>Documentation support for internal quality or audit requirements</li>
              </ul>
              <p className="text-sm text-slate-600 mt-2">
                This helps customers maintain confidence in system performance over time.
              </p>
            </div>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 8: Lifecycle Support Approach */}
      <section id="lifecycle" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-1.png"
          imageAlt="Lifecycle Support"
          imageRight={true}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Lifecycle Support Approach
            </h2>
            <p className="text-slate-700 leading-relaxed">
              ONEXRF support is structured to follow the full lifecycle of a catheter application:
            </p>
            <FeatureList
              features={[
                "Installation and initial setup",
                "R&D and process development",
                "Verification and validation support",
                "Production and sustainment",
                "System upgrades and long-term maintenance",
              ]}
            />
            <p className="text-sm text-slate-600 mt-4">
              Customers work directly with ONEXRF engineers throughout this lifecycle, ensuring continuity and technical consistency.
            </p>
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 9: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Contact & Support Requests
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            If you experience issues with your RF catheter forming or RF welding system, or require service, support, or upgrades, please contact ONEXRF directly.
          </p>
          <p className="text-sm text-slate-600 mb-4">
            Initial troubleshooting is typically performed remotely. If onsite service is required, ONEXRF will coordinate a visit based on urgency and system needs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact?support=machine-servicing"
              className="inline-block bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition-colors"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

