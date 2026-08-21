import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "主页" },
  // { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  // { href: "/contact", label: "联系" },
];

export function SiteNav() {
  return (
    <header className="bg-background text-foreground">
      <nav className="mx-auto flex h-[60px] max-w-6xl items-center justify-between">
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
          {navItems.map((item) => (
            <li key={item.href} className="h-full">
              <Link
                href={item.href}
                className="flex h-full items-center px-[10px] py-[6px] text-[18px] font-normal capitalize text-curate-950 no-underline hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="text-[18px] font-normal text-curate-950 underline md:hidden">
          Menu
        </button>
      </nav>
    </header>
  );
}
