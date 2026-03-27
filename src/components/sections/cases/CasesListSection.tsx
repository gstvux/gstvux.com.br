"use client";

import { useState, useMemo } from "react";
import { CaseCard } from "./CaseCard";

type CaseItem = {
  slug: string;
  title: string;
  thumbnail: string;
  taxonomy?: string[] | null;
  responsibilities?: string[] | null;
  context?: string | null;
};

type Props = {
  title: string;
  cases: CaseItem[];
};

export function CasesListSection({ title, cases }: Props) {

  const [activeTaxonomy, setActiveTaxonomy] = useState<string>("Todos");

  const taxonomies = useMemo(() => {
    const allTaxonomies = new Set<string>();
    cases.forEach((c) => {
      if (c.taxonomy) {
        c.taxonomy.filter(Boolean).forEach((t) => allTaxonomies.add(t as string));
      }
    });
    return ["Todos", ...Array.from(allTaxonomies).sort()];
  }, [cases]);

  const filteredCases = useMemo(() => {
    if (activeTaxonomy === "Todos") return cases;
    return cases.filter((c) => c.taxonomy?.includes(activeTaxonomy));
  }, [cases, activeTaxonomy]);

  return (
    <section className="w-full bg-page py-16 lg:py-24">
      <div className="mx-auto px-6 lg:px-10 w-full max-w-7xl flex flex-col items-start gap-6">
        <h1 className="font-primary text-fg-heading text-size-title font-bold tracking-tight">
          {title}
        </h1>


        {/* Taxonomies Filter */}
        <div className="w-full flex justify-start items-center gap-2 flex-wrap">
          {taxonomies.map((tax) => (
            <button
              key={tax}
              onClick={() => setActiveTaxonomy(tax)}
              className={`px-3 py-1 rounded-full text-size-body font-utils transition-colors duration-200 border ${activeTaxonomy === tax
                ? "border-badge-border text-fg-heading bg-transparent"
                : "border-fg-section-separator text-fg-body hover:border-badge-border hover:text-fg-heading bg-transparent"
                }`}
            >
              {tax}
            </button>
          ))}
        </div>

        <div className="text-fg-body font-utils text-size-body-xs tracking-wider mb-8">
          {filteredCases.length} {filteredCases.length === 1 ? "Case" : "Cases"}
        </div>

        {/* Grid */}
        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {filteredCases.map((c) => {
              return (
                <CaseCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.title}
                  thumbnail={c.thumbnail}
                  context={c.context}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full py-32 text-center flex flex-col items-center justify-center border border-dashed border-fg-section-separator rounded-3xl bg-surface-inverse/20 px-8">
            <div className="mb-4 text-4xl opacity-50 select-none">🔍</div>
            <p className="text-fg-heading text-lg font-primary font-bold">Nenhum case encontrado para o filtro "{activeTaxonomy}"</p>
            <p className="text-fg-body mt-2 max-w-sm">Tente selecionar outra categoria ou limpe os filtros para ver todos os projetos.</p>
            <button
              onClick={() => setActiveTaxonomy("Todos")}
              className="mt-8 px-6 py-2 rounded-full bg-fg-heading text-bg-surface font-utils text-size-body-xs font-bold hover:opacity-90 transition-opacity"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
