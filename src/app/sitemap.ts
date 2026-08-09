import type { MetadataRoute } from "next";
import { PROMOTED_VARIANT, SITE_URL } from "@/lib/seo";
import { getAllProducts } from "@/lib/products";
import { getApplications } from "@/lib/applications";
import { getAllMaterials } from "@/lib/materials";
import { getAllTechnologies } from "@/lib/technologies";
import { getAllDownloads } from "@/lib/evidence";
import { getAllBlogPosts } from "@/lib/blog";
import { SERVICES, TOPICS } from "@/lib/content-pages";
import { SITES } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  // Nothing is published until one variant wins.
  if (!PROMOTED_VARIANT) return [];

  const base = SITES[PROMOTED_VARIANT].basePath;
  const url = (path: string) => `${SITE_URL}${base}${path}`;

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({ url: url(path), priority, changeFrequency });

  return [
    entry("", 1, "weekly"),
    entry("/machines", 0.9, "weekly"),
    entry("/applications", 0.9),
    entry("/resources", 0.6),
    entry("/resources/technologies", 0.8),
    entry("/resources/materials", 0.8),
    entry("/resources/downloads", 0.7),
    entry("/evidence", 0.7),
    entry("/evidence/case-studies", 0.7),
    entry("/evidence/samples", 0.7),
    entry("/services", 0.7),
    entry("/company", 0.6),
    entry("/blog", 0.8, "weekly"),
    entry("/contact", 0.6),
    entry("/quote", 0.6),

    ...getAllProducts().map((p) => entry(`/machines/${p.slug}`, 0.8)),
    ...getApplications().flatMap((a) => [
      entry(`/applications/${a.slug}`, 0.8),
      ...(a.sub_applications ?? []).map((s) =>
        entry(`/applications/${a.slug}/${s.slug}`, 0.7)
      ),
    ]),
    ...getAllMaterials().map((m) => entry(`/resources/materials/${m.slug}`, 0.7)),
    ...getAllTechnologies().map((t) =>
      entry(`/resources/technologies/${t.slug}`, 0.8)
    ),
    ...getAllDownloads()
      .filter((d) => d.available)
      .map((d) => entry(`/resources/downloads/${d.slug}`, 0.6)),
    ...TOPICS.map((t) => entry(`/topics/${t.slug}`, 0.7)),
    ...SERVICES.map((s) => entry(`/services/${s.slug}`, 0.7)),
    ...getAllBlogPosts().map((p) => entry(`/blog/${p.slug}`, 0.7)),
  ];
}
