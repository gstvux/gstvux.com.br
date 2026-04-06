import { MediaFrame } from "@/src/components/ui/media/MediaFrame";
import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  profile?: HomePageData["profile"] & { imageSrc?: string; imageAlt?: string };
};

export function ProfileSection({ profile }: Props) {
  if (!profile) return null;

  const bullets = profile.bullets?.filter(
    (bullet: string | null): bullet is string => Boolean(bullet)
  );

  return (
    <section className="w-full" id="perfil">
      <div className="w-full flex flex-col items-center justify-center py-16 lg:py-[64px]">
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center p-6 md:p-[40px] gap-8 rounded-[8px]">

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

          <div className="flex flex-col gap-6 items-start w-full max-w-[520px]">
            <div className="flex flex-col">

              {profile.kicker && (
                <p className="text-size-body-xs font-secondary text-fg-body-subtle tracking-wider font-bold">
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

            {profile.connector && (
              <p className="text-size-body-xs font-secondary text-fg-body-subtle tracking-wider font-bold">
                {profile.connector}
              </p>
            )}

            {bullets?.length ? (
              <ul className="list-none lg:flex lg:flex-col lg:gap-2">
                {bullets.map((bullet: string, index: number) => (
                  <li
                    key={index}
                    className="text-fg-body relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}