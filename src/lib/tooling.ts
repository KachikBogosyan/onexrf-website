import toolingData from "@/data/tooling.json";

export type Tooling = {
  slug: string;
  name: string;
  type?: string;
  description?: string;
  image?: string | null;
  /** Flat forms used in tooling.json, alongside the nested `related` block. */
  applications?: string[];
  compatible_products?: string[];
  components?: string[];
  process?: string[];
  includes_process_development?: boolean;
  related_services?: string[];
  cta?: string;
  related?: {
    applications?: string[];
    products?: string[];
  };
};

const tooling = toolingData as Tooling[];

export function getToolingBySlug(slug: string): Tooling | undefined {
  return tooling.find((t) => t.slug === slug);
}

export function getAllTooling(): Tooling[] {
  return tooling;
}
