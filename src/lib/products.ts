import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  name: string;
  line: string;
  description?: string;
  image?: string;
  is_new?: boolean;
  order?: number;
};

const products = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getProductsByLine(line: string) {
  return products.filter((p): p is Product => p.line === line);
}