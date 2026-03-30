"use client";

import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cx } from "./button/button-styles";
import { usePathname } from "next/navigation";

export function ScrollAffordance() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollable, setIsScrollable] = useState(true);
  const pathname = usePathname();

  // Rotas permitidas (Future Proof): Adicione novos slugs principais ou caminhos exatos aqui
  const isAllowedPath = pathname === "/" || pathname.startsWith("/cases/");

  // Determina se a página precisa de scroll e gerencia visibilidade/timers
  useEffect(() => {
    if (!isAllowedPath) {
      setIsVisible(false);
      return;
    }

    let returnTimer: NodeJS.Timeout;

    const checkState = () => {
      const scrollable = document.documentElement.scrollHeight > window.innerHeight + 50;
      setIsScrollable(scrollable);

      // Edge case: só acender o affordance se montou no topo E tiver barra de scroll
      if (scrollable && window.scrollY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Reseta caso tenha navegado pra um link já scrollado
      }
    };

    // Delay checking slightly to ensure DOM is fully painted e scroll restituído pelo browser
    const stateTimer = setTimeout(checkState, 400);

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        setIsVisible(false);
        clearTimeout(returnTimer);
      } else {
        // Voltou ao topo exato, setup do timer de "paciência" (7s)
        clearTimeout(returnTimer);
        returnTimer = setTimeout(() => {
          if (window.scrollY <= 50) setIsVisible(true);
        }, 7000);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkState, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkState);
      clearTimeout(returnTimer);
      clearTimeout(stateTimer);
    };
  }, [pathname, isAllowedPath]);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  if (!isAllowedPath || !isScrollable) return null;

  return (
    <div
      className={cx(
        "fixed bottom-[5%] left-1/2 -translate-x-1/2 z-40 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      aria-hidden={!isVisible}
    >
      <button
        onClick={handleScrollDown}
        className="flex flex-col items-center gap-2 text-fg-heading cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-500 p-4 -m-4 rounded-xl transition-opacity hover:opacity-80"
        aria-label="Rolar página para baixo"
        tabIndex={isVisible ? 0 : -1}
      >
        <span className="text-[10px] font-utils uppercase tracking-widest text-fg-body-subtle pointer-events-none">
          Scroll
        </span>
        <ArrowDown size={20} className="animate-bounce pointer-events-none" />
      </button>
    </div>
  );
}
