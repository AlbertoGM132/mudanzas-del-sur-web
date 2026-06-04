{/* PAGINA QUE ABRE CADA ARTICULO*/}

import BlogPostClient from "./BlogPostClient";
import { blogPosts } from "./data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
