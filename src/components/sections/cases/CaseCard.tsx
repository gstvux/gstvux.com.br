import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export type CaseCardProps = {
  slug: string;
  title: string;
  thumbnail: string;
  context?: any | null;
};

export function CaseCard({ slug, title, thumbnail, context }: CaseCardProps) {
  return (
    <article className="group flex flex-col gap-4">
      <Link href={`/cases/${slug}`} className="relative block w-full aspect-4/3 rounded-2xl bg-surface-inverse" title="Explorar solução">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-col gap-1 mt-2">
        <h3 className="font-primary text-fg-heading text-size-title-sm font-bold leading-title">
          <Link href={`/cases/${slug}`} className="hover:underline focus:outline-none">
            {title}
          </Link>
        </h3>
        {context && (
          <div className="text-fg-body text-size-body line-clamp-2 leading-body rich-text-content">
            <TinaMarkdown content={context} />
          </div>
        )}
      </div>
    </article>
  );
}
