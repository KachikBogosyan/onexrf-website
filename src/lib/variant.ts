import { notFound } from "next/navigation";
import { SITES, type SiteConfig, type SiteVariant } from "./site-config";

export function isVariant(value: string): value is SiteVariant {
  return value === "outcome" || value === "capability";
}

/** Resolve a route's `[variant]` param into its site config, or 404. */
export function resolveConfig(variant: string): SiteConfig {
  if (!isVariant(variant)) notFound();
  return SITES[variant];
}

/** Shorthand for the `params` shape every page under `[variant]` receives. */
export type VariantParams = Promise<{ variant: string }>;
