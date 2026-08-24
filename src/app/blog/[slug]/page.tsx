import { posts } from "@velite";
import { notFound } from "next/navigation";
import { PostArtwork } from "@/components/post-artwork";
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

  const postMeta = [post.date, post.author].filter(Boolean).join(" · ");

  return (
    <main className="bg-curate-50">
      <section className="relative h-[75vh] w-full overflow-hidden">
        <PostArtwork
          cover={post.cover}
          className="absolute inset-0 h-full rounded-none"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-foreground-2/10 via-foreground-2/10 to-foreground-2/45" />
        <header className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-4xl pb-20 text-left text-background">
          {postMeta && (
            <div className="mb-4 text-base leading-6 text-background/80">
              {postMeta}
            </div>
          )}
          <h1 className="m-0 max-w-3xl text-5xl font-bold leading-[1.1] tracking-[-1px] text-background">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-5 max-w-2xl text-2xl leading-[1.35] text-background/85">
              {post.summary}
            </p>
          )}
        </header>
      </section>

      <article className="mx-auto max-w-4xl py-16">
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-pre:rounded-md prose-pre:bg-curate-950 prose-img:rounded-sm">
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
