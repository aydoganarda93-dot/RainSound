import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/seo";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Sayfa konumu">
      <ol className="rain-container breadcrumbs__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.href} className="breadcrumbs__item">
              {isCurrent ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
