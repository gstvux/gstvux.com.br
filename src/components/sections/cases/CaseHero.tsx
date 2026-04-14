"use client";

import { Search } from "lucide-react";
import { CaseBaseInfo } from "@/src/types/cases";
import { TinaMarkdown } from "tinacms/dist/rich-text";

interface CaseHeroProps {
  caseData: CaseBaseInfo;
  taxonomy: string[];
  responsibilities: string[];
  onOpenModal: (index: number) => void;
}

export function CaseHero({ caseData, taxonomy, responsibilities, onOpenModal }: CaseHeroProps) {
  return (
    <section className="bg-gradient-default">
      <div className="mx-auto px-6 lg:px-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-12 lg:pt-24 pb-16">
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex flex-col gap-3">
            <h1 className="font-primary text-fg-heading text-size-title leading-title font-bold tracking-tight">
              {caseData.title}
            </h1>
            {taxonomy.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {taxonomy.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full border border-badge-border text-fg-body font-utils text-size-body-xs tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-size-body-xs font-utils text-fg-body-subtle py-3 border-y border-fg-section-separator">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span>Cliente: <strong className="text-fg-body">{caseData.client || "Nome do Cliente"}</strong></span>
              <span>Parceiro: <strong className="text-fg-body">{caseData.partner || "Nome do Parceiro"}</strong></span>
              <span>Ano: <strong className="text-fg-body">{caseData.year || "Ano Base"}</strong></span>
            </div>
            <div className="w-full">
              Stack: <strong className="text-fg-body">{caseData.stack || "Tecnologias, Ferramentas"}</strong>
            </div>
          </div>

          {/* Context remains if available */}
          {(caseData as any).context && (
            <div className="text-fg-body text-size-body leading-body rich-text-content">
              <TinaMarkdown content={(caseData as any).context} />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <h3 className="text-size-body-xs font-secondary text-fg-body-subtle tracking-wider font-bold">Responsabilidades:</h3>
            <ul className="list-none flex flex-col gap-1">
              {(responsibilities.length > 0 ? responsibilities : ["research", "information-architecture", "prototyping"]).map((r, i) => (
                <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg flex items-center gap-2 text-fg-body text-size-body">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Hero Image (Right Side) */}
        <div className="w-full lg:sticky lg:top-32 order-1 lg:order-2">
          <button
            onClick={() => onOpenModal(0)}
            className="w-full rounded-2xl bg-surface-inverse aspect-video lg:aspect-square flex items-center justify-center relative group focus:outline-none focus:ring-2 focus:ring-fg-heading"
            aria-label="Ver imagem da capa ampliada"
          >
            {caseData.thumbnail ? (
              <img src={caseData.thumbnail} alt={caseData.title} className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
            ) : (
              <div className="w-full h-full bg-slate-800" />
            )}

            {/* Hover Overlay with Magnifying Glass */}
            <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center">
              <div className="size-12 rounded-full bg-cta-bg text-cta-fg flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                <Search size={24} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
