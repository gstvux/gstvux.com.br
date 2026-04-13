import { ButtonLink } from "@/src/components/ui/button/ButtonLink";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import client from "@/tina/__generated__/client";

export default async function NotFound() {
  const res = await client.queries.global({ relativePath: "index.json" });
  const { notFound } = res.data.global;

  if (!notFound) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        Página não encontrada
      </div>
    );
  }

  return (
    // O Next.js injeta automaticamente o RootLayout aqui.
    // Garantir que não existam tags <html> ou <body> extras que quebrem o DOM do GTM.
    <div id="not-found-page" className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      {/* Script para persistência de rastreamento 404 no GTM */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: '404_error',
              page_path: window.location.pathname,
              page_title: document.title || '404 - Not Found'
            });
          `,
        }}
      />

      <div className="relative mb-8">
        <Image
          className="media-frame__image"
          src="/images/404/notfound.png"
          alt="SHURUG! 404 not found"
          fill
        />
        <h1 className="text-[12rem] font-bold leading-none opacity-15 select-none font-primary">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-medium tracking-tight text-fg-heading sm:text-2xl font-utils bg-page/65">
            {notFound.title}
          </p>
        </div>
      </div>

      <p className="max-w-[400px] mb-12 text-fg-body font-secondary leading-relaxed whitespace-pre-line">
        {notFound.message}
      </p>

      <ButtonLink
        href="/"
        appearance="primary"
        size="md"
        leadingIcon={<MoveLeft />}
      >
        {notFound.buttonLabel}
      </ButtonLink>
    </div>
  );
}
