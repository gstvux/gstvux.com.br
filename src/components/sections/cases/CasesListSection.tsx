"use client";

import { useState, useMemo } from "react";
import { CaseCard } from "./CaseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

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
  const [currentPage, setCurrentPage] = useState(1);

  const handleTaxonomyChange = (tax: string) => {
    setActiveTaxonomy(tax);
    setCurrentPage(1);
  };

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

  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCases = filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const emptySlotsCount = ITEMS_PER_PAGE - currentCases.length;

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
              onClick={() => handleTaxonomyChange(tax)}
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
          <div className="flex flex-col gap-12 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
              {currentCases.map((c) => (
                <CaseCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.title}
                  thumbnail={c.thumbnail}
                  context={c.context}
                />
              ))}

              {emptySlotsCount > 0 && Array.from({ length: emptySlotsCount }).map((_, index) => (
                <div key={`empty-${index}`} className="flex flex-col gap-4">
                  <div className="w-full aspect-4/3 rounded-2xl bg-page-subtle border-2 border-dotted border-fg-section-separator flex items-center justify-center opacity-40">
                    <div className="w-12 h-12 rounded-full bg-surface/10 border border-fg-section-separator" />
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    {/* Skeleton: Título */}
                    <div className="h-6 w-2/3 bg-fg-section-separator/50 rounded-md animate-pulse" />
                    
                    {/* Skeleton: Parágrafo (2 linhas) */}
                    <div className="flex flex-col gap-1.5">
                      <div className="h-4 w-full bg-fg-section-separator/30 rounded animate-pulse delay-75" />
                      <div className="h-4 w-5/6 bg-fg-section-separator/30 rounded animate-pulse delay-100" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 pt-8 w-full">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-badge-border text-fg-heading bg-transparent hover:bg-fg-section-separator/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Página anterior"
                >
                  <ChevronLeft size={24} />
                </button>

                <span className="font-utils text-size-body-xs tracking-widest text-fg-body-subtle select-none">
                  <span className="text-fg-heading">{currentPage}</span> / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-badge-border text-fg-heading bg-transparent hover:bg-fg-section-separator/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Próxima página"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full py-32 text-center flex flex-col items-center justify-center border border-dashed border-fg-section-separator rounded-3xl bg-surface-inverse/20 px-8">
            <div className="mb-4 text-4xl opacity-50 select-none">🔍</div>
            <p className="text-fg-heading text-lg font-primary font-bold">Nenhum case encontrado para o filtro "{activeTaxonomy}"</p>
            <p className="text-fg-body mt-2 max-w-sm">Tente selecionar outra categoria ou limpe os filtros para ver todos os projetos.</p>
            <button
              onClick={() => handleTaxonomyChange("Todos")}
              className="mt-8 px-6 py-2 rounded-full bg-cta-bg text-cta-fg font-utils text-size-body-xs font-bold hover:opacity-90 transition-opacity"
            >
              Limpar Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
