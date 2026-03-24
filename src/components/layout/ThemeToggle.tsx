"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button/Button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // O script síncrono no layout.tsx já rodou e incluiu a classe `.light` no html se necessário.
    // Lemos diretamente a classe para syncar o estado do React no mount client-side:
    if (document.documentElement.classList.contains("light")) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const IconSymbol = isDark ? (
    // Moon Icon (Current Theme: Dark)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ) : (
    // Sun Icon (Current Theme: Light)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  return (
    <Button
      type="button"
      appearance="secondary"
      iconOnly
      leadingIcon={IconSymbol}
      onClick={toggleTheme}
      aria-label={isDark ? "Alternar para tema claro" : "Alternar para tema escuro"}
    />
  );
}
