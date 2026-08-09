import productsData from "@/data/products.json";

/** The three families both site variants pivot on. */
export type ProductFamily = "forming" | "welding" | "automation";

export type Product = {
  slug: string;
  name: string;
  line: string;
  family?: ProductFamily;
  aliases?: string[];
  category?: string;
  description?: string;
  image?: string | null;
  is_new?: boolean;
  order?: number;
  specs_short?: Record<string, string>;
  specs_long?: Record<string, unknown>;
  /**
   * `verified` — figures came from ONEX and can be published.
   * `needs_data` — migrated from onexrf.com with identifying detail only; the
   * product template must render a Placeholder rather than invent numbers.
   */
  specs_status?: "verified" | "needs_data";
  /** What ONEX still has to supply for this model. Surfaced in the audit. */
  needs?: string[];
  key_features?: string[];
  highlights?: string[];
  related?: {
    applications?: string[];
    materials?: string[];
    tooling?: string[];
    technologies?: string[];
    support?: string[];
  };
};

const products = productsData as Product[];

/** Resolve an "@specs_long.a.b.c" pointer against a product's long specs. */
export function resolveSpecValue(
  specValue: string,
  specsLong: unknown
): string {
  if (!specValue.startsWith("@specs_long.")) return specValue;

  const parts = specValue.replace("@specs_long.", "").split(".");
  let value: unknown = specsLong;
  for (const part of parts) {
    if (value && typeof value === "object" && part in (value as object)) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return specValue; // leave the pointer visible rather than guessing
    }
  }
  return typeof value === "string" ? value : String(value);
}

const byOrder = (a: Product, b: Product) =>
  (a.order ?? 999) - (b.order ?? 999);

export function getAllProducts(): Product[] {
  return [...products].sort(byOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByLine(line: string): Product[] {
  return products.filter((p) => p.line === line).sort(byOrder);
}

export function getProductsByFamily(family: ProductFamily): Product[] {
  return products.filter((p) => p.family === family).sort(byOrder);
}

/** Grouped by `category` — the shape the machines index renders. */
export function getProductsGroupedByCategory(
  family?: ProductFamily
): { category: string; products: Product[] }[] {
  const source = family ? getProductsByFamily(family) : getAllProducts();
  const groups = new Map<string, Product[]>();
  for (const p of source) {
    const key = p.category ?? "Other";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  return [...groups.entries()].map(([category, items]) => ({
    category,
    products: items.sort(byOrder),
  }));
}

/** Products still awaiting real specification data from ONEX. */
export function getProductsNeedingSpecs(): Product[] {
  return products.filter((p) => p.specs_status === "needs_data").sort(byOrder);
}

export const FAMILY_LABELS: Record<ProductFamily, string> = {
  forming: "Forming",
  welding: "Welding",
  automation: "Automation",
};
