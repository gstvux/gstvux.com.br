import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  contact?: HomePageData["contact"];
};

export function ContactSection({ contact }: Props) {
  if (!contact) return null;

  return (
    <section className="w-full">
      <div className="w-full flex flex-col items-center py-16 lg:py-[96px]">

        {/* Container */}
        <div className="w-full max-w-[1070px] flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-[40px] px-6">

          {/* Imagem (Esquerda) */}
          <div className="relative shrink-0 w-[275px] h-[275px] lg:w-[320px] lg:h-[320px]">
            {contact.imageSrc ? (
              <MediaFrame
                imageSrc={contact.imageSrc}
                imageAlt={contact.imageAlt || "Contato"}
                animatePolygon={false}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-fg-body rounded-full animate-pulse" />
            )}
          </div>

          {/* Conteúdo (Direita) */}
          <div className="flex flex-col gap-4 items-start w-full max-w-[630px]">

            {contact.headline && (
              <h2 className="font-primary text-size-title font-bold leading-tight text-fg-heading max-w-[360px]">
                {contact.headline}
              </h2>
            )}

            {contact.body && (
              <p className="font-secondary leading-normal text-fg-body whitespace-pre-wrap">
                {contact.body}
              </p>
            )}

            {/* Bullets */}
            {contact.bullets && contact.bullets.length > 0 && (
              <ul className="list-none lg:flex lg:flex-col lg:gap-2">
                {contact.bullets.map((bullet, idx) => (
                  <li key={idx} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-amber-500">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
