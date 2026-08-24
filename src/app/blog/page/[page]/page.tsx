import type { Metadata } from "next";
import { posts } from "@velite";
import { notFound } from "next/navigation";
import { BlogPostList } from "@/components/blog-post-list";
import { Pagination } from "@/components/pagination";

const POSTS_PER_PAGE = 5;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `博客 第 ${page} 页`,
  };
}

function getSortedPosts() {
  return [...posts].sort((a, b) => b.slug.localeCompare(a.slug));
}

function getTotalPages() {
  return Math.ceil(posts.length / POSTS_PER_PAGE);
}

export default async function BlogPageRoute({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const currentPage = Number(page);
  const totalPages = getTotalPages();

  if (!Number.isInteger(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  const sortedPosts = getSortedPosts();
  const pagePosts = sortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

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
            currentPage={currentPage}
            totalPages={totalPages}
            getPageHref={(pageNumber) =>
              pageNumber === 1 ? "/blog" : `/blog/page/${pageNumber}`
            }
            ariaLabel="博客分页"
          />
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return Array.from({ length: Math.max(getTotalPages() - 1, 0) }, (_, index) => ({
    page: String(index + 2),
  }));
}
