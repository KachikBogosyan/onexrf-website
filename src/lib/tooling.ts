import toolingData from "@/data/tooling.json";

export type Tooling = {
  slug: string;
  name: string;
  description?: string;
  image?: string;
};

const tooling = toolingData as Tooling[];

export function getToolingBySlug(slug: string): Tooling | undefined {
  return tooling.find((t) => t.slug === slug);
}
