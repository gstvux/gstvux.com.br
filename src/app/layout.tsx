import type { Metadata } from "next";
import { Sofia_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

const fontPrimary = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-family-primary",
  display: "swap",
});

const fontSecondary = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-family-secondary",
  display: "swap",
});

const fontUtils = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-family-utils",
  display: "swap",
});

export const metadata: Metadata = {
  title: "gstvux",
  description: "Portfolio de Gustavo Luciano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontPrimary.variable} ${fontSecondary.variable} ${fontUtils.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-page text-fg-body">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>

        <Header />

        <main id="main">{children}</main>

        <Footer />

      </body>
    </html>
  );
}