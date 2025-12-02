import blogData from "@/data/blog.json";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string | null;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  related_applications?: string[];
  related_products?: string[];
  reading_time?: number;
};

const blogPosts = blogData as BlogPost[];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.categories.includes(category));
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getRelatedBlogPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  const related = blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => {
      // Match by categories, tags, or related applications/products
      const categoryMatch = post.categories.some((cat) => currentPost.categories.includes(cat));
      const tagMatch = post.tags.some((tag) => currentPost.tags.includes(tag));
      const appMatch =
        post.related_applications?.some((app) =>
          currentPost.related_applications?.includes(app)
        ) || false;
      const productMatch =
        post.related_products?.some((prod) => currentPost.related_products?.includes(prod)) ||
        false;

      return categoryMatch || tagMatch || appMatch || productMatch;
    })
    .slice(0, limit);

  return related;
}

