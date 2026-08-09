import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { resolveConfig, type VariantParams } from "@/lib/variant";
import { sitePath } from "@/lib/site-config";
import {
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHeading,
} from "@/components/ui/primitives";
import { Placeholder } from "@/components/Placeholder";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Process notes, application write-ups and technical explanations from the ONEX RF engineering team.",
};

export default async function Page({ params }: { params: VariantParams }) {
  const { variant } = await params;
  const config = resolveConfig(variant);
  const posts = getAllBlogPosts();

  return (
    <>
      <Section className="!pb-10">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Notes from the people doing the work"
            lede="Written by engineers rather than marketers, which is why these rank — and why they are worth reading."
          />
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.slug}
                href={sitePath(config, `/blog/${post.slug}`)}
                className="flex flex-col"
              >
                <Eyebrow>{post.categories[0] ?? "Article"}</Eyebrow>
                <h2 className="mt-1 text-lg font-semibold text-text-heading">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-4 flex-1 text-sm text-text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-4 text-xs text-text-muted">
                  {post.author}
                  {post.reading_time ? ` · ${post.reading_time} min read` : ""}
                </p>
              </Card>
            ))}
          </div>

          <Placeholder
            title="Migrate the existing blog archive"
            blocking
            className="mt-10"
          >
            onexrf.com currently runs roughly nine pages of blog posts on HubSpot
            — years of technical writing that already ranks. Only one post has
            been brought across so far. This archive is the single biggest SEO
            asset ONEX owns, and the migration has to preserve every existing
            URL, including the legacy <code>/blog/rf-welding/bid/NNNNN/…</code>
            paths, or the rankings go with them.
          </Placeholder>
        </Container>
      </Section>
    </>
  );
}
