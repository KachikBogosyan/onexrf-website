import materialsData from "@/data/materials.json";

export type Material = {
  slug: string;
  name: string;
  description?: string;
};

const materials = materialsData as Material[];

export function getMaterialBySlug(slug: string): Material | undefined {
  return materials.find((m) => m.slug === slug);
}
