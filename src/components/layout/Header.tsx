import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import client from "../../../tina/__generated__/client";
import { MobileMenu } from "./MobileMenu";
import { NavigationItems } from "./NavigationItems";

export async function Header() {
  const res = await client.queries.global({ relativePath: "index.json" });
  const { logoText, navItems } = res.data.global;

  // Filtrar itens nulos e garantir tipagem básica para o MobileMenu
  const validNavItems = (navItems || [])
    .filter((item): item is any => !!item && !!item.label && !!item.href)
    .map((item: any) => ({
      label: item.label as string,
      href: item.href as string,
    }));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-header border-b border-fg-section-separator backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-10">
        
        {/* MOBILE MENU TRIGGER: Lado esquerdo no mobile, oculto no desktop */}
        <MobileMenu items={validNavItems} />

        {/* LOGO: Centro no mobile, Esquerda no desktop */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="group flex items-center gap-2"
            aria-label="gstvux, página inicial"
          >
            <span className="font-primary font-bold text-2xl text-fg-body tracking-wide transition-colors group-hover:text-blue-500">
              {logoText}
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV: Oculto no mobile, visível apartir de lg: (1024px) */}
        <NavigationItems items={validNavItems} />

        {/* ACTIONS: Theme Toggle sempre visível à direita */}
        <div className="flex items-center justify-end">
          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}