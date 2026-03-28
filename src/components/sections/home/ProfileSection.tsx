import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  profile?: HomePageData["profile"] & { imageSrc?: string; imageAlt?: string };
};

export function ProfileSection({ profile }: Props) {
  if (!profile) return null;

  return (
    <section className="w-full" id="perfil">
      <div className="w-full flex flex-col items-center py-16 lg:py-[64px]">
        <div className="w-full max-w-[800px] flex flex-col md:flex-row items-center md:items-start justify-between p-6 md:p-[40px] gap-8 md:gap-0 rounded-[8px]">

          <div className="relative shrink-0 w-[320px] h-[320px]">
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

          <div className="flex flex-col gap-6 items-start w-full max-w-[420px]">
            <div className="flex flex-col">

              {profile.kicker && (
                <p className="font-utils text-fg-body-subtle">
                  {profile.kicker}
                </p>
              )}

              {profile.headline && (
                <h2 className="font-primary text-size-title font-normal leading-title text-fg-heading">
                  {profile.headline}
                </h2>
              )}
            </div>

            {profile.body && (
              <p className="font-secondary leading-normal">
                {profile.body}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}