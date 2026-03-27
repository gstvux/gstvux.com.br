import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import client from "../../../tina/__generated__/client";
import { MobileMenu } from "./MobileMenu";
import { NavigationItems } from "./NavigationItems";

import { Suspense } from "react";

export async function Header() {
  let logoText = "gstvux";
  let validNavItems: any[] = [];

  try {
    const res = await client.queries.global({ relativePath: "index.json" });
    const globalData = res.data.global;
    logoText = globalData.logoText || logoText;
    
    validNavItems = (globalData.navItems || [])
      .filter((item): item is any => !!item && !!item.label && !!item.href)
      .map((item: any) => ({
        label: item.label as string,
        href: item.href as string,
      }));
  } catch (error) {
    console.error("TinaCMS: Erro ao buscar dados do Header durante o build.", error);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-header border-b border-fg-section-separator backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        
        {/* MOBILE MENU TRIGGER */}
        <Suspense fallback={<div className="lg:hidden w-10 h-10" />}>
          <MobileMenu items={validNavItems} />
        </Suspense>

        {/* LOGO */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            aria-label="gstvux, página inicial"
          >
            <span className="font-primary font-bold text-2xl text-fg-body tracking-wide transition-colors group-hover:text-cta-link-fg-hover">
              {logoText}
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <Suspense fallback={<div className="hidden lg:block w-40 h-10" />}>
          <NavigationItems items={validNavItems} />
        </Suspense>

        {/* ACTIONS */}
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}