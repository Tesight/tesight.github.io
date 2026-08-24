import type { Post } from "@velite";
import Link from "next/link";
import { PostArtwork } from "@/components/post-artwork";

type BlogPostListProps = {
  posts: Post[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="flex flex-col items-center gap-12">
      {posts.map((post) => {
        const meta = [post.date, post.author].filter(Boolean).join(" · ");

        return (
          <article
            key={post.slug}
            className="flex w-full flex-col overflow-visible rounded-none md:flex-row"
          >
            <div className="mb-4 w-full shrink-0 md:mb-0 md:mr-[30px] md:w-[300px]">
              <Link
                href={`/blog/${post.slug}`}
                className="block hover:opacity-80"
              >
                <PostArtwork cover={post.cover} />
              </Link>
            </div>

            <div className="flex flex-1 flex-col p-0">
              {meta && (
                <div className="mb-2.5 text-sm font-bold text-foreground-2">
                  {meta}
                </div>
              )}

              <h2 className="mb-1.5 text-[22px] font-medium leading-[1.3] tracking-[-0.1px] text-foreground md:text-[26px]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-foreground no-underline hover:underline"
                >
                  {post.title}
                </Link>
              </h2>

              {post.summary && (
                <p className="m-0 line-clamp-3 text-base font-normal leading-[1.5] text-foreground-2">
                  {post.summary}
                </p>
              )}

              {post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="rounded-sm bg-background-3 px-3 py-1.5 text-sm leading-none text-foreground no-underline hover:opacity-80"
                    >
                      # {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
