import type { Metadata } from 'next';
import Link from 'next/link';
import { PageNav, type Section } from '@/components/PageNav';

export const metadata: Metadata = {
  title: 'RF Welding (Dielectric Heat Sealing) | ONEXRF',
  description: 'Practical RF welding (dielectric heat sealing): physics, machine architecture, process steps, controls, failure modes, and material weldability.',
};

export default function RFWeldingPage() {
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'physics', label: 'Physics' },
    { id: 'architecture', label: 'Machine Architecture' },
    { id: 'process', label: 'RF Welding Process' },
    { id: 'controls', label: 'Quality Controls' },
    { id: 'failures', label: 'Failure Modes' },
    { id: 'materials', label: 'Materials' },
    { id: 'applications', label: 'Applications' },
    { id: 'design', label: 'Design & Validation' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 mb-2 px-4 sm:px-6 lg:px-8 pt-4">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        / <Link href="/resources/technologies" className="hover:underline">
          Technologies
        </Link>{" "}
        / <span className="text-slate-700">RF Welding</span>
      </nav>

      <PageNav sections={sections} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            RF Welding (Dielectric Heat Sealing)
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            RF welding—also called RF sealing or dielectric welding—joins certain plastics by heating them internally in a high-frequency electric field while they're clamped between RF dies. Unlike thermal/impulse heat sealing (hot die contact), RF welding uses the die faces as electrodes and the plastic as the dielectric load.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Fast, controlled energy delivery</h3>
              <p className="text-gray-600 text-sm">Into polar plastics—heating is generated in the material, not from a hot die</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Seal thickness control via mechanics</h3>
              <p className="text-gray-600 text-sm">Hard stops + controlled compression rather than pressure only</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Process structure engineers can validate</h3>
              <p className="text-gray-600 text-sm">Pre-seal → main seal → cool under compression</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Tooling-driven repeatability</h3>
              <p className="text-gray-600 text-sm">When dies are flat/parallel and the press is built for consistent closure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Diagram Placeholder */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: RF die faces as capacitor plates + plastic dielectric]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview: What RF welding is</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            RF welding (RF heat sealing) bonds thin plastic layers by applying radiofrequency energy while the material is compressed between two electrodes (RF sealing dies). The RF field heats compatible plastics to melting so the layers meld under pressure, with the die geometry defining the welded perimeter.
          </p>
        </div>
      </section>

      {/* Physics Section */}
      <section id="physics" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">The physics in practical terms: dielectric heating</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Certain plastics behave as dielectrics: they don't conduct current like a metal, but their molecules can polarize in an electric field. With no field applied, polar molecules are randomly oriented. When an electric field is applied, dipoles orient (think "compass needle" alignment). In an <em>alternating</em> RF field, that continual re-orientation causes leakage current and dielectric loss—practical, in-material heating.
            </p>
            <p>
              One useful analogy: it's <em>like a microwave exciting polar molecules</em>, but in RF welding the field is shaped by electrodes/dies and the plastic acts as the dielectric load.
            </p>
          </div>
        </div>
      </section>

      {/* Machine Architecture Section */}
      <section id="architecture" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Machine architecture</h2>
          
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            A typical RF welding system includes:
          </p>

          <div className="space-y-4 mb-10">
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">RF generator:</span>
                <span className="text-gray-700"> creates high-frequency energy used for dielectric heating</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Press / seal station (pneumatic or hydraulic):</span>
                <span className="text-gray-700"> clamps material between dies with controlled force and closure</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Electrodes / RF sealing dies (tooling):</span>
                <span className="text-gray-700"> top and bottom molds that compress, shape, and define the seal perimeter</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Controls & timers:</span>
                <span className="text-gray-700"> commonly structured as pre-seal, main-seal, and cool; press down position often confirmed by a limit switch or sensor before timing starts</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-10">
            <h3 className="font-semibold text-gray-900 mb-3">Common frequencies (ISM bands):</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>27.12 MHz</strong> is commonly used for RF sealing.</span>
              </li>
              <li className="flex">
                <span className="mr-2">•</span>
                <span><strong>13.56 MHz</strong> is often seen on larger RF welders when platen size becomes large relative to wavelength.</span>
              </li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <Link href="#" className="block p-4 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all">
              <p className="font-semibold text-gray-900 text-sm">RF Welding Machines</p>
            </Link>
            <Link href="/resources/technologies/hybrid-rf-generator" className="block p-4 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all">
              <p className="font-semibold text-gray-900 text-sm">RF Generators</p>
            </Link>
            <Link href="#" className="block p-4 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all">
              <p className="font-semibold text-gray-900 text-sm">Tooling / RF Sealing Dies</p>
            </Link>
            <Link href="/resources/materials" className="block p-4 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all">
              <p className="font-semibold text-gray-900 text-sm">Materials (PVC/TPU/EVA)</p>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: System block diagram — generator → press → tooling → controls/timers]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">RF welding process (step-by-step)</h2>
          
          <p className="text-lg text-gray-700 mb-8">
            A practical seal cycle is more than "press down + RF on." A typical sequence:
          </p>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Load</h3>
              <p className="text-gray-700">Place the film/tubing/assembly on the <strong>bottom die</strong>.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Clamp</h3>
              <p className="text-gray-700">The press closes and compresses the stack between top/bottom dies. This establishes contact and reduces air gaps that can destabilize the field.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Pre-seal (controlled start)</h3>
              <p className="text-gray-700">Apply <strong>minimal RF power</strong> first (~30–50% of main power) to begin melting in a controlled way over ~1–2 seconds. This reduces "too much power too fast" behavior.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Main seal</h3>
              <p className="text-gray-700">Increase to the <strong>main seal set power</strong> for the time required to reach melt and flow in the seal region. As material softens, the press may advance further, forming the bond and establishing <strong>weld thickness</strong> (ideally governed by hard stops).</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-cyan-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Cool under compression</h3>
              <p className="text-gray-700">RF energy stops, but the material remains clamped while it solidifies and sheds heat into the metal die surfaces. Retracting early can degrade seal integrity.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gray-500">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">6. Unload</h3>
              <p className="text-gray-700">The press retracts and the operator removes the welded part (often via a shuttle or similar handling method).</p>
            </div>
          </div>

          <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: Seal cycle timeline — clamp → pre-seal → main → cool]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section id="controls" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What controls seal quality (engineering levers)</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Compression force and seal thickness (hard stops)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Compression force is essential because the seal forms while the plastic is molten/softening under the die. Larger seal areas generally require more force, but <strong>seal thickness is difficult to control by force alone</strong>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                A common manufacturing practice is to use <strong>hard stops</strong> to mechanically set the final seal thickness, then run slightly higher pressure to improve consistency. Repeatability depends heavily on:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex"><span className="mr-2">•</span><span>Press force control</span></li>
                <li className="flex"><span className="mr-2">•</span><span><strong>Die flatness and parallelism</strong></span></li>
                <li className="flex"><span className="mr-2">•</span><span>Hard stops placed in carefully engineered locations around the seal perimeter</span></li>
              </ul>
              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
                  <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: Hard stop cross-section showing controlled weld thickness]</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Power vs area/material effects (use as a starting point, not a guarantee)</h3>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="text-gray-700 leading-relaxed mb-2">
                  Rule-of-thumb example (rough starting point):
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For <strong>0.012" PVC</strong>, targeting <strong>~3 s seal time + ~3 s cool time</strong>, the process may require <strong>~250–300 W</strong> RF power.
                </p>
                <p className="text-gray-700 leading-relaxed mt-3 text-sm">
                  Treat this as a baseline only—seal area, tooling, die temperature, and material formulation all shift the requirement.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Time structure (pre-seal/main/cool) and why "too much power too fast" hurts</h3>
              <p className="text-gray-700 leading-relaxed">
                Pushing very high RF power to minimize time often creates <strong>inconsistencies</strong>. A more controllable approach is staged timing (pre-seal then main-seal), because controlling <strong>seconds</strong> is generally easier than controlling <strong>milliseconds</strong>—and at very short times, even PLC scan time can influence cycle repeatability.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tooling material note (aluminum vs brass energy demand)</h3>
              <p className="text-gray-700 leading-relaxed">
                Both brass and aluminum dies are used. <strong>Aluminum dies may require up to ~25% more RF energy</strong> than brass dies for the same outcome.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Die temperature management (thermal control concept)</h3>
              <p className="text-gray-700 leading-relaxed">
                As the plastic heats to melt, it also loses heat into the dies. To reduce die heat build-up and improve consistency, processes may use <strong>thermal control</strong> such as <strong>recirculating water</strong> or a <strong>heated upper platen</strong>.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Buffer materials (arc resistance / reduced heat loss)</h3>
              <p className="text-gray-700 leading-relaxed mb-3">Buffer materials can:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex"><span className="mr-2">•</span><span>Reduce heat loss from the hot plastic (potentially reducing cycle time)</span></li>
                <li className="flex"><span className="mr-2">•</span><span>Increase voltage breakdown resistance to help prevent arcs</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Impedance mismatch / reflected power (practical implications)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If there is an <strong>impedance mismatch</strong> between the generator and the load, <strong>reflected RF energy can cancel forward energy</strong>, producing weaker seals. Practically, this shows up as "same settings, weaker weld," especially when the load/tooling stack-up changes.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
                  <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: Reflected vs forward power concept at the load]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Failure Modes Section */}
      <section id="failures" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common failure modes and what they usually mean</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Arcing / flash burns</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Likely causes</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span><strong>Low pressure / air gap:</strong> if material isn't compressed and there's a gap, surfaces can charge and arc.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Local mismatch from <strong>non-parallel dies</strong> or uneven closure, creating field concentration.</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Practical mitigations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Increase clamping pressure <em>and/or</em> improve closure consistency.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Verify dies are <strong>flat/parallel</strong>; use <strong>hard stops</strong> to maintain uniform thickness.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Use <strong>buffer materials</strong> for improved arc resistance where appropriate.</span></li>
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="bg-gray-100 h-48 flex items-center justify-center rounded">
                  <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: Arcing illustration at an air gap / edge]</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thinning ("crashing") / tearing in the seal area</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Likely causes</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Too much pressure for a <strong>small seal area</strong>, collapsing the molten section.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Parallelism issues that concentrate force in one region.</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Practical mitigations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Reduce pressure and re-balance the cycle with time/power.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Add or re-engineer <strong>hard stops</strong> to prevent over-closure.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Inspect die alignment/parallelism and press construction factors affecting closure.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Weak seal / peel failures (seal comes apart)</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Likely causes</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Insufficient delivered energy (power/time not enough for melt and flow)</span></li>
                    <li className="flex"><span className="mr-2">•</span><span><strong>Reflected power / impedance mismatch</strong> reducing effective heating</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Excess heat loss into tooling (die temperature effects)</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Practical mitigations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Increase main seal time or power conservatively; keep the pre-seal ramp.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Stabilize die temperature (recirculating water / platen control as applicable).</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Review stack-up changes that could drive mismatch; keep tooling/load consistent.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Burn-through / scorching</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Likely causes</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Excess power or time, especially without a controlled pre-seal</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Heat accumulation in dies over repeated cycles (temperature management)</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-gray-900 mb-3">Practical mitigations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Reduce main power/time; rely more on staged <strong>pre-seal → main</strong> control.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Add/extend cool time to keep the part clamped through solidification.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Improve die thermal control to stabilize conditions across runs.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Materials that weld well (and those that don't)</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            RF welding works best on <strong>polar</strong> materials (molecules that respond strongly in an alternating field). <strong>Non-polar</strong> materials generally show poor dielectric heating response in this process.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-gray-300">Material</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-900 border-b border-gray-300">RF Weldability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">PVC (flexible, clear)</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Excellent</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">TPU / Polyurethane family</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Fair</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">EVA</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">Good</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">PET</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">Good</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">PETG</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Excellent</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Nylon (Polyamide)</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">Fair</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Polyethylene (PE)</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">None</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Polypropylene (PP)</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">None</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">PTFE (Teflon)</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">None</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">Silicone</td>
                  <td className="py-3 px-4 text-right"><span className="inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">None</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 leading-relaxed">
            If you need it, a full alphabetical weldability chart can be provided—but in practice, material <em>grade</em>, plasticizers/additives, and stack-up details still drive process development.
          </p>

          <div className="mt-6">
            <Link href="/resources/materials" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Materials (PVC/TPU/EVA)
            </Link>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Medical-device applications (realistic RF-welded items)</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            RF welding is commonly used where you need a perimeter seal in thin polymer layers using dielectric heating and compression, including:
          </p>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-2">Fluid bags / containers</h3>
              <p className="text-gray-700 text-sm">and similar film-to-film seals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-2">Sealed packaging or fixtures</h3>
              <p className="text-gray-700 text-sm">where a defined weld perimeter is required</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-2">Film interfaces to other compatible polymer components</h3>
              <p className="text-gray-700 text-sm">(e.g., film-to-tubing or film-to-port style interfaces), when the materials are RF-weldable and the tooling supports consistent compression</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design & Validation Section */}
      <section id="design" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Design & validation considerations (process-focused)</h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Engineers lean on RF welding when the process can be made repeatable through <strong>controls + mechanics</strong>:
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Timers create structure:</span>
                <span className="text-gray-700"> pre-seal, main-seal, and cool time define a cycle you can run and study</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Hard stops make thickness measurable:</span>
                <span className="text-gray-700"> they reduce dependence on "pressure only" for thickness control</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Tooling parallelism is non-negotiable:</span>
                <span className="text-gray-700"> flat, parallel dies reduce local over/under-heating and force concentration</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Thermal management stabilizes runs:</span>
                <span className="text-gray-700"> recirculating water / platen control can reduce drift from die heat build-up</span>
              </div>
            </div>
            <div className="flex">
              <span className="mr-3 text-blue-600 font-bold">•</span>
              <div>
                <span className="font-semibold text-gray-900">Stack-up consistency matters:</span>
                <span className="text-gray-700"> changes in load/tooling can shift impedance behavior and delivered energy</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500 text-center px-4">[DIAGRAM PLACEHOLDER: Parallelism and hard-stop placement around a perimeter seal]</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                RF welding vs heat sealing — what's the difference?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Heat sealing uses <strong>direct heat</strong> from a heated die contacting the plastic. RF welding heats <strong>polar plastics internally</strong> via an RF electric field while clamped between electrodes/dies.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Why does arcing happen?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Commonly from <strong>air gaps / low pressure</strong> or local field concentration due to uneven closure. The surface can "charge like a capacitor" and arc at the gap/edge.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                What frequency do RF welders use?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                <strong>27.12 MHz</strong> is most common. Larger welders may use <strong>13.56 MHz</strong> when platen size is large relative to wavelength.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Why cool under pressure?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                After RF energy stops, the material must <strong>solidify while held</strong>. Retracting early can reduce seal quality because the weld is still forming as it cools.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Which plastics work best?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Generally <strong>polar materials</strong> (e.g., PVC; many EVA/PET/PETG and some polyurethane/TPU grades).
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Brass vs aluminum dies — does it matter?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Both are used, although <strong>aluminum dies may require up to ~25% more RF energy</strong> than brass dies.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                What controls seal thickness most reliably?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                <strong>Hard stops</strong> are the most common practice for thickness control, combined with sufficient pressure for consistency—assuming the press closes flat and parallel.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Why not just use high power to seal faster?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Very high power to minimize cycle time can produce inconsistencies. Staging power (pre-seal then main) and controlling <strong>seconds vs milliseconds</strong> tends to be more stable.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl font-bold mb-4 text-center">
            If you're developing or troubleshooting an RF sealing process, ONEXRF can support:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20">
              <h3 className="font-semibold text-white mb-2">Process development</h3>
              <p className="text-blue-100 text-sm">Pre-seal/main/cool structuring, power/time/force tuning, and stability work</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20">
              <h3 className="font-semibold text-white mb-2">Tooling design</h3>
              <p className="text-blue-100 text-sm">RF sealing dies, hard-stop strategy, and parallelism-driven repeatability</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg border border-white border-opacity-20">
              <h3 className="font-semibold text-white mb-2">Integration & troubleshooting</h3>
              <p className="text-blue-100 text-sm">Generator/press integration, die thermal control concepts, arcing and weak-seal root causes</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="#" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">RF Welding Machines</h3>
              <p className="text-xs text-gray-600">Explore our equipment</p>
            </Link>
            <Link href="/resources/technologies/hybrid-rf-generator" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">RF Generators</h3>
              <p className="text-xs text-gray-600">High-frequency power systems</p>
            </Link>
            <Link href="#" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Tooling / RF Sealing Dies</h3>
              <p className="text-xs text-gray-600">Custom die design</p>
            </Link>
            <Link href="/resources/materials" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Materials (PVC/TPU/EVA)</h3>
              <p className="text-xs text-gray-600">Material selection guide</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

