import materialsData from "@/data/materials.json";

export type Material = {
  slug: string;
  name: string;
  aliases?: string[];
  description?: string;
  image?: string;
  related?: {
    applications?: string[];
    products?: string[];
  };
};

const materials = materialsData as Material[];

export function getMaterialBySlug(slug: string): Material | undefined {
  return materials.find((m) => m.slug === slug);
}

export function getAllMaterials(): Material[] {
  return materials;
}
