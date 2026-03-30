import type { Metadata } from "next";
import { Sofia_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { GoogleTagManager } from '@next/third-parties/google'

export const runtime = "nodejs";

const fontPrimary = Sofia_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-family-primary",
  display: "swap",
});

const fontSecondary = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
  title: "gstvux | UI Design & Development",
  description: "Trabalho com design e desenvolvimento de interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang="pt-BR"
      className={`${fontPrimary.variable} ${fontSecondary.variable} ${fontUtils.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          key="theme-init"
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
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}

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