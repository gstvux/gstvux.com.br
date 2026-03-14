import Link from "next/link";
import type { HomePageData } from "@/lib/content/types";

type Props = {
  cta?: HomePageData["cta"];
};

export function CtaSection({ cta }: Props) {
  if (!cta) return null;

  return (
    <section>
      {cta.title && <h2>{cta.title}</h2>}
      {cta.body && <p>{cta.body}</p>}
      {cta.buttonLabel && cta.buttonHref && (
        <Link href={cta.buttonHref}>{cta.buttonLabel}</Link>
      )}
    </section>
  );
}