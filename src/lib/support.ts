import supportData from "@/data/support.json";

export type Seminar = {
  slug: string;
  name: string;
  description: string;
  image?: string;
};

export type Support = {
  slug: string;
  name: string;
  description?: string;
  image?: string;
  included_with?: string[];
  available_as_standalone?: boolean;
  process_steps?: string[];
  seminars?: Seminar[];
  related?: {
    applications?: string[];
    products?: string[];
  };
};

const supportItems = supportData as Support[];

export function getSupportBySlug(slug: string): Support | undefined {
  return supportItems.find((s) => s.slug === slug);
}

export function getAllSupport(): Support[] {
  return supportItems;
}
