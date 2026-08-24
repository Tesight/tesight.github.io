import Link from "next/link";
import { Icon } from "@iconify/react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
  ariaLabel?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  getPageHref,
  ariaLabel = "分页",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const itemClass =
    "inline-flex h-10 min-w-8 items-center justify-center px-0 py-0 leading-none";
  const linkClass = `${itemClass} text-foreground no-underline hover:bg-foreground hover:text-background hover:opacity-80`;

  return (
    <nav aria-label={ariaLabel} className="mt-16 flex justify-center">
      <ul className="flex list-none p-0">
        {previousPage && (
          <li className="rounded-l-xs border border-r-0 border-foreground">
            <Link
              href={getPageHref(previousPage)}
              aria-label="上一页"
              className={linkClass}
            >
              <Icon
                icon="material-symbols:navigate-before"
                className="size-6"
                aria-hidden="true"
              />
            </Link>
          </li>
        )}

        {pages.map((page, index) => {
          const isCurrent = page === currentPage;
          const isLast = index === pages.length - 1 && nextPage === null;

          return (
            <li
              key={page}
              className={`border border-foreground ${isLast ? "rounded-r-xs" : "border-r-0"} ${index === 0 && !previousPage ? "rounded-l-xs" : ""}`}
            >
              {isCurrent ? (
                <span
                  aria-current="page"
                  className={`${itemClass} bg-foreground text-background`}
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={getPageHref(page)}
                  className={linkClass}
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}

        {nextPage && (
          <li className="rounded-r-xs border border-foreground">
            <Link
              href={getPageHref(nextPage)}
              aria-label="下一页"
              className={linkClass}
            >
              <Icon
                icon="material-symbols:navigate-next"
                className="size-6"
                aria-hidden="true"
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
