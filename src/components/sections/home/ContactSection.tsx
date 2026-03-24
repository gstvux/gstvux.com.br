import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  contact?: HomePageData["contact"];
};

export function ContactSection({ contact }: Props) {
  if (!contact) return null;

  return (
    <section className="w-full bg-[#0c1625] text-white">
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
              <div className="w-full h-full bg-slate-800 rounded-full animate-pulse" />
            )}
          </div>

          {/* Conteúdo (Direita) */}
          <div className="flex flex-col gap-[24px] items-start w-full max-w-[630px]">

            {contact.headline && (
              <h2 className="font-primary text-[28px] lg:text-[32px] font-bold leading-tight text-[#ca8100] max-w-[360px]">
                {contact.headline}
              </h2>
            )}

            {contact.body && (
              <p className="font-secondary text-[16px] lg:text-[20px] leading-[1.5] text-[#eef2f7] whitespace-pre-wrap">
                {contact.body}
              </p>
            )}

            {/* Bullets */}
            {contact.bullets && contact.bullets.length > 0 && (
              <div className="flex flex-col gap-4 lg:gap-[24px] items-start pl-0 lg:pl-[24px] w-full mt-2 lg:mt-4">
                {contact.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex gap-[8px] items-start w-full relative">
                    {/* Estilo do bullet copiado do figma: retângulo laranja - mas a imagem do figma era um svg pequeno, vamos usar css */}
                    <div className="shrink-0 w-[8px] h-[8px] bg-[#ca8100] mt-[6px]" />
                    <p className="flex-1 font-secondary text-[16px] leading-normal text-[#eef2f7] tracking-[-0.32px]">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
