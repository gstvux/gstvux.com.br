import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  profile?: HomePageData["profile"] & { imageSrc?: string; imageAlt?: string };
};

export function ProfileSection({ profile }: Props) {
  if (!profile) return null;

  return (
    <section className="w-full bg-[#0c1625] text-white">
      <div className="w-full flex flex-col items-center py-16 lg:py-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <div className="w-full max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-between p-6 md:p-[40px] gap-8 md:gap-0 rounded-[8px]">

          <div className="relative shrink-0 w-[275px] h-[275px]">
            {profile.imageSrc ? (
              <MediaFrame
                imageSrc={profile.imageSrc}
                imageAlt={profile.imageAlt || "Perfil"}
                animatePolygon={false}
                className="w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 rounded-full animate-pulse" />
            )}
          </div>

          <div className="flex flex-col gap-[24px] items-start w-full max-w-[360px]">
            {(profile.kicker || profile.headline) && (
              <h2 className="font-primary text-[32px] font-normal leading-tight text-[#ca8100]">
                {profile.headline || profile.kicker}
              </h2>
            )}

            {profile.body && (
              <p className="font-secondary text-[18px] leading-normal text-[#eef2f7] whitespace-pre-wrap">
                {profile.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}