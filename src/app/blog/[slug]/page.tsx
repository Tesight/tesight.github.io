import type { Metadata } from "next";
import { posts } from "@velite";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCoverParallax } from "@/components/post-cover-parallax";
import * as runtime from "react/jsx-runtime";

const MDXContent = ({ code }: { code: string }) => {
  const Component = new Function(code)({ ...runtime }).default;
  return <Component />;
};

const postContentClassName = [
  "prose max-w-none md:prose-lg",
  "prose-headings:font-bold prose-headings:leading-tight prose-headings:tracking-tight prose-headings:text-foreground",
  "prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-2xl md:prose-h2:mb-5 md:prose-h2:text-3xl",
  "prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-xl md:prose-h3:mb-4 md:prose-h3:text-2xl",
  "prose-p:my-2 prose-p:text-justify prose-p:leading-7 prose-p:text-foreground md:prose-p:leading-8",
  "prose-a:text-foreground prose-a:underline prose-a:decoration-foreground/35 prose-a:underline-offset-4 hover:prose-a:decoration-foreground",
  "prose-strong:text-foreground",
  "prose-ul:my-0",
  "prose-li:my-0 prose-li:text-foreground prose-li:marker:text-foreground-2",
  "prose-blockquote:border-l-foreground prose-blockquote:text-foreground-2",
  "prose-code:rounded-sm prose-code:bg-stone-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-code:font-mono prose-code:font-normal",
  "prose-pre:overflow-x-auto prose-pre:rounded-md prose-pre:bg-foreground prose-pre:p-4 prose-pre:text-background prose-pre:font-mono md:prose-pre:p-5",
  "[&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-background",
  "[&_.table-scroll]:my-8 [&_.table-scroll]:max-w-full [&_.table-scroll]:overflow-x-auto",
  "[&_table]:my-0 [&_table]:w-full [&_table]:table-auto [&_table]:border-collapse",
  "[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_td]:px-4 [&_td]:py-3",
  "[&_th]:whitespace-normal [&_td]:whitespace-normal [&_th]:break-words [&_td]:break-words",
  "prose-img:rounded-sm",
  "prose-hr:border-foreground/15",
].join(" ");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const postMeta = [post.date, post.author].filter(Boolean).join(" · ");

  return (
    <main className="bg-background">
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden sm:h-[75vh]">
        <PostCoverParallax cover={post.cover} />
        <div className="absolute inset-0 bg-linear-to-b from-foreground-2/10 via-foreground-2/10 to-foreground-2/45" />
        <header className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-4xl px-5 pb-12 text-left text-background md:pb-20">
          {postMeta && (
            <div className="mb-4 text-base leading-6 text-background/80">
              {postMeta}
            </div>
          )}
          <h1 className="m-0 max-w-3xl text-4xl font-bold leading-[1.12] tracking-[-1px] text-background md:text-5xl md:leading-[1.1]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-5 max-w-2xl text-lg leading-[1.45] text-background/85 md:text-2xl md:leading-[1.35]">
              {post.summary}
            </p>
          )}
        </header>
      </section>

      <article className="mx-auto max-w-4xl px-5 py-12 md:py-16">
        <div className={postContentClassName}>
          <MDXContent code={post.content} />
        </div>

        {post.tags.length > 0 && (
          <footer className="border-foreground/15 pt-8">
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="rounded-sm bg-background-2 px-4 py-2 text-sm leading-none text-foreground no-underline hover:bg-background-3"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
