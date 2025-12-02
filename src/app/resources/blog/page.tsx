import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import { MarketingHero } from "@/components/MarketingHero";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="space-y-12">
      <MarketingHero
        heading="Blog"
        body="Expert insights on catheter manufacturing, process development, and industry best practices."
        media={{
          src: "/images/blog-hero.png",
          alt: "ONEX Blog",
        }}
      />

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/blog/${post.slug}`}
              className="block rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {post.featured_image && (
                <div className="mt-3 mb-2 w-full h-56 relative rounded-md overflow-hidden bg-slate-100">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                {post.reading_time && <span>• {post.reading_time} min read</span>}
              </div>
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-slate-700 line-clamp-3 mb-3">{post.excerpt}</p>
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

