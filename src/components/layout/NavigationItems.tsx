"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface NavigationItemsProps {
  items: NavItem[];
}

export function NavigationItems({ items }: NavigationItemsProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block" aria-label="Navegação desktop">
      <ul className="flex items-center gap-8">
        {items.map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={index}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative font-secondary text-base font-semibold tracking-wide transition-colors duration-200
                  ${isActive
                    ? "text-brand-lime"
                    : "text-fg-heading opacity-80 hover:opacity-100 hover:text-brand-lime"
                  }
                  after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:rounded-full after:bg-brand-lime after:transition-transform after:duration-300 after:ease-out
                  ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
                `}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
