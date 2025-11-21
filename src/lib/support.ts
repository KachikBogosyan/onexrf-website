import supportData from "@/data/support.json";

export type Support = {
  slug: string;
  name: string;
  description?: string;
  included_with?: string[];
  available_as_standalone?: boolean;
  process_steps?: string[];
};

const supportItems = supportData as Support[];

export function getSupportBySlug(slug: string): Support | undefined {
  return supportItems.find((s) => s.slug === slug);
}
