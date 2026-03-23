import type { HomePageData } from "@/src/lib/content/types";

type Props = {
  intro?: HomePageData["intro"];
};

export function IntroSection({ intro }: Props) {
  if (!intro) return null;

  return (
    <section>
      {intro.kicker && <p>{intro.kicker}</p>}
      {intro.headline && <h2>{intro.headline}</h2>}
      {intro.body && <p>{intro.body}</p>}
    </section>
  );
}