import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. It exists so the BreadcrumbList JSON-LD on the same
 * page describes something a visitor can actually see and use, which is what
 * Google asks for. The last crumb is the current page and is not a link.
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="w-full">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-gray-500 md:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-gray-700">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <ChevronLeft
                    size={14}
                    aria-hidden="true"
                    className="text-gray-300"
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
