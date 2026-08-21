import Link from "next/link";
import { posts } from "@velite";
import { PostArtwork } from "@/components/post-artwork";

export default function BlogListPage() {
  const sortedPosts = [...posts].sort((a, b) => b.slug.localeCompare(a.slug));

  return (
    <main className="bg-curate-50">
      <section className="py-[40px] md:py-[80px]">
        <div className="mx-auto max-w-[1140px] px-[30px]">
          <h1 className="m-0 text-[36px] font-bold leading-[1.1] tracking-[-1px] text-curate-950 md:text-[46px] md:leading-none md:tracking-[-2px]">
            Blog
          </h1>
        </div>
      </section>

      <section className="pb-[40px] pt-0 md:pb-[80px]">
        <div className="mx-auto grid max-w-[1140px] gap-x-[30px] gap-y-[30px] px-[30px] md:grid-cols-2">
          {sortedPosts.map((post) => (
            <article key={post.slug} className="flex h-full flex-col overflow-hidden rounded-[4px] bg-curate-50">
              <Link href={`/blog/${post.slug}`} className="block hover:opacity-80">
                <PostArtwork />
              </Link>
              <div className="flex flex-1 flex-col pt-[6px]">
                <h2 className="m-0 text-[20px] font-medium leading-[1.2] tracking-[-0.2px] text-curate-950">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-curate-950 no-underline hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="text-[14px] font-light text-curate-700">
                  {post.date || "2026-04-13"}
                </div>
                {post.summary && (
                  <p className="mt-[10px] line-clamp-2 text-[18px] font-normal leading-[1.3] text-curate-700">
                    {post.summary}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
