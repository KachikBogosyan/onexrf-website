import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog";
import { MarketingHero } from "@/components/MarketingHero";
import { PageNav, type Section } from "@/components/PageNav";
import { ContactCTA } from "@/components/ContactCTA";
import { ContentModule } from "@/components/ContentModule";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return notFound();

  // Read markdown content if it exists
  let content = "";
  if (post.content) {
    try {
      const contentPath = path.join(process.cwd(), post.content);
      if (fs.existsSync(contentPath)) {
        content = fs.readFileSync(contentPath, "utf-8");
      } else {
        // If file doesn't exist, use excerpt as fallback
        content = post.excerpt;
      }
    } catch (error) {
      console.error(`Error reading content file: ${post.content}`, error);
      content = post.excerpt;
    }
  } else {
    content = post.excerpt;
  }

  const relatedPosts = getRelatedBlogPosts(slug);

  const sections: Section[] = [
    { id: "content", label: "Content" },
    ...(relatedPosts.length > 0 ? [{ id: "related", label: "Related Posts" }] : []),
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500 mb-2">
        <Link href="/resources" className="hover:underline">
          Resources
        </Link>{" "}
        /{" "}
        <Link href="/resources/blog" className="hover:underline">
          Blog
        </Link>{" "}
        / <span className="text-slate-700">{post.title}</span>
      </nav>

      <MarketingHero
        heading={post.title}
        body={
          <div className="space-y-2">
            <p>{post.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString()}</span>
              {post.reading_time && (
                <>
                  <span>•</span>
                  <span>{post.reading_time} min read</span>
                </>
              )}
            </div>
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
          </div>
        }
        media={
          post.featured_image
            ? {
                src: post.featured_image,
                alt: post.title,
              }
            : undefined
        }
      />

      <PageNav sections={sections} />

      <section id="content">
        {content ? (
          <ContentModule
            title=""
            content={content}
            image={post.featured_image || undefined}
            imageAlt={post.title}
          />
        ) : (
          <div className="prose max-w-none">
            <p className="text-slate-700">{post.excerpt}</p>
          </div>
        )}
      </section>

      {relatedPosts.length > 0 && (
        <section id="related">
          <h2 className="text-lg font-semibold mb-4">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/resources/blog/${relatedPost.slug}`}
                className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-base font-semibold text-blue-600 hover:underline mb-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ContactCTA context={post.title} contextType="blog" />
    </div>
  );
}

