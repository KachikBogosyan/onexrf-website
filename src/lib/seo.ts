import { COMPANY } from "./site-config";
import type { SiteVariant } from "./site-config";

export const SITE_URL = "https://www.onexrf.com";

/**
 * Which variant is live at the root domain.
 *
 * `null` means the comparison is still running: both trees are noindex, the
 * chooser sits at `/`, and the sitemap stays empty. Setting this to a variant
 * is the switch that promotes it — the sitemap starts emitting its URLs and
 * robots.txt opens up.
 */
export const PROMOTED_VARIANT: SiteVariant | null = null;

/** Organization schema — the one piece of structured data every page carries. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    foundingDate: COMPANY.founded,
    description:
      "Vertically integrated manufacturer of RF welding, catheter forming and automation systems for medical device production.",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.street,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: "sales",
    },
    sameAs: [COMPANY.social.linkedin, COMPANY.social.youtube],
  };
}

export function productSchema(product: {
  name: string;
  description?: string;
  aliases?: string[];
  image?: string | null;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(product.aliases?.[0] ? { model: product.aliases[0] } : {}),
    ...(product.image ? { image: `${SITE_URL}${product.image}` } : {}),
    brand: { "@type": "Brand", name: COMPANY.name },
    manufacturer: { "@type": "Organization", name: COMPANY.legalName },
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: { "@type": "Organization", name: COMPANY.name },
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
