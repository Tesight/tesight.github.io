import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目",
};

export default function AboutPage() {
  return (
    <main className="bg-background">
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-5 text-left xl:px-0">
          <h1 className="m-0 max-w-4xl text-5xl font-bold leading-[1.15] tracking-tighter text-foreground md:text-7xl md:leading-[1.2]">
            项目
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-[1.35] tracking-tight text-foreground-2 md:text-2xl md:leading-[1.2]">
            项目页面正在整理中，后续会集中展示德思特技术相关工具与工程实践。
          </p>
        </div>
      </section>
    </main>
  );
}
