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
                  relative font-secondary text-lg font-medium transition-colors duration-200
                  ${isActive 
                    ? "text-cta-link-fg-hover" 
                    : "text-fg-body hover:text-cta-link-fg-hover"
                  }
                  after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-cta-link-fg-hover after:transition-transform after:duration-300
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
