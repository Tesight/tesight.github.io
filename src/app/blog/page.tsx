import type { Metadata } from "next";
import { posts } from "@velite";
import { BlogPostList } from "@/components/blog-post-list";
import { Pagination } from "@/components/pagination";

export const metadata: Metadata = {
  title: "博客",
};
const POSTS_PER_PAGE = 5;

export default function BlogListPage() {
  const sortedPosts = [...posts].sort((a, b) => b.slug.localeCompare(a.slug));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const pagePosts = sortedPosts.slice(0, POSTS_PER_PAGE);

  return (
    <main>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 text-left xl:px-0">
          <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tighter text-foreground md:text-7xl md:leading-[1.2]">
            博客
          </h1>
        </div>
      </section>

      <section className="pb-20 pt-4 md:pb-30 md:pt-6">
        <div className="mx-auto max-w-6xl px-5 xl:px-0">
          <BlogPostList posts={pagePosts} />
          <Pagination
            currentPage={1}
            totalPages={totalPages}
            getPageHref={(page) =>
              page === 1 ? "/blog" : `/blog/page/${page}`
            }
            ariaLabel="博客分页"
          />
        </div>
      </section>
    </main>
  );
}
