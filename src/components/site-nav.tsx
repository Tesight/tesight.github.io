"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "主页" },
  { href: "/blog", label: "博客" },
];

const trailingNavItems = [{ href: "/contact", label: "联系" }];

const appItems = [
  {
    href: "/app/track-editor",
    label: "轨迹编辑器",
    description: "创建自定义的运动轨迹",
    icon: "iwwa:map",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function isPostPage(pathname: string) {
  return /^\/blog\/[^/]+\/?$/.test(pathname);
}

export function SiteNav() {
  const pathname = usePathname();
  const overlaysCover = isPostPage(pathname);
  const navTextClass = overlaysCover ? "text-background" : "text-foreground";

  return (
    <header
      className={`${
        overlaysCover
          ? "absolute left-0 top-0 z-30 w-full bg-transparent"
          : "bg-background"
      } ${navTextClass}`}
    >
      <nav className="mx-auto flex h-15 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Tesight home">
          <Image
            src={overlaysCover ? "/logo-white.svg" : "/logo.svg"}
            alt="Tesight"
            width={132}
            height={32}
            priority
            className="h-12 w-auto"
          />
        </Link>

        <ul className="hidden h-full items-center gap-4 md:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  className={`flex h-full items-center px-2.5 py-2 text-lg capitalize ${navTextClass} no-underline hover:underline ${
                    isActive ? "font-bold" : "font-normal"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li className="group relative h-full">
            <button
              type="button"
              className={`flex h-full items-center gap-1 px-2.5 py-2 text-lg capitalize ${navTextClass} hover:underline ${
                pathname.startsWith("/app") ? "font-bold" : "font-normal"
              }`}
              aria-haspopup="menu"
            >
              应用
              <Icon
                icon="ri:arrow-down-s-line"
                className="size-4"
                aria-hidden="true"
              />
            </button>
            <div className="pointer-events-none absolute right-0 top-12 z-20 min-w-2xs rounded-md bg-background-2 p-4 opacity-0  transition-[top,opacity] duration-250 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 shadow-lg">
              <ul className="m-0 flex list-none flex-col p-0">
                {appItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex rounded-md p-4 text-foreground no-underline hover:bg-background-3"
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="mr-4 flex size-10 shrink-0 items-center justify-center text-foreground">
                          <Icon
                            icon={item.icon}
                            className="size-10"
                            aria-hidden="true"
                          />
                        </span>
                        <span>
                          <span
                            className={`block text-base text-foreground ${
                              isActive ? "font-bold" : "font-medium"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="block text-sm font-normal text-foreground-2">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          {trailingNavItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <li key={item.href} className="h-full">
                <Link
                  href={item.href}
                  className={`flex h-full items-center px-2.5 py-2 text-lg capitalize ${navTextClass} no-underline hover:underline ${
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

        <button className={`text-base font-normal ${navTextClass} underline md:hidden`}>
          Menu
        </button>
      </nav>
    </header>
  );
}
