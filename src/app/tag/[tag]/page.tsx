import type { Metadata } from "next";
import { posts } from "@velite";
import { notFound } from "next/navigation";
import { BlogPostList } from "@/components/blog-post-list";

function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags)));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);

  return {
    title: `主题：${tag}`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const tagPosts = [...posts]
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => b.slug.localeCompare(a.slug));

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <main>
      <section className="py-16">
        <div className="mx-auto max-w-6xl text-left">
          <h1 className="m-0 max-w-4xl text-7xl font-bold leading-[1.2] tracking-tighter text-foreground">
            主题：{tag}
          </h1>
          <p className="mt-5 text-2xl leading-[1.2] tracking-tight text-foreground-2">
            共 {tagPosts.length} 篇文章
          </p>
        </div>
      </section>

      <section className="pb-30 pt-6">
        <div className="mx-auto max-w-6xl">
          <BlogPostList posts={tagPosts} />
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}
