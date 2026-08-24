import Link from "next/link";
import { posts } from "@velite";
import { PostArtwork } from "@/components/post-artwork";
import { Icon } from "@iconify/react";

export default function Home() {
  const recentPosts = [...posts]
    .sort(
      (a, b) =>
        new Date(b.date || "").getTime() - new Date(a.date || "").getTime(),
    )
    .slice(0, 4);

  const tags = Array.from(
    posts
      .flatMap((post) => post.tags)
      .reduce((tagCounts, tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        return tagCounts;
      }, new Map<string, number>()),
  ).sort(([, countA], [, countB]) => countB - countA);

  return (
    <main>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 text-left xl:px-0">
          <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tighter text-foreground md:text-7xl md:leading-[1.2]">
            从信号出发，探索测试的边界
          </h1>
          <p className="mt-5 text-xl leading-[1.35] tracking-tight text-foreground-2 md:text-2xl md:leading-[1.2]">
            德思特技术博客，分享测试测量的技术方法、工程实践与前沿洞察
          </p>
        </div>
      </section>

      <section className="pb-20 pt-10 md:pb-30 md:pt-14">
        <div className="mx-auto max-w-6xl px-5 xl:px-0">
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {recentPosts.map((post) => {
              const postMeta = [post.date || "2026-04-13", post.author]
                .filter(Boolean)
                .join(" · ");

              return (
                <article
                  key={post.slug}
                  className="flex h-full flex-col overflow-hidden rounded-[4px] bg-curate-50"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block hover:opacity-80"
                  >
                    <PostArtwork cover={post.cover} />
                  </Link>
                  <div className="flex flex-1 flex-col gap-1.5 pt-2">
                    <h2 className="m-0 text-lg font-medium leading-[1.2] tracking-wider text-foreground">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-curate-950 no-underline hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {postMeta && (
                      <div className="text-sm leading-6 text-foreground-2">
                        {postMeta}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex justify-end">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-lg font-medium leading-none text-foreground no-underline hover:underline"
            >
              <span>查看全部文章</span>
              <Icon
                icon="mdi:arrow-right"
                className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background-2 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 xl:px-0">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <h2 className="m-0 text-3xl font-normal leading-[1.2] text-foreground md:text-4xl">
                文章主题
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-3">
                {tags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-background-3 px-4 py-2.5 text-sm leading-none text-foreground no-underline hover:opacity-80 md:px-5 md:py-3 md:text-base"
                  >
                    {tag}
                    <span className="ml-2 text-foreground-2">({count})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
