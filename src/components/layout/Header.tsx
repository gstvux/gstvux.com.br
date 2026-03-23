import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-sm border-b border-b-(--header-border-bottom-color) bg-(--header-bg)">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" aria-label="gstvux, página inicial" className="font-medium">
          gstvux
        </Link>

        <nav aria-label="Principal">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/cases">Cases</Link>
            </li>
            <li>
              <Link href="/about">Sobre</Link>
            </li>
            <li>
              <Link href="/contact">Contato</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Alternar tema"
            className="rounded-xl border border-(--color-border) px-3 py-2"
          >
            Tema
          </button>

          <Link
            href="/contact"
            className="rounded-xl bg-(--color-accent) px-4 py-2 text-(--color-accent-contrast)"
          >
            Vamos conversar
          </Link>
        </div>
      </div>
    </header>
  );
}