import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VariantSwitcher } from "@/components/site/VariantSwitcher";
import { SITES, type SiteVariant } from "@/lib/site-config";

/**
 * One shell, two sites.
 *
 * Both variants share every page body, so the route tree exists once and the
 * variant is a parameter. When one direction is chosen it gets promoted to the
 * root and this segment collapses away.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ variant: "outcome" }, { variant: "capability" }];
}

// Neither tree is indexed while the comparison runs — two near-identical sites
// in the index would split the signal between them.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function isVariant(value: string): value is SiteVariant {
  return value === "outcome" || value === "capability";
}

export default async function VariantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  if (!isVariant(variant)) notFound();

  const config = SITES[variant];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader config={config} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter config={config} />
      <VariantSwitcher current={variant} />
    </div>
  );
}
