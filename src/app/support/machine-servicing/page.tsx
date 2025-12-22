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
    { id: 'services', label: 'Services' },
    { id: 'maintenance', label: 'Preventative Maintenance' },
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
        heading="Machine Servicing & Support"
        body={
          <>
            Keep your ONEXRF equipment running at peak performance with our comprehensive servicing and support options.
            <br />
            <br />
            From emergency repairs to scheduled preventative maintenance, our team is ready to assist.
          </>
        }
        media={
          support.image
            ? {
                src: support.image,
                alt: "Machine Servicing",
              }
            : undefined
        }
        primaryCTA={{
          label: "Request Service",
          href: "/contact?support=machine-servicing",
        }}
      />

      <PageNav sections={sections} />

      {/* SECTION 2: Services */}
      <section id="services" className="scroll-mt-20">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Service Capabilities
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
             <SectionWithImage
              image="/images/tooling/placeholder-1.png"
              imageAlt="Service Capabilities"
              imageRight={true}
            >
              <div className="space-y-4">
                <FeatureList
                  features={[
                    "On-site troubleshooting and repair",
                    "Remote diagnostic support",
                    "Software updates and calibration",
                    "Hardware upgrades and retrofits",
                    "Spare parts replacement",
                  ]}
                />
              </div>
            </SectionWithImage>
          </div>
        </div>
      </section>

      {/* SECTION 3: Maintenance */}
      <section id="maintenance" className="scroll-mt-20">
        <SectionWithImage
          image="/images/tooling/placeholder-2.png"
          imageAlt="Preventative Maintenance"
          imageRight={false}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Preventative Maintenance</h2>
            <p className="text-sm text-slate-600 mb-4">
              Regular maintenance prevents unexpected downtime and ensures product quality.
            </p>
            <FeatureList
              features={[
                "Annual or bi-annual service visits",
                "System cleaning and inspection",
                "RF generator tuning and verification",
                "Cooling system check",
                "Pneumatic and mechanical component inspection",
              ]}
            />
          </div>
        </SectionWithImage>
      </section>

      {/* SECTION 4: Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="border-t border-slate-200 pt-6">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Need Service?
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Contact our support team to schedule a service visit or request parts.
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

