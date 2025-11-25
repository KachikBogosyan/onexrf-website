import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  name: string;
  line: string;
  description?: string;
  image?: string;
  is_new?: boolean;
  order?: number;
  specs_short?: Record<string, string>;
  specs_long?: any;
  key_features?: string[];
  highlights?: string[];
};

const products = productsData as Product[];

// Helper function to resolve @specs_long references
export function resolveSpecValue(
  specValue: string,
  specsLong: any
): string {
  if (!specValue.startsWith("@specs_long.")) {
    return specValue;
  }

  const path = specValue.replace("@specs_long.", "");
  const parts = path.split(".");

  let value: any = specsLong;
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = value[part];
    } else {
      return specValue; // Return original if path not found
    }
  }

  return typeof value === "string" ? value : String(value);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getProductsByLine(line: string) {
  return products.filter((p): p is Product => p.line === line);
}