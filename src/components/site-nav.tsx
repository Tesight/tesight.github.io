"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

const mobileSocialLinks = [
  {
    href: "https://www.linkedin.com/company/tesight",
    label: "领英",
    icon: "ri:linkedin-fill",
  },
  {
    href: "https://space.bilibili.com/3493083276642735",
    label: "Bilibili",
    icon: "ri:bilibili-fill",
  },
  {
    href: "https://appoqnsbkcp8067.pc.xiaoe-tech.com/",
    label: "小鹅通直播",
    icon: "ri:live-fill",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <nav className="relative mx-auto flex h-15 max-w-6xl items-center justify-between px-5 xl:px-0">
        <Link href="/" className="flex items-center" aria-label="Tesight home">
          <Image
            src={overlaysCover ? "/logo-white.svg" : "/logo.svg"}
            alt="Tesight"
            width={132}
            height={32}
            priority
            className="h-10 w-auto sm:h-12"
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

        <button
          type="button"
          className={`inline-flex size-10 items-center justify-center ${navTextClass} md:hidden`}
          aria-label="打开导航菜单"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(true)}
        >
          <Icon icon="ri:menu-line" className="size-7" aria-hidden="true" />
        </button>

        <div
          id="mobile-navigation"
          className={`fixed left-0 top-0 z-50 flex h-full w-full flex-col overflow-hidden bg-foreground text-background transition-[opacity,visibility] duration-500 ease-out md:hidden ${
            isMenuOpen
              ? "visible opacity-100"
              : "invisible opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto flex h-15 w-full max-w-6xl items-center justify-end px-5">
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center text-background transition-opacity hover:opacity-70"
              aria-label="关闭导航菜单"
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon
                icon="ri:close-line"
                className="size-7"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center px-5">
            <ul className="m-0 flex list-none flex-col items-center gap-3 p-0 text-center">
              {[...navItems, ...appItems, ...trailingNavItems].map((item) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-7 py-2.5 text-xl leading-none text-background no-underline transition-opacity hover:opacity-70 ${
                        isActive ? "font-bold" : "font-normal"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center justify-start px-7 pb-7 text-background">
            <div className="-mx-2 flex flex-wrap items-center text-2xl">
              {mobileSocialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="block p-2 text-background no-underline transition-opacity hover:opacity-80"
                >
                  <Icon
                    icon={item.icon}
                    className="size-6"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
