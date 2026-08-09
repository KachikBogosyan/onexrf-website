import type { ProductFamily } from "./products";

/**
 * Site A's four hubs.
 *
 * These are the jobs a buyer is actually trying to do. The machines, dies and
 * services all hang underneath them rather than the other way round — which is
 * the whole argument of the outcome-led variant.
 */
export type Outcome = {
  slug: string;
  title: string;
  /** The buyer's situation, in their words. */
  situation: string;
  lede: string;
  /** What is going wrong today. Empathy comes before the pitch. */
  pains: string[];
  /** What ONEX does about it. */
  answers: { title: string; body: string; href: string }[];
  /** Machine families relevant to this job. */
  families: ProductFamily[];
  cta: string;
};

export const OUTCOMES: Outcome[] = [
  {
    slug: "launch-a-device",
    title: "Launch a device",
    situation:
      "You have a design, a deadline, and a tip geometry nobody has made before.",
    lede: "The forming process is rarely the hard part of a launch. Getting a validated, repeatable process before design freeze is. That means tooling that fits your geometry, samples early enough to change the design, and documentation your quality team can actually use.",
    pains: [
      "Die lead times that land after your design freeze",
      "Samples that prove the shape but not the repeatability",
      "A process window discovered during validation instead of before it",
      "Nobody who can tell you whether the material will behave",
    ],
    answers: [
      {
        title: "Prototype samples",
        body: "Send tubing and a drawing. We form parts and send them back, so the design decision is made against a real part rather than a rendering.",
        href: "/topics/prototype-samples",
      },
      {
        title: "Die & mandrel design",
        body: "Tooling designed around your geometry and your material, not adapted from a catalogue part.",
        href: "/services/tooling",
      },
      {
        title: "Process development",
        body: "You get a validated window — temperature, depth, force, speed — not a starting point to figure out yourself.",
        href: "/services/process-development",
      },
      {
        title: "Material selection",
        body: "Whether a polymer can be RF welded, must be induction formed, or needs thermal sealing decides the whole approach. It is the first question, not the last.",
        href: "/resources/materials",
      },
    ],
    families: ["forming"],
    cta: "Send us a drawing",
  },
  {
    slug: "yield-and-scrap",
    title: "Fix yield & scrap",
    situation:
      "The process worked at validation. It does not work the same way on Tuesday afternoon.",
    lede: "Drift is a control problem. If the only thing being held constant is time and temperature, everything else — material lot, ambient conditions, die wear, operator — is free to move. Closing the loop on the parameters that actually determine the part is what makes yield stop being a lottery.",
    pains: [
      "Flash and burrs that need a secondary operation to remove",
      "Tips that pass on one lot of material and fail on the next",
      "Arc damage shortening die life and stopping the line",
      "A process window so narrow that a small drift scraps the batch",
    ],
    answers: [
      {
        title: "Closed-loop control",
        body: "Temperature, insertion depth, insertion force and insertion speed held under closed-loop control rather than set open-loop and hoped for.",
        href: "/topics/closed-loop-control",
      },
      {
        title: "Flash & burr elimination",
        body: "Most flash is a tooling and process-window problem, not an inevitability. It is usually solvable without a secondary operation.",
        href: "/topics/flash-and-burr",
      },
      {
        title: "Arc damage & die life",
        body: "Fast arc detection shuts the generator down in milliseconds, before the arc has time to pit the die.",
        href: "/topics/arc-damage",
      },
      {
        title: "Troubleshoot with an engineer",
        body: "Send the failing part and the parameters. You will get an engineer's read, not a service ticket.",
        href: "/contact",
      },
    ],
    families: ["forming", "welding"],
    cta: "Send us a failing part",
  },
  {
    slug: "scale-to-volume",
    title: "Scale to volume",
    situation:
      "The product worked. Now you need ten times as many, and the line is the constraint.",
    lede: "Throughput has three levers: parts per cycle, cycles per hour, and how much of the cycle needs a human. Multi-up tooling addresses the first, rotary indexing the second, and automation the third. Which one is worth spending on depends entirely on where your line is actually blocked.",
    pains: [
      "Output capped by how fast an operator can load",
      "Buying a second machine to get a second shift's worth of parts",
      "Floor space that will not accommodate another standalone station",
      "Quality drifting as soon as production runs faster",
    ],
    answers: [
      {
        title: "Multi-up forming",
        body: "Two or four parts per cycle from the same footprint and the same operator.",
        href: "/topics/multi-up-forming",
      },
      {
        title: "Rotary welding",
        body: "Indexed rotary platforms load at one station while sealing at another, so the RF cycle never waits for a human.",
        href: "/topics/rotary-welding",
      },
      {
        title: "Automation & integration",
        body: "Machines built to be integrated into a cell, or complete indexed lines where the operator leaves the cycle entirely.",
        href: "/automation",
      },
      {
        title: "Secondary operations in-line",
        body: "Print and die-cut stations on the same index, so a finished part comes off the machine instead of a blank that still needs converting.",
        href: "/machines?family=welding",
      },
    ],
    families: ["forming", "welding", "automation"],
    cta: "Talk through your line",
  },
  {
    slug: "keep-lines-running",
    title: "Keep lines running",
    situation:
      "The machine is eight years old, it is running validated product, and it just stopped.",
    lede: "This is where the industry has quietly got worse. As the specialists were acquired, repair turnaround went from days to months — long enough that buying a duplicate machine starts to look like a rational way to protect production. Because we designed and built the machine, the person who can fix it works here.",
    pains: [
      "Repair turnarounds measured in months, not days",
      "Buying a second machine purely as insurance",
      "Support staff who have never seen the inside of the machine",
      "Spares for a platform the manufacturer has discontinued",
    ],
    answers: [
      {
        title: "Service & repair",
        body: "Diagnosed and repaired by the engineers who designed the system, not a subcontracted service desk.",
        href: "/services/service-and-repair",
      },
      {
        title: "Spares & consumables",
        body: "Parts for platforms going back decades, because we still have the drawings.",
        href: "/services/spares",
      },
      {
        title: "Operator training",
        body: "Operators who recognise a problem early stop it becoming downtime. Training covers what to look for, not just which button to press.",
        href: "/services/training",
      },
      {
        title: "Remote assist",
        body: "Most faults are diagnosable without anyone getting on a plane.",
        href: "/services/remote-assist",
      },
    ],
    families: ["forming", "welding"],
    cta: "Get help with a machine",
  },
];

export function getOutcome(slug: string): Outcome | undefined {
  return OUTCOMES.find((o) => o.slug === slug);
}
