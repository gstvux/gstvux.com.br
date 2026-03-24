import { CmsIcon } from "@/src/components/ui/icon/CmsIcon";

type ProcessCard = {
  icon?: string | null;
  title?: string | null;
  description?: string | null;
};

type ProcessSectionProps = {
  process?: {
    title?: string | null;
    description?: string | null;
    cards?: Array<ProcessCard | null> | null;
    badges?: Array<{
      icon?: string | null;
      label?: string | null;
    } | null> | null;
  };
};

export function ProcessSection({ process }: ProcessSectionProps) {
  if (!process) return null;

  const duplicatedBadges = process.badges ? [...process.badges, ...process.badges, ...process.badges, ...process.badges, ...process.badges, ...process.badges] : [];

  return (
    <section className="w-full bg-page-subtle py-12 overflow-hidden relative">

      <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-[24px] text-center items-center mb-[48px] max-w-[512px] mx-auto">
          {process.title && (
            <h2 className="font-primary text-[32px] font-bold leading-normal text-(--color-ember-400,#ca8100)">
              {process.title}
            </h2>
          )}
          {process.description && (
            <p className="font-secondary text-[16px] leading-normal text-(--color-bluepetro-50,#eef2f7)">
              {process.description}
            </p>
          )}
        </div>

        {/* Cards Wrapper */}
        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-12 items-stretch justify-center w-full mb-[48px]">
          {process.cards?.map((card, i) => {
            if (!card) return null;

            return (
              <div key={i} className="flex flex-col gap-6 sm:flex-row items-center sm:items-start overflow-clip w-full md:w-[384px] shrink-0">
                <div className="relative w-[64px] h-[64px] shrink-0 mb-4 sm:mb-0">
                  {/* Squircle SVG Frame Absolute Background */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none" className="w-[63px] h-[63px]">
                      <path d="M28.6621 1.53325C30.3773 0.822791 32.3043 0.822791 34.0195 1.53325L50.5244 8.36919C52.2394 9.07964 53.602 10.4423 54.3125 12.1573L61.1484 28.6622C61.8589 30.3774 61.8589 32.3044 61.1484 34.0196L54.3125 50.5245C53.602 52.2394 52.2394 53.6021 50.5244 54.3125L34.0195 61.1485C32.3043 61.8589 30.3773 61.8589 28.6621 61.1485L12.1572 54.3125C10.4422 53.6021 9.07959 52.2394 8.36914 50.5245L1.5332 34.0196C0.822746 32.3044 0.822745 30.3774 1.5332 28.6622L8.36914 12.1573C9.07959 10.4423 10.4422 9.07964 12.1572 8.36919L28.6621 1.53325Z" stroke="url(#paint0_linear_3195_59)" strokeWidth="2" />
                      <defs>
                        <linearGradient id="paint0_linear_3195_59" x1="63.3408" y1="31.3409" x2="-0.65918" y2="31.3409" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#A6577C" />
                          <stop offset="1" stopColor="#627FA9" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Real Icon rendered in front of the squircle */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
                    {card.icon && <CmsIcon svg={card.icon} className="w-[32px] h-[32px] text-fg-body" />}
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left leading-normal">
                  {card.title && (
                    <p className="text-trim-cap font-primary text-size-title-sm font-bold text-(--color-ember-400) w-full block">
                      {card.title}
                    </p>
                  )}
                  {card.description && (
                    <p className="font-secondary text-size-body text-fg-body tracking-[-0.32px] w-full block">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Badges Marquee */}
      {process.badges && process.badges.length > 0 && (
        <div className="relative w-full overflow-hidden mt-[16px]">

          {/* Fade left */}
          <div className="absolute left-0 top-0 bottom-0 w-[112px] bg-linear-to-r from-(--color-bluepetro-800) to-transparent z-10 pointer-events-none" />

          {/* Fade right */}
          <div className="absolute right-0 top-0 bottom-0 w-[112px] bg-linear-to-l from-(--color-bluepetro-800) to-transparent z-10 pointer-events-none" />

          {/* Wrapper */}
          <div className="flex w-[200%] overflow-hidden py-1">
            <div className="flex gap-[16px] items-center animate-slide-right whitespace-nowrap">
              {duplicatedBadges.map((badge, j) => {
                if (!badge) return null;
                return (
                  <div key={j} className="flex gap-[8px] items-center justify-center px-[12px] py-[8px] bg-(--color-bluepetro-900,#0c1625) border border-(--color-bluepetro-500,#1f3a5f) rounded-[8px] shrink-0">
                    <div className="flex items-center justify-center w-[16px] h-[16px] shrink-0 overflow-clip">
                      {badge.icon ? (
                        <CmsIcon svg={badge.icon} className="w-[16px] h-[16px] text-(--color-bluepetro-100,#d9e1ec)" />
                      ) : (
                        <svg className="w-[10.5px] h-[8px] text-(--color-bluepetro-100,#d9e1ec)" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10.9789 1.15494C11.2389 1.47463 11.2007 1.94498 10.8935 2.20577L4.77498 7.39736C4.62002 7.52885 4.41708 7.59325 4.2127 7.5776C4.00833 7.56195 3.8202 7.46781 3.69238 7.3144L0.231998 3.16117C-0.0384814 2.8365 -0.0105312 2.36159 0.294371 2.06733C0.599273 1.77307 1.06646 1.82458 1.33694 2.14925L4.30129 5.70678L9.92385 0.933333C10.2311 0.672545 10.7188 0.835245 10.9789 1.15494Z" fill="currentColor" />
                        </svg>
                      )}
                    </div>
                    <p className="font-utils text-[14px] leading-normal text-(--color-bluepetro-100,#d9e1ec) tracking-[-0.56px] whitespace-nowrap">
                      {badge.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
