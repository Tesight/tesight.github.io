import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: {
    default: "德思特技术",
    template: "%s - 德思特技术",
  },
  description: "德思特技术博客，分享测试测量的技术方法、工程实践与前沿洞察",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="[scrollbar-gutter:stable]">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
