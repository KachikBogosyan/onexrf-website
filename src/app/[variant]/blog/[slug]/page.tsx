import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { resolveConfig } from "@/lib/variant";
import { sitePath } from "@/lib/site-config";
import {
  Card,
  Container,
  Eyebrow,
  Section,
} from "@/components/ui/primitives";

type Params = Promise<{ variant: string; slug: string }>;

export function generateStaticParams() {
  return ["outcome", "capability"].flatMap((variant) =>
    getAllBlogPosts().map((post) => ({ variant, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
  };
}

export default async function Page({ params }: { params: Params }) {
  const { variant, slug } = await params;
  const config = resolveConfig(variant);
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedBlogPosts(slug);
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      <Section className="!pb-8">
        <Container size="narrow">
          <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
            <Link href={sitePath(config, "/blog")} className="hover:underline">
              Blog
            </Link>
          </nav>
          <Eyebrow className="mt-5">{post.categories[0] ?? "Article"}</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-text-muted">
            {post.author}
            {post.reading_time ? ` · ${post.reading_time} min read` : ""}
          </p>
          <p className="prose-measure mt-6 text-lg text-text-muted">
            {post.excerpt}
          </p>
        </Container>
      </Section>

      <Section className="!pt-4">
        <Container size="narrow">
          <div className="prose-measure space-y-5 text-lg text-text">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="sunken">
          <Container size="narrow">
            <h2 className="text-xl font-semibold">Related reading</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <Card
                  key={item.slug}
                  href={sitePath(config, `/blog/${item.slug}`)}
                >
                  <h3 className="font-semibold text-text-heading">
                    {item.title}
                  </h3>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
