import { posts } from "@velite";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

const MDXContent = ({ code }: { code: string }) => {
  const Component = new Function(code)({ ...runtime }).default;
  return <Component />;
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="bg-curate-50 py-[40px] md:py-[80px]">
      <article className="mx-auto max-w-[820px] px-[30px]">
        <header className="mb-[40px]">
          {post.date && (
            <time className="mb-[14px] block text-[14px] font-normal text-curate-700">
              {post.date}
            </time>
          )}
          <h1 className="m-0 text-[36px] font-bold leading-[1.1] tracking-[-1px] text-curate-950 md:text-[46px] md:leading-none md:tracking-[-2px]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-[20px] text-[22px] leading-[1.24] tracking-[-1px] text-curate-700 md:mt-[30px] md:text-[26px] md:leading-[1.4] md:tracking-[1px]">
              {post.summary}
            </p>
          )}
        </header>

        <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:text-curate-950 prose-p:text-curate-950 prose-li:text-curate-950 prose-a:text-curate-950 prose-a:underline prose-strong:text-curate-950 prose-pre:rounded-[4px] prose-pre:bg-curate-950 prose-img:rounded-[4px]">
          <MDXContent code={post.content} />
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
