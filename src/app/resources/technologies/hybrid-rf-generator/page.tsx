// app/(marketing)/technology/rf-welding-hybrid-generator/page.tsx

// Recreates https://www.onexrf.com/rf-welding-hybrid-generator-technology-for-rf-heating-sealing-machines

// but with a cleaner layout, stronger credibility, better UX, and no "video tag" fallback issues.

import Image from "next/image";
import Link from "next/link";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { Callout } from "@/components/Callout";
import { StatCard } from "@/components/StatCard";
import { IconCard } from "@/components/IconCard";
import { SpecCard } from "@/components/SpecCard";
import { ControlBlock } from "@/components/ControlBlock";
import { SectionTitle } from "@/components/SectionTitle";
import { Check, Dot } from "@/components/ui/Icons";

export const metadata = {
  title: "Hybrid RF Generator (RFHG-27) | Arc-Free RF Welding Process Control | ONEX RF",
  description:
    "Hybrid RF generator technology for RF welding and RF heat sealing machines: fast arc shut-down, closed-loop power control, and automatic impedance matching for repeatable seals.",
  alternates: {
    canonical: "/technology/rf-welding-hybrid-generator",
  },
};

export default function Page() {
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'controls', label: 'Controls' },
    { id: 'welders', label: 'Welders' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        /{" "}
        <Link href="/resources/technologies" className="hover:underline">
          Technologies
        </Link>{" "}
        / <span className="text-slate-700">Hybrid RF Generator Technology</span>
      </nav>

      <div className="mb-8">
      
        <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          Hybrid RF Generator for <span className="text-zinc-700">Arc-Free</span> RF Welding Machines
        </h1>
        <p className="mt-4 text-lg text-zinc-700">
          RFHG-27-4/6/8/10/15
        </p>
      </div>

      <PageNav sections={sections} />

      {/* Hero / Overview */}
      <section id="overview" className="scroll-mt-20 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 space-y-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="space-y-4 text-zinc-700">
                <Callout
                  title="Principle of Operation"
                  body="A low-power solid-state driver and a vacuum-tube amplifier work together to deliver high RF output power with stable control. The solid-state stage provides precise drive control; the tube stage provides the high-power RF output."
                />
                <Callout
                  title="Seal Quality Consistency"
                  body="Closed-loop sensing and automatic gain control maintain constant sealing power, compensating for drift from tube aging and input voltage variation."
                />
                <Callout
                  title="Reduced Process Variation & Energy Cost"
                  body="Automatic impedance matching reduces sensitivity to load changes and minimizes energy wasted in reflected power—helping stabilize the process and lower operating cost."
                />
                <Callout
                  title="Training Program"
                  body="ONEX RF training is designed to help operators and maintenance teams run the process correctly, recognize common issues quickly, and keep the system performing consistently."
                />
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <p className="mt-4 text-xs text-zinc-500">
                Note: Performance depends on material, tooling, and process setup. Ask for an application review to estimate results for your product.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 overflow-hidden">
              <div className="relative aspect-[4/3] w-full h-full">
                <Image
                  src="/images/technologies/RF Generator/Hybrid RF Generator .png"
                  alt="Hybrid RF Generator"
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Typical Benefits</h2>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <StatCard
                value="Up to 90%"
                label="Less die damage from arcs"
                footnote="Typical results when arc events are minimized via fast shut-down."
              />
              <StatCard
                value="~50%"
                label="Improved repeatability"
                footnote="Often seen after stabilizing power delivery & matching."
              />
              <StatCard
                value="~20%"
                label="Higher energy efficiency"
                footnote="Common when reflected power is reduced."
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <IconCard
                title="Efficient"
                description="Designed for stable high-power output with robust headroom."
                iconSrc="/images/easy-123.png"
              />
              <IconCard
                title="Closed Loop"
                description="Sensor feedback regulates output to reduce drift and variation."
                iconSrc="/images/easy-cloud.png"
              />
            </div>

            
          </div>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="scroll-mt-20 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            kicker="Specs"
            title="Hybrid RF Generator Basic Specs"
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <SpecCard title='24" × 32"' value="Footprint" detail="Compact cabinet footprint for integration into RF welding systems." />
            <SpecCard title="No Die Damage Guaranteed" value="Fast Arc Shut-Down" detail="Shuts down on arc detection to reduce scrap." />
            <SpecCard title="4–10 kW" value="RF Output Power" detail="Typical power range for RF welding / heat sealing applications." />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Perfect RF Sealing Process Control</h3>
              <ul className="mt-4 space-y-2 text-zinc-700">
                <li className="flex gap-3">
                  <Check /> <span>Fast arc shut-down</span>
                </li>
                <li className="flex gap-3">
                  <Check /> <span>Consistent RF power (closed-loop regulation)</span>
                </li>
                <li className="flex gap-3">
                  <Check /> <span>Repeatable seal quality through stable delivery</span>
                </li>
                <li className="flex gap-3">
                  <Check /> <span>Built-in self diagnostics and limits (reflection / current)</span>
                </li>
              </ul>

            
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Rotary RF Welders</h3>


              {/* Option A: YouTube embed (recommended) */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube-nocookie.com/embed/BuPJ3R6uJzE"
                    title="ONEX RF Rotary RF Welders"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Option B: MP4 (if you host it) */}
              {/* <video className="mt-4 w-full rounded-2xl border border-zinc-200 bg-black" controls preload="metadata">
                <source src="/videos/rfhg-overview.mp4" type="video/mp4" />
              </video> */}


            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section id="controls" className="scroll-mt-20 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            kicker="Controls"
            title="Hybrid RF Generator Controls"
            subtitle="A clearer, more technical presentation of the same control sections on the original page."
          />

          <div className="mt-10 grid gap-8">
            <ControlBlock
              title="1000 W Solid-State RF Generator"
              imageSrc="/images/technologies/RF Generator/RF-Generator-amplifier.png"
              imageAlt="RF Generator"
            >
              <p className="text-zinc-700">
                27.12 MHz solid-state RF generator. ONEX RF designs and manufactures electronics and RF amplifiers in
                Duarte, CA, USA.
              </p>
              <p className="mt-3 text-zinc-700">
                The solid-state amplifier is rated at 1000 W output. The system is designed with headroom so the driver
                stage can operate below its maximum when producing higher RF output power through the tube stage.
              </p>

              <h4 className="mt-5 text-sm font-semibold text-zinc-900">SSRFG-27-1k Features</h4>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li className="flex gap-3">
                  <Dot /> <span>Operates on 0–10 VDC command from a PLC analog module</span>
                </li>
                <li className="flex gap-3">
                  <Dot /> <span>RF sensor feedback regulates output power (closed loop)</span>
                </li>
                <li className="flex gap-3">
                  <Dot /> <span>Converts RF measurements to linear signals for PLC communication</span>
                </li>
                <li className="flex gap-3">
                  <Dot />{" "}
                  <span>
                    Modular design also used in catheter manufacturing systems at 6.78 MHz and 13.56 MHz (where
                    applicable)
                  </span>
                </li>
              </ul>
            </ControlBlock>

            <ControlBlock
              title="Generator Meter Panel"
              imageSrc="/images/technologies/RF Generator/RF-Generator Meter Panel.png"
              imageAlt="RF Generator Meter Panel"
            >
              <p className="text-zinc-700">
                Six meters display key operating conditions to support setup, troubleshooting, and process monitoring.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                {[
                  "Driving Voltage (0–10 VDC)",
                  "RF Forward Power",
                  "RF Reflected Power",
                  "Tube Grid Current",
                  "Tube Plate Current",
                  "Tube Plate Voltage",
                ].map((x) => (
                  <div key={x} className="flex gap-3">
                    <Dot /> <span>{x}</span>
                  </div>
                ))}
              </div>
            </ControlBlock>

            <ControlBlock
              title="RF Generator Control Panel"
              imageSrc="/images/technologies/RF Generator/RF-Generator Control Panel.png"
              imageAlt="RF Generator Control Panel"
            >
              <p className="text-zinc-700">
                Local/Remote operation and indicator lights support commissioning and verification using a dummy load
                (e.g., 50 Ω, 10 kW resistor). Protective limits (grid current, plate current, and reflected power / VSWR)
                are configured to automatically stop output under fault conditions.
              </p>

              <h4 className="mt-5 text-sm font-semibold text-zinc-900">Functions</h4>
              <div className="mt-3 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                {[
                  "Local–Remote selector switch",
                  "RF ON time control timer knob",
                  "RF power 0–10 V control knob",
                  "Hi-voltage ON/OFF pushbutton",
                  "RF signal ON/OFF pushbutton",
                  "E-Stop and Reset pushbutton",
                ].map((x) => (
                  <div key={x} className="flex gap-3">
                    <Dot /> <span>{x}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm text-zinc-700">
                  <span className="font-semibold text-zinc-900">UX upgrade:</span> Add a small "What to check first"
                  troubleshooting card here (reflected power, airflow, interlocks, grounding) to reduce support calls.
                </p>
              </div>
            </ControlBlock>

            <ControlBlock
              title="RF Generator Fuse Protection Panel"
              imageSrc="/images/technologies/RF Generator/RF Generator Fuse Panel.png"
              imageAlt="RF Generator Fuse Panel"
            >
              <p className="text-zinc-700">
                Breakers and fuses protect the electronic circuits and help isolate faults quickly.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-zinc-700 sm:grid-cols-2">
                {["100A main power breaker", "7A filament transformer fuse", "10A air blower fuse", "5A control circuit power supply fuse"].map(
                  (x) => (
                    <div key={x} className="flex gap-3">
                      <Dot /> <span>{x}</span>
                    </div>
                  )
                )}
              </div>
            </ControlBlock>
          </div>
        </div>
      </section>

      {/* Welders / Portfolio */}
      <section id="welders" className="scroll-mt-20 border-b border-zinc-100">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <SectionTitle
            kicker="Solutions"
            title="Portfolio of ONEX RF Welders"
            subtitle="Make the next step obvious: show systems that use this generator technology."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">RF Welding Solutions</h3>
              <p className="mt-3 text-zinc-700">
                ONEX RF offers RF welding systems for medical and automotive manufacturers. Examples include solution
                collection bags and air bladders.
              </p>

              <h4 className="mt-5 text-sm font-semibold text-zinc-900">Other Services</h4>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                {["RF welding die design & fabrication", "Evaluation sample runs", "Process development", "Validation support"].map((x) => (
                  <li key={x} className="flex gap-3">
                    <Check /> <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/rf-welding-machines-rf-welders-rf-heat-sealers"
                  className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  View ONEX RF Welders
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  Request an Evaluation
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/materials/RF Welder Brochure Cover Page.png"
                    alt="RF Welder Brochure Cover"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-700">
                Download our comprehensive RF Welder brochure for detailed specifications and application information.
              </p>

              <div className="mt-4">
                <a
                  href="/materials/Onex RF Welder Brochure 2023.pdf"
                  download
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Download Brochure (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactCTA context="Hybrid RF Generator Technology" contextType="technology" />
    </div>
  );
}
