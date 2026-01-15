import materialsData from "@/data/materials.json";

export type Material = {
  slug: string;
  name: string;
  aliases?: string[];
  description: string;
  long_description?: string;
  image?: string;
  properties?: {
    durometer_range?: string;
    melting_point?: string;
    elongation?: string;
    tensile_strength?: string;
    density?: string;
    sterilization_methods?: string[];
    water_absorption_24h?: string;
    radiopacity?: string;
    hardness?: string;
  };
  applications?: string[];
  process_notes?: {
    thermal_processability?: string;
    bonding_behavior?: string;
    tooling_considerations?: string;
  };
  biocompatibility?: {
    certifications?: string[];
    usage_scope?: string;
  };
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
