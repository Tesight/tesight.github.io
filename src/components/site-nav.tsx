"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "主页" },
  // { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  // { href: "/contact", label: "联系" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="bg-background text-foreground">
      <nav className="mx-auto flex h-15 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Tesight home">
          <Image
            src="/logo.svg"
            alt="Tesight"
            width={132}
            height={32}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden h-full items-center gap-0 md:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  className={`flex h-full items-center px-2.5 py-2 text-lg capitalize text-foreground no-underline hover:underline ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button className="text-[18px] font-normal text-curate-950 underline md:hidden">
          Menu
        </button>
      </nav>
    </header>
  );
}
