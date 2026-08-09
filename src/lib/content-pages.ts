/**
 * Topic and service pages.
 *
 * Both are the same shape — a hero, some explanatory sections, and links out —
 * so they share one template. Where ONEX has told us something concrete (the
 * four closed-loop parameters, the arc-shutdown behaviour) it is written down;
 * where it has not, `needs` renders a visible Placeholder rather than filler.
 */

export type ContentSection = {
  heading: string;
  body?: string;
  bullets?: string[];
};

export type ContentPage = {
  slug: string;
  eyebrow: string;
  title: string;
  lede: string;
  sections: ContentSection[];
  /** Missing information, surfaced as a Placeholder on the page. */
  needs?: string[];
  related?: {
    machines?: string[];
    applications?: string[];
    technologies?: string[];
  };
  cta: string;
};

/* ---------------------------------------------------------------------------
   Topics — the deep-dive pages Site A's nav points at
   ------------------------------------------------------------------------- */

export const TOPICS: ContentPage[] = [
  {
    slug: "closed-loop-control",
    eyebrow: "Process control",
    title: "Closed-loop control",
    lede: "Most tipping processes control time and temperature and let everything else float. Ours closes the loop on the four parameters that actually determine the formed part.",
    sections: [
      {
        heading: "The four controlled parameters",
        body: "On the servo platforms these are measured and corrected within the cycle, not set once and trusted.",
        bullets: [
          "Temperature — the die's actual temperature, not the setpoint it was commanded to",
          "Insertion depth — how far the tube travels into the die",
          "Insertion force — how hard it is pressed, which is what flash responds to",
          "Insertion speed — how quickly it gets there, which changes how the polymer flows",
        ],
      },
      {
        heading: "Why open-loop drifts",
        body: "An open-loop process is only as stable as everything it does not measure. Material lot variation, ambient temperature, die wear and operator technique all move, and the process has no way to notice. Closing the loop means a change in one variable is absorbed rather than transmitted to the part.",
      },
      {
        heading: "What it changes in practice",
        body: "The process window stops being a knife edge. A batch of tubing that runs slightly differently produces the same tip, because the machine adjusts rather than repeating an instruction that no longer fits.",
      },
    ],
    needs: [
      "Which platforms carry full closed-loop control — notes.txt says the LXS1; confirm whether LXS2 and the modular platform do too",
      "Measured before/after data on process capability (Cpk) or scrap rate from a customer who moved from open to closed loop",
      "A screenshot of the control interface showing the live parameter traces",
    ],
    related: {
      machines: ["catheter-tipper-servo", "dual-catheter-tipper-servo"],
      technologies: ["rf-induction-heating", "catheter-tip-theory"],
    },
    cta: "Talk through your process window",
  },
  {
    slug: "flash-and-burr",
    eyebrow: "Part quality",
    title: "Flash & burr elimination",
    lede: "Flash is usually treated as something to trim off afterwards. It is more useful to treat it as a signal that the process window is wrong.",
    sections: [
      {
        heading: "Where flash comes from",
        body: "Flash appears when polymer is pushed somewhere the die does not contain it — too much material displaced, too much force, too much heat, or a die parting line that does not close cleanly at temperature. Each of those has a different fix, and guessing between them is what makes flash feel intractable.",
      },
      {
        heading: "Why a secondary operation is the expensive answer",
        body: "Trimming adds a station, a fixture, an operator, an inspection step and a new way to damage a finished part. On a device that is already validated, removing the trim operation is often worth more than the machine that made it unnecessary.",
      },
    ],
    needs: [
      "ONEX's actual diagnostic sequence for flash — this page should teach the reader how to work through it",
      "Macro photographs of flashed versus flash-free tips, side by side. This is a visual problem and the page currently has no images",
    ],
    related: {
      machines: ["catheter-tipper-servo"],
      technologies: ["catheter-tip-theory"],
    },
    cta: "Send us a flashed part",
  },
  {
    slug: "arc-damage",
    eyebrow: "Die life",
    title: "Arc damage & die life",
    lede: "An arc in an RF welding die does its damage in microseconds. The only useful defence is detecting it and shutting the generator down faster than the pitting can form.",
    sections: [
      {
        heading: "What an arc costs",
        body: "Beyond the scrapped part, an arc pits the die surface. A pitted die concentrates the field at the damage, which makes the next arc more likely — so die damage compounds until the tool has to be reworked or replaced, taking the line down with it.",
      },
      {
        heading: "Fast shutdown",
        body: "The hybrid generator's arc detection responds in milliseconds, cutting RF output before sustained arcing can develop. That is the difference between a scrapped part and a scrapped die.",
      },
    ],
    needs: [
      "The published claim is a 90% reduction in die damage from arcs. It needs a source: how it was measured, over what period, against what baseline. Until it has one it cannot be published as a number.",
      "Actual arc-detection response time in milliseconds",
      "Photographs of arc pitting on a die",
    ],
    related: {
      machines: ["rotary-rf-welder-medium", "rf-shuttle-standard"],
      technologies: ["hybrid-rf-generator", "dielectric-rf-heating"],
    },
    cta: "Ask about arc protection",
  },
  {
    slug: "prototype-samples",
    eyebrow: "Before you commit",
    title: "Prototype samples",
    lede: "Send tubing and a drawing. We form parts on production tooling and send them back, so the design decision is made against something you can hold.",
    sections: [
      {
        heading: "Why this matters before design freeze",
        body: "A tip geometry that cannot be formed repeatably is a problem that gets much more expensive after freeze. Seeing real parts early means the design can still move if the process says it should.",
      },
      {
        heading: "What you get back",
        bullets: [
          "Formed samples in your material and your dimensions",
          "The parameters they were formed at",
          "An engineer's assessment of whether the geometry is production-viable",
        ],
      },
    ],
    needs: [
      "Turnaround time ONEX is willing to commit to",
      "Cost, if any — competitors run free prototype programmes and lead with them",
      "How much tubing is needed, and the submission process",
    ],
    related: { applications: ["catheter-tipping", "catheter-flaring"] },
    cta: "Request prototype samples",
  },
  {
    slug: "multi-up-forming",
    eyebrow: "Throughput",
    title: "Multi-up forming",
    lede: "Two or four parts per cycle from the same footprint and the same operator — the cheapest throughput there is, when the cycle is the constraint rather than the loading.",
    sections: [
      {
        heading: "When multi-up is the right lever",
        body: "If the operator is idle while the machine runs, adding stations multiplies output directly. If the operator is already the bottleneck, multi-up will not help and automation is the answer instead.",
      },
      {
        heading: "Independent control per station",
        body: "The dual servo platform controls temperature independently at each station, so two-up does not mean averaging one process across two positions.",
      },
    ],
    needs: [
      "Realistic cycle-time and parts-per-hour figures for 1-up, 2-up and 4-up on comparable parts",
    ],
    related: {
      machines: [
        "dual-catheter-tipper-air",
        "dual-catheter-tipper-servo",
        "four-up-catheter-tipper",
      ],
    },
    cta: "Work out which lever applies",
  },
  {
    slug: "rotary-welding",
    eyebrow: "Throughput",
    title: "Rotary welding",
    lede: "An indexed turntable loads at one station while sealing at another, so the RF cycle is never waiting for a human — and a print or die-cut station can ride on the same index.",
    sections: [
      {
        heading: "Loading in parallel with sealing",
        body: "On a shuttle machine the press waits while the operator loads. On a rotary machine those happen at once, at different stations, so the limiting factor becomes the seal time rather than the operator.",
      },
      {
        heading: "Secondary operations on the same index",
        body: "Print and die-cut stations mean a finished, marked, trimmed part comes off the machine instead of a sealed blank that still needs converting elsewhere.",
      },
    ],
    needs: [
      "Throughput comparison between shuttle and rotary on the same part",
    ],
    related: {
      machines: [
        "small-rotary-rf-welder",
        "rotary-rf-welder-medium",
        "rotary-rf-welder-large",
        "rotary-rf-welder-print",
      ],
      technologies: ["dielectric-rf-heating"],
    },
    cta: "Size a rotary platform",
  },
];

/* ---------------------------------------------------------------------------
   Services
   ------------------------------------------------------------------------- */

export const SERVICES: ContentPage[] = [
  {
    slug: "process-development",
    eyebrow: "Services",
    title: "Process development",
    lede: "You get a validated process window, not a machine and a starting point.",
    sections: [
      {
        heading: "What development actually involves",
        bullets: [
          "Establishing the parameter set that produces your part",
          "Finding the edges of the window, not just a point inside it",
          "Confirming it holds across material lots",
          "Documenting it so your team can reproduce and defend it",
        ],
      },
      {
        heading: "Why it is bundled rather than sold separately",
        body: "A machine that has not been developed against your specific part is a machine that produces scrap while somebody figures it out. Treating development as optional shifts that cost onto you.",
      },
    ],
    needs: [
      "What is included with a machine purchase versus charged separately",
      "Typical duration, and what ONEX needs from the customer to start",
    ],
    related: { technologies: ["catheter-tip-theory"] },
    cta: "Start a process development conversation",
  },
  {
    slug: "tooling",
    eyebrow: "Services",
    title: "Tooling & dies",
    lede: "Dies and mandrels designed around your geometry and your material — the tool is what determines the part, far more than the machine does.",
    sections: [
      {
        heading: "Die and mandrel design",
        body: "The die sets the outer geometry; the mandrel controls the lumen and keeps it open while the polymer is soft. Getting the relationship between them right is most of the work in a new tip.",
      },
      {
        heading: "Designed for your material",
        body: "Shrinkage, melt behaviour and how a polymer releases from the tool all vary by material. A die designed for Pebax is not a die for HDPE.",
      },
    ],
    needs: [
      "Die lead time — competitors publish theirs and it is a decisive comparison point",
      "Annual tooling volume, if ONEX wants to make the capacity claim its competitors do",
      "What the customer submits to get a die designed",
    ],
    related: { applications: ["catheter-tipping", "catheter-flaring"] },
    cta: "Get a die designed",
  },
  {
    slug: "validation",
    eyebrow: "Services",
    title: "Validation support",
    lede: "Documentation that fits into your IQ and OQ plan rather than sitting beside it.",
    sections: [
      {
        heading: "What ONEX supplies",
        bullets: [
          "IQ documentation for the installed system",
          "DOE and die FAI records",
          "OQ support at the customer site on request",
        ],
      },
    ],
    needs: [
      "Exactly what is standard versus on request",
      "Whether ONEX holds ISO 9001 or 13485 — both competitors lead with certification and its absence here is conspicuous to a quality reviewer",
      "A sample documentation pack that could be offered as a gated download",
    ],
    cta: "Ask about validation documentation",
  },
  {
    slug: "training",
    eyebrow: "Services",
    title: "Training",
    lede: "Operators who understand what the process is doing catch problems before they become downtime.",
    sections: [
      {
        heading: "Beyond which button to press",
        body: "Training covers what the parameters actually do to the polymer, what a drifting process looks like early, and which faults an operator can resolve without stopping the line.",
      },
    ],
    needs: [
      "Seminar schedule, format (on-site or at Duarte), duration and cost",
      "Whether training is included with a system purchase",
    ],
    cta: "Ask about training",
  },
  {
    slug: "service-and-repair",
    eyebrow: "Services",
    title: "Service & repair",
    lede: "Diagnosed and repaired by the engineers who designed the system — which is why turnaround is measured in days rather than months.",
    sections: [
      {
        heading: "Why vertical integration matters most here",
        body: "When the generator, the controls and the mechanics were all designed in the same building, a fault does not have to be escalated through three suppliers. The person who can fix it already knows the machine.",
      },
      {
        heading: "Support for older platforms",
        body: "Systems going back decades are still supported, because the drawings and the people who made them are still here.",
      },
    ],
    needs: [
      "The repair turnaround ONEX is willing to publish as a commitment",
      "How a customer raises a service request, and what the response time is",
      "Whether service contracts are offered",
    ],
    cta: "Get help with a machine",
  },
  {
    slug: "spares",
    eyebrow: "Services",
    title: "Spares & consumables",
    lede: "Parts for platforms going back decades, because we still hold the drawings.",
    sections: [
      {
        heading: "What is stocked",
        body: "Wear parts, tubes, and the consumables a line goes through in normal operation.",
      },
    ],
    needs: [
      "A parts list, or at minimum the categories ONEX stocks",
      "How customers order — the current site has no spares ordering route at all",
      "Which platforms are still supported, and whether any are end-of-life",
    ],
    cta: "Order a part",
  },
  {
    slug: "remote-assist",
    eyebrow: "Services",
    title: "Remote assist",
    lede: "Most faults can be diagnosed without anyone getting on a plane.",
    sections: [
      {
        heading: "Diagnosis before dispatch",
        body: "A remote session establishes what is actually wrong, so if an engineer does travel they arrive with the right part rather than to investigate.",
      },
    ],
    needs: [
      "How remote assist works technically — the current site has a /remote-assist page whose content needs migrating",
      "Availability hours, and whether it covers customers outside the US",
    ],
    cta: "Start a remote session",
  },
];

export function getTopic(slug: string): ContentPage | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getService(slug: string): ContentPage | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
