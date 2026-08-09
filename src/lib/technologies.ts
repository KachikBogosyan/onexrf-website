import technologiesData from "@/data/technologies.json";

export type Technology = {
  slug: string;
  name: string;
  description: string;
  /** One line that states the idea before the explanation does. */
  summary?: string;
  long_description?: string;
  /**
   * True for RF induction and dielectric heating — the two technologies the
   * whole company sits on. Everything else is an application of one of them.
   */
  root_technology?: boolean;
  order?: number;
  applies_to?: string;
  image?: string | null;
  related?: {
    products?: string[];
    applications?: string[];
  };
};

const technologies = technologiesData as Technology[];

const byOrder = (a: Technology, b: Technology) =>
  (a.order ?? 999) - (b.order ?? 999);

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}

export function getAllTechnologies(): Technology[] {
  return [...technologies].sort(byOrder);
}

/** The two root technologies, in order: induction, then dielectric. */
export function getRootTechnologies(): Technology[] {
  return getAllTechnologies().filter((t) => t.root_technology);
}

/** Applied topics that sit beneath the two root technologies. */
export function getAppliedTechnologies(): Technology[] {
  return getAllTechnologies().filter((t) => !t.root_technology);
}
