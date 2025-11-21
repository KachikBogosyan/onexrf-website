import productsData from "@/data/products.json";

export type Product = {
  slug: string;
  name: string;
  description?: string;
  image?: string;
};

const products = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
