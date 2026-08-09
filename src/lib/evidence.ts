import caseStudiesData from "@/data/case-studies.json";
import testimonialsData from "@/data/testimonials.json";
import downloadsData from "@/data/downloads.json";
import companyData from "@/data/company.json";
import type { ProductFamily } from "./products";

/* ---------------------------------------------------------------------------
   Case studies
   ------------------------------------------------------------------------- */

export type CaseStudyMetric = {
  value: string;
  label: string;
  source: string;
};

export type CaseStudy = {
  slug: string;
  /** Draft entries never render publicly — they only feed the content audit. */
  draft: boolean;
  title: string;
  customer: string | null;
  customer_anonymised: string | null;
  industry: string | null;
  family: ProductFamily | null;
  summary: string;
  challenge: string | null;
  approach: string | null;
  result: string | null;
  metrics: CaseStudyMetric[];
  quote: { text: string; author: string; role?: string } | null;
  images: string[];
  related?: { products?: string[]; applications?: string[] };
  needs?: string[];
};

const caseStudies = caseStudiesData as CaseStudy[];

/** Only studies cleared for publication. */
export function getPublishedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => !c.draft);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudiesByFamily(family: ProductFamily): CaseStudy[] {
  return getPublishedCaseStudies().filter((c) => c.family === family);
}

/* ---------------------------------------------------------------------------
   Testimonials
   ------------------------------------------------------------------------- */

export type Testimonial = {
  id: string;
  /** Unapproved quotes are withheld — an unattributed quote is not evidence. */
  approved: boolean;
  quote: string | null;
  author: string;
  role?: string | null;
  company?: string | null;
  source: string;
  related?: { products?: string[]; applications?: string[] };
  needs?: string[];
};

const testimonials = testimonialsData as Testimonial[];

export function getApprovedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.approved && t.quote);
}

export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

/* ---------------------------------------------------------------------------
   Downloads — the capture layer
   ------------------------------------------------------------------------- */

export type Download = {
  slug: string;
  title: string;
  description: string;
  kind: "brochure" | "guide" | "spec-sheet" | "video";
  family: ProductFamily | null;
  file: string | null;
  cover: string | null;
  /** Gated assets exchange the file for an email — the whole point of the layer. */
  gated: boolean;
  available: boolean;
  year?: string;
  needs?: string[];
};

const downloads = downloadsData as Download[];

export function getAvailableDownloads(): Download[] {
  return downloads.filter((d) => d.available && d.file);
}

export function getAllDownloads(): Download[] {
  return downloads;
}

export function getDownloadBySlug(slug: string): Download | undefined {
  return downloads.find((d) => d.slug === slug);
}

export function getDownloadsByFamily(family: ProductFamily): Download[] {
  return getAvailableDownloads().filter((d) => d.family === family);
}

/* ---------------------------------------------------------------------------
   Company
   ------------------------------------------------------------------------- */

export type Company = {
  positioning: string;
  summary: string;
  timeline: { year: string; title: string; body: string }[];
  differentiators: { title: string; body: string }[];
  needs: string[];
};

export function getCompany(): Company {
  return companyData as Company;
}
