import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "../ui/button/ButtonLink";
import client from "../../../tina/__generated__/client";

export async function Header() {
  const res = await client.queries.global({ relativePath: "index.json" });
  const { logoText, navItems } = res.data.global;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-sm bg-header border-b border-b-fg-section-separator flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-7xl px-6 md:px-10">
        <Link href="/" aria-label="gstvux, página inicial">
          <p className="font-primary font-bold text-2xl text-fg-body leading-[1.4] tracking-wide">
            {logoText}
          </p>
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-6">
            {navItems?.map((item: any, index: number) => {
              if (!item) return null;
              return (
                <li key={index}>
                  <ButtonLink
                    href={item.href}
                    appearance="link"
                    className="font-secondary text-lg"
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}