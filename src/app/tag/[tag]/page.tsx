import type { Metadata } from "next";
import { posts } from "@velite";
import { notFound } from "next/navigation";
import { BlogPostList } from "@/components/blog-post-list";

function getAllTags() {
  return Array.from(new Set(posts.flatMap((post) => post.tags)));
}

function getTagSlug(tag: string) {
  return encodeURIComponent(tag);
}

function getTagFromParam(param: string) {
  const tagOrSlug = decodeURIComponent(param);

  return getAllTags().find(
    (tag) => tag === tagOrSlug || getTagSlug(tag) === tagOrSlug,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: encodedTag } = await params;
  const tag = getTagFromParam(encodedTag);

  return {
    title: tag ? `主题：${tag}` : "主题",
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: encodedTag } = await params;
  const tag = getTagFromParam(encodedTag);

  if (!tag) {
    notFound();
  }

  const tagPosts = [...posts]
    .filter((post) => post.tags.includes(tag))
    .sort((a, b) => b.slug.localeCompare(a.slug));

  if (tagPosts.length === 0) {
    notFound();
  }

  return (
    <main>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 text-left xl:px-0">
          <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tighter text-foreground md:text-7xl md:leading-[1.2]">
            主题：{tag}
          </h1>
          <p className="mt-5 text-xl leading-[1.35] tracking-tight text-foreground-2 md:text-2xl md:leading-[1.2]">
            共 {tagPosts.length} 篇文章
          </p>
        </div>
      </section>

      <section className="pb-20 pt-4 md:pb-30 md:pt-6">
        <div className="mx-auto max-w-6xl px-5 xl:px-0">
          <BlogPostList posts={tagPosts} />
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return getAllTags().flatMap((tag) => {
    const tagSlug = getTagSlug(tag);

    if (tagSlug === tag) {
      return [{ tag }];
    }

    return [{ tag: tagSlug }, { tag }];
  });
}
