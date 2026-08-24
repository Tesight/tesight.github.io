import Link from "next/link";
import { posts } from "@velite";
import { PostArtwork } from "@/components/post-artwork";

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
      <section className="py-16">
        <div className="mx-auto max-w-6xl text-left">
          <h1 className="m-0 font-bold max-w-4xl text-7xl leading-[1.2] tracking-tighter text-foreground">
            从信号出发，探索测试的边界
          </h1>
          <p className="mt-5 text-2xl leading-[1.2] tracking-tight text-foreground-2">
            德思特技术博客，分享测试测量的技术方法、工程实践与前沿洞察
          </p>
        </div>
      </section>

      <section className="pb-30 pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2">
            {recentPosts.map((post) => (
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
                <div className="flex flex-1 flex-col pt-2 gap-1.5">
                  <h2 className="m-0 font-medium leading-[1.2] tracking-wider text-lg text-foreground">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-curate-950 no-underline hover:underline"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="text-sm font-light text-foreground-2">
                    {post.date || "2026-04-13"}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-2 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <h2 className="m-0 text-4xl font-normal leading-[1.2] text-foreground">
                文章主题
              </h2>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap gap-3">
                {tags.map(([tag, count]) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-background-3 px-5 py-3 text-base leading-none text-foreground no-underline hover:opacity-80"
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
