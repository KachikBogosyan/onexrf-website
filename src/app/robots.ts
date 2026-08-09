import type { MetadataRoute } from "next";
import { PROMOTED_VARIANT, SITE_URL } from "@/lib/seo";

/**
 * While the two variants are being compared, nothing is indexable — two
 * near-identical trees in the index would split the ranking signal between
 * them. Promoting a variant (see PROMOTED_VARIANT) opens this up.
 */
export default function robots(): MetadataRoute.Robots {
  if (!PROMOTED_VARIANT) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
