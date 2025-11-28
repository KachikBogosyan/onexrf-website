import technologiesData from "@/data/technologies.json";

export type Technology = {
  slug: string;
  name: string;
  description: string;
  image?: string;
  related?: {
    products?: string[];
    applications?: string[];
  };
};

const technologies = technologiesData as Technology[];

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}

export function getAllTechnologies(): Technology[] {
  return technologies;
}

