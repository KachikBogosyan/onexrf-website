import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageNav, type Section } from '@/components/PageNav';

export const metadata: Metadata = {
  title: 'RF Induction Catheter Tip Forming | ONEXRF',
  description: 'RF induction catheter tip forming with repeatable heating, controlled forming, and robust tooling/process guidance for manufacturing teams.',
};

export default function CatheterTipFormingPage() {
  const sections: Section[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'process-variables', label: 'Process Variables' },
    { id: 'tooling', label: 'Tooling' },
    { id: 'process-control', label: 'Process Control' },
    { id: 'defects', label: 'Common Defects' },
    { id: 'materials', label: 'Materials' },
    { id: 'safety', label: 'Safety' },
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
        / <span className="text-slate-700">Catheter Tip Forming Theory</span>
      </nav>

      <PageNav sections={sections} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Catheter Tip Forming with RF Induction
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            RF induction tip forming shapes the distal end of a catheter shaft by heating a precision mold, pressing the tube into a cavity, and cooling under control so the geometry "sets" before demolding. The value isn't just heat—it's repeatability: consistent starting conditions, predictable melt/flow, and tooling designed for long production runs.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Fast thermal response</h3>
              <p className="text-gray-600 text-sm">Tight cycles and smaller heat-affected zones</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Process repeatability</h3>
              <p className="text-gray-600 text-sm">Controlled heating, motion, and cooling</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Tooling-centric quality</h3>
              <p className="text-gray-600 text-sm">Cavity finish and concentricity drive tip performance</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Closed-loop control readiness</h3>
              <p className="text-gray-600 text-sm">Temperature feedback, recipes, data logging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview: what tip forming is</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Catheter tip forming is a thermoforming operation where the tube's distal end is softened and reshaped into a defined geometry (e.g., atraumatic taper, flare, bulb, or bond-ready profile) using a mold cavity. The goal is a stable, cosmetic, and dimensionally consistent tip that meets functional requirements (trackability, kink resistance, sealing/bond strength, atraumatic profile) while remaining manufacturable at scale.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How RF tip forming works</h2>
          
          {/* Process Flow Diagram Placeholder */}
          <figure className="mb-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* TODO: Add process flow diagram showing: Heating → Forming → Cooling → Demolding with key variables called out at each stage */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500">Process Flow Diagram Placeholder</p>
            </div>
            <figcaption className="mt-4 text-sm text-gray-600 text-center">
              Figure 1: Process flow diagram showing the four stages of RF tip forming with key variables
            </figcaption>
          </figure>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Heating: bring the mold to a controlled thermal state</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>A metal mold (<Link href="/tooling/catheter-tipping-die" className="text-blue-600 hover:text-blue-800 underline">die</Link>) is heated rapidly using RF induction (coil + generator).</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>The target is a known, repeatable starting condition—not "as hot as possible," but stable enough that the polymer softens and flows predictably when pressed into the cavity.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>If temperature feedback is not used, the process must rely on time-based heating and conservative cooling to avoid thermal drift over repeated cycles.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Forming: press the tube into the cavity with controlled motion and force</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>The catheter is inserted to a repeatable load depth (a primary driver of "short shots" / incomplete cavity fill).</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>A slide/gripper mechanism (manual, semi-automatic, or automated) advances the tube into the mold at a controlled speed.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Heat transfers from mold-to-polymer; the polymer softens through its relevant transition (Tg/softening range or melt behavior depending on material), allowing it to conform to the cavity under compression.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Cooling: remove heat consistently to lock in geometry</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Cooling is commonly done with directed air jets across the mold surface.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Cooling must be sufficient to prevent: sticking and tearing during demold (part removed while still too soft) and residual heat buildup (progressive overheating cycle-to-cycle, leading to discoloration, burning, and dimensional drift).</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Demolding: remove without distortion or surface damage</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>Demold timing is a quality variable—not an afterthought.</span>
                </li>
                <li className="flex">
                  <span className="mr-2">•</span>
                  <span>The part should release cleanly without drag marks, surface transfer, or geometry "spring-back" caused by removing while the polymer is still recovering.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Process Variables Section */}
      <section id="process-variables" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Critical process variables (and why they matter)</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thermal variables</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Mold temperature (or effective thermal state)</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Determines softening depth, flow behavior, and surface replication. Too cold → buckling/wrinkling and incomplete forming. Too hot → flash, degradation, sticking, cosmetic defects.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Preheat / "slide delay" time</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Controls how much heat is stored in the mold before insertion/press. Inserting into a cold cavity often collapses the tube; excessive delay can push the process into overheating and drift.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">RF power and heat time</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Sets the energy delivered per cycle. Needs to balance cavity fill and surface finish against degradation, bubbles/voids, and sticking.</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cycle-to-cycle thermal drift (residual heat)</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> The same recipe behaves differently if the die starts hotter each cycle. Drift shows up as discoloration, flash growth, taper length change, and surface defects.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Motion & force variables</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Insertion depth / load position</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Too shallow → "short shot" geometry. Too deep → excessive material displacement, flash, or ring marks upstream.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Slide speed / advance profile</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> If the tube is advanced faster than the polymer can soften, it buckles or wrinkles and loses effective forming force. Controlled, repeatable motion is often the difference between "works in the lab" and stable production.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Compression force / press force</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Insufficient force → incomplete replication and poor cavity fill. Excess force → flash, thinning, or distortion—especially at transitions.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Gripper force and gripper geometry</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Slippage causes inconsistent insertion depth and surface scuffing. Over-grip can ovalize thin-wall tubing before it even reaches the cavity.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Induction coil variables (for metal molds)</h3>
              
              {/* Induction Coil Diagram Placeholder */}
              <figure className="my-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                {/* TODO: Add induction coil positioning schematic showing coil turns/length, diameter match, axial position effects, and concentricity requirements */}
                <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
                  <p className="text-gray-500">Induction Coil Positioning Schematic Placeholder</p>
                </div>
                <figcaption className="mt-4 text-sm text-gray-600 text-center">
                  Figure 2: Induction coil positioning schematic illustrating critical setup variables
                </figcaption>
              </figure>

              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Coil turns / coil length (heated zone length)</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Must cover the effective forming length. Too narrow → localized overheating, burn marks, and inconsistent taper replication.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Coil diameter vs mold diameter</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Impacts coupling efficiency and thermal uniformity. Poor matching can reduce heating efficiency and increase sensitivity to setup variation.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Coil position (axial)</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Shifts where heat concentrates. Heat biased distal can promote forward flow and flash; heat biased proximal can create upstream ring marks and uneven taper formation.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Coil concentricity to mold</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Eccentric heating can create asymmetric softening, leading to tip bend, uneven wall distribution, and directional stress.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cooling variables</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Airflow rate and nozzle placement</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Determines cooldown speed and uniformity. Uneven cooling can warp geometry; insufficient cooling causes sticking and progressive drift.</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Cooling time / minimum demold time</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> Prevents removal while the polymer is still plastically deformable or tacky.</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Start-of-cycle temperature baseline</h4>
                  <p className="text-gray-700"><span className="font-medium">Why it matters:</span> The "hidden variable" behind many intermittent issues. A stable baseline improves Cp/Cpk more than many recipe tweaks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tooling & Mold Engineering Section */}
      <section id="tooling" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tooling & mold engineering considerations</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Metal vs glass molds (and when each makes sense)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Metal molds (common for RF induction heating)</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Directly heatable by induction; fast response and robust for production.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>Best for repeatable thermal behavior, tight geometry control, and high utilization.</span></li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Glass molds (used in some processes)</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex"><span className="mr-2">•</span><span>Often chosen for surface finish, release behavior, and visibility of flow—but glass is not directly heated by induction.</span></li>
                    <li className="flex"><span className="mr-2">•</span><span>If glass is used with an RF-based system, it typically involves a hybrid heating approach (e.g., a heated metal sleeve/susceptor or non-induction heating method).</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cavity design & finish</h3>
              
              {/* Tooling Cross-Section Placeholder */}
              <figure className="my-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                {/* TODO: Add tooling cross-section diagram showing cavity geometry, venting concept, alignment features, and finish notes */}
                <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
                  <p className="text-gray-500">Tooling Cross-Section Diagram Placeholder</p>
                </div>
                <figcaption className="mt-4 text-sm text-gray-600 text-center">
                  Figure 3: Tooling cross-section illustrating cavity design elements and alignment features
                </figcaption>
              </figure>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cavity geometry and venting strategy</h4>
                  <p className="text-gray-700">Trapped air contributes to bubbles/voids and incomplete fill. Small design choices (lead-in radii, transitions, micro-vents) heavily affect consistency.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Surface finish and polish direction</h4>
                  <p className="text-gray-700">Drives cosmetic quality, release force, and risk of drag marks. Tool marks can "print through" on soft polymers and become functional defects (stress concentrators, tear initiation).</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Concentricity and alignment stack-up</h4>
                  <p className="text-gray-700">Mold halves, <Link href="/tooling/catheter-tip-mandrel" className="text-blue-600 hover:text-blue-800 underline">mandrels</Link>, and locating features must maintain coaxial alignment to avoid tip bend and asymmetric wall distribution.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cavity wear and contamination management</h4>
                  <p className="text-gray-700">Residue buildup shows up as black specks, surface transfer, and sticking. Plan for cleaning intervals and access (and verify that cleaning methods don't change surface energy or polish).</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Maintenance & longevity</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex"><span className="mr-2">•</span><span><span className="font-medium">Cleaning protocol:</span> Solvent compatibility, non-abrasive methods, lint control</span></li>
                  <li className="flex"><span className="mr-2">•</span><span><span className="font-medium">Inspection cadence:</span> Cavity wear, nicks, alignment pins, gripper faces</span></li>
                  <li className="flex"><span className="mr-2">•</span><span><span className="font-medium">Spare strategy:</span> Critical inserts, alignment components, coil fixtures</span></li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">Learn more about <Link href="/support/machine-servicing" className="text-blue-600 hover:text-blue-800 underline">machine servicing programs</Link>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Control Section */}
      <section id="process-control" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Process control & repeatability</h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Closed-loop control (and what it stabilizes)</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Die temperature feedback</h4>
                  <p className="text-gray-700 text-sm">Thermocouple/RTD/pyrometry—implementation depends on tooling. Stabilizes thermal baseline and reduces drift-related defects.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Recipe control</h4>
                  <p className="text-gray-700 text-sm">Power/time, delays, motion profiles, cooling time. Prevents "operator drift" and makes process changes traceable.</p>
                </div>
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cycle consistency and monitoring</h4>
                  <p className="text-gray-700 text-sm">Track key signals (time-to-temperature, power delivered, cycle time, air pressure/flow) to catch slow degradation (coil shift, clogged air nozzles, contamination buildup).</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recipe development (practical approach)</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <ol className="space-y-3 text-gray-700">
                  <li className="flex">
                    <span className="font-semibold mr-3 text-blue-600">1.</span>
                    <span>Start with geometry acceptance criteria (taper length, OD/ID, concentricity, cosmetic limits).</span>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-3 text-blue-600">2.</span>
                    <span>Build a process window around: minimum heat for full replication, minimum cooling for clean demold, and motion settings that prevent buckling across operator and lot variation.</span>
                  </li>
                  <li className="flex">
                    <span className="font-semibold mr-3 text-blue-600">3.</span>
                    <span>Lock down starting baseline (die start temperature, load position, fixturing) before chasing small parameter tweaks.</span>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">Our <Link href="/support/process-development" className="text-blue-600 hover:text-blue-800 underline">process development services</Link> can help establish your process window.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Defects Section */}
      <section id="defects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Common defects & root causes</h2>

          {/* Defect Gallery Placeholder */}
          <figure className="mb-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* TODO: Add defect gallery showing visual examples of: short shot, flash, ring mark, burn/discoloration, wrinkling, bubbles/voids, sticking/tearing, tip bend, and surface specks */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500">Defect Gallery Placeholder</p>
            </div>
            <figcaption className="mt-4 text-sm text-gray-600 text-center">
              Figure 4: Visual reference gallery of common catheter tip forming defects
            </figcaption>
          </figure>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-gray-300">Defect</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-gray-300">Likely causes</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-900 border-b border-gray-300">Mitigations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Short shot / incomplete cavity fill</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Insertion depth inconsistent; die too cold; insufficient heat time; insufficient compression force; trapped air</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Add hard stop for load depth; stabilize die baseline; increase heat within safe window; adjust press force; add/verify venting strategy</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Wrinkling / buckling</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Tube advanced too fast into cold/underheated cavity; poor support/fixturing; thin-wall sensitivity</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Slow slide speed/adjust motion profile; increase preheat/slide delay; improve fixturing/guide support; verify gripper alignment</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Flash (excess material at parting line or distal)</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Overheating; excessive force; cavity mismatch/wear; heat biased distal</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Reduce energy/heat time; tune force; inspect parting surfaces; reposition coil; improve cavity shutoff and alignment</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Ring mark upstream of taper</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Heat biased proximal; abrupt transitions; excessive axial compression; surface drag</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Re-center heated zone; soften transitions; reduce compression; improve cavity finish/release</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Discoloration / burn marks</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Localized overheating; residual heat buildup; contaminated cavity; polymer degradation</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Widen/shift heat zone; increase cooling or add temperature feedback; clean/maintain cavity; reduce energy and verify dwell times</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Bubbles / voids</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Entrapped air; moisture in hygroscopic materials; over-fast heating causing volatile release</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Improve venting; ensure material conditioning/drying where applicable; tune heat rate; review incoming material handling</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Sticking / tearing on demold</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Demolding too hot; inadequate cooling; surface contamination; poor finish</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Increase cooling time or improve airflow distribution; restore polish/finish; tighten cleaning protocol; verify release behavior per material</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Tip bend / asymmetry</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Coil/mold not concentric; misalignment in stack-up; uneven heating/cooling</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Re-align coil and tooling; improve locating features; verify cooling symmetry; monitor with simple concentricity checks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900">Surface specks / black dots</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Mold contamination/residue; burnt polymer buildup; dirty air supply</td>
                  <td className="py-3 px-4 text-gray-700 text-sm">Clean cavity and airflow path; set cleaning intervals; filter air supply; control handling and lint</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Thermal Drift Illustration Placeholder */}
          <figure className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            {/* TODO: Add thermal drift illustration showing conceptual trend of start-of-cycle die temperature vs defect rate over multiple cycles (no specific numeric values) */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded">
              <p className="text-gray-500">Thermal Drift Trend Illustration Placeholder</p>
            </div>
            <figcaption className="mt-4 text-sm text-gray-600 text-center">
              Figure 5: Conceptual illustration of thermal drift effect on defect rate over production cycles
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Material Considerations Section */}
      <section id="materials" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Material considerations (general guidance)</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Softening behavior varies by polymer family and formulation.</span> Many catheter materials form through a softening range rather than a sharp melt; others transition quickly and can overrun into flash/stick conditions if over-heated.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Moisture sensitivity matters.</span> Hygroscopic materials (common in several catheter polymers) can generate voids or surface defects if not properly conditioned. Drying requirements are material- and supplier-specific.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Additives and co-extrusions change flow and surface replication.</span> Radiopaque fillers, lubricious layers, or multilayer shafts can alter heat transfer, viscosity, and release behavior—validate on the actual construction.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Surface energy and tackiness affect release.</span> Some soft, tacky materials demold best with optimized cavity finish and controlled cooling rather than more heat.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Needs confirmation:</span> Any polymer-specific setpoints (exact temperatures or dwell times) must be established experimentally for the specific grade, dimensions, and tool design.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Ergonomics Section */}
      <section id="safety" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Safety & ergonomics considerations</h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Two-hand (dual-start) actuation and guarding:</span> Helps reduce pinch/crush risk during press motion. Implement using safety-rated components and validate via your site's risk assessment.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Interlocks and safe access:</span> Tooling access for cleaning and changeover should not encourage reach-in behavior during operation.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Airflow vs noise tradeoff:</span> Higher airflow cools faster but can elevate noise; lower airflow may require longer cooling. Address with nozzle design, mufflers/silencers, and enclosure strategies where appropriate.</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Thermal hazards:</span> Hot molds and nearby hardware require clear hot-surface controls (shielding, labeling, controlled access).</span>
            </p>
            <p className="flex">
              <span className="mr-2">•</span>
              <span><span className="font-semibold">Operator ergonomics:</span> Stable fixturing, defined load stops, and intuitive HMI prompts reduce variation and repetitive strain.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                What's the difference between RF induction tip forming and "direct heating" of the tube?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Induction primarily heats the <strong>metal mold</strong>, which then transfers heat into the polymer in a controlled contact environment. This can improve uniformity and repeatability versus heating the tube in open air, where convection and positioning variation are harder to control.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Do I need temperature feedback on the mold?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                It's not strictly required, but it's one of the most effective ways to reduce <strong>cycle-to-cycle drift</strong>. Without feedback, you'll typically rely on conservative cooling and tight timing controls to prevent residual heat buildup.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Why do we see wrinkling even when the mold is hot?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Wrinkling is often a <strong>motion + support</strong> problem: advancing too quickly, inconsistent insertion depth, or insufficient guidance can buckle thin-wall tubing before it fully softens. Slowing the motion profile and stabilizing the baseline usually helps more than adding heat.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                What causes flash to suddenly appear after "good" parts?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Common reasons are <strong>thermal drift</strong> (die starting hotter each cycle), coil position shift, or cavity contamination/wear that changes shutoff behavior. Check baseline temperature, cooling effectiveness, and tooling condition before changing the recipe.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Can you form multilayer shafts or reinforced constructions?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Often yes, but multilayer and reinforced structures change heat transfer, flow, and release behavior. The right approach is a feasibility run using your actual shaft construction and acceptance criteria.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                Is air cooling always the best approach?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Air cooling is common and simple, but cooling must be <strong>uniform and sufficient</strong>. Nozzle placement, airflow stability, and noise control matter. For some geometries or materials, the cooling strategy may need refinement.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                How do we reduce cosmetic defects like ring marks and drag lines?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Focus on <strong>heated zone placement</strong>, cavity finish, and demold timing. Many cosmetic issues are caused by uneven heating, surface transfer from contamination, or removing while too hot.
              </div>
            </details>

            <details className="bg-white border border-gray-200 rounded-lg shadow-sm group">
              <summary className="px-6 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors">
                What's the fastest path to a stable production recipe?
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-700 border-t border-gray-100">
                Lock down the baseline variables first: insertion depth, alignment/concentricity, and start-of-cycle thermal state. Then widen the process window with controlled changes to heat time/power, motion, and cooling.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your catheter tip forming process?</h2>
          <p className="text-lg mb-8 text-blue-50">
            Our engineers can help with tooling design, process development, and equipment selection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Talk to an engineer
            </Link>
            <Link 
              href="/support/process-development" 
              className="inline-block bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors border-2 border-white"
            >
              Send sample parts for feasibility
            </Link>
          </div>
        </div>
      </section>

      {/* Related Pages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/support/process-development" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Process Development Services</h3>
              <p className="text-sm text-gray-600">Recipe development and proof-of-concept</p>
            </Link>
            <Link href="/support/machine-servicing" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
              <h3 className="font-semibold text-gray-900 mb-1">Machine Servicing</h3>
              <p className="text-sm text-gray-600">Maintenance and support programs</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

