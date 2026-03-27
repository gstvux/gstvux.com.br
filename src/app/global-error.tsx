"use client";

import { useEffect } from "react";

// global-error captura falhas no próprio RootLayout.
// Precisa incluir <html> e <body> pois substitui o layout raiz.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
        <h2>Algo deu errado de forma crítica.</h2>
        <button onClick={reset}>Tentar novamente</button>
      </body>
    </html>
  );
}
