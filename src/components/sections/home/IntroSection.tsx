import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  intro?: HomePageData["intro"] & { imageSrc?: string; imageAlt?: string };
};

export function IntroSection({ intro }: Props) {
  if (!intro) return null;

  return (
    <section className="w-full bg-[#0c1625] text-white">
      <div className="w-full flex flex-col items-center py-16 lg:py-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-between p-6 md:p-[40px] gap-8 md:gap-0 rounded-[8px]">
          
          <div className="relative shrink-0 w-[275px] h-[275px]">
            {intro.imageSrc ? (
              <MediaFrame
                imageSrc={intro.imageSrc}
                imageAlt={intro.imageAlt || "Perfil"}
                animatePolygon
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 rounded-full animate-pulse" />
            )}
          </div>

          <div className="flex flex-col gap-[24px] items-start w-full max-w-[360px]">
            {(intro.kicker || intro.headline) && (
              <h2 className="font-primary text-[32px] font-normal leading-tight text-[#ca8100]">
                {intro.headline || intro.kicker}
              </h2>
            )}
            
            {intro.body && (
              <p className="font-secondary text-[18px] leading-normal text-[#eef2f7] whitespace-pre-wrap">
                {intro.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}