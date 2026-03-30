"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";

export function EndOfPageParty() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);
  const pathname = usePathname();

  // Reseta o gatilho da festa sempre que a rota (página) mudar
  useEffect(() => {
    hasFired.current = false;
  }, [pathname]);

  useEffect(() => {
    if (hasFired.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          fireConfetti();
          pushAnalytics();
        }
      },
      { threshold: 0 } // Dispara assim que pelo menos 1px dessa div tocar a tela
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fireConfetti = () => {
    // Extrai as cores hexadecimais brutas das variáveis CSS no client-side
    const getCssColor = (varName: string) => {
      if (typeof window === "undefined") return "#000000";
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    };

    // Agora você pode referenciar o design system puro!
    const colors = [
      getCssColor("--color-confetti-1"),
      getCssColor("--color-confetti-2"),
      getCssColor("--color-confetti-3"),
      getCssColor("--color-confetti-4"),
    ];

    // Pulso único e rápido, durando metade do tempo graças ao ticks curtos
    const confettiConfig = {
      particleCount: 15, // Pouquinho confete numa única explosão
      spread: 45,
      startVelocity: 40,
      decay: 0.94, // Decai velozmente
      colors,
      shapes: ["circle", "square"] as ("circle" | "square")[],
      scalar: 0.7,
      ticks: 100, // Limita a duração visual pela metade do padrão (200)
      disableForReducedMotion: true,
    };

    confetti({
      ...confettiConfig,
      angle: 60,
      origin: { x: 0, y: 1 },
    });

    confetti({
      ...confettiConfig,
      angle: 120,
      origin: { x: 1, y: 1 },
    });
  };

  const pushAnalytics = () => {
    // Integração suave com GTM DataLayer
    // @ts-ignore
    if (typeof window !== "undefined" && window.dataLayer) {
      // @ts-ignore
      window.dataLayer.push({ event: "page_bottom_reached" });
    }
  };

  return (
    <div
      ref={triggerRef}
      className="relative w-full h-px opacity-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
