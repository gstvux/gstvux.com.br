"use client";

import { useState } from "react";
import { useMaybeTina } from "@/src/hooks/use-tina-data";
import type { CasesQuery, CasesQueryVariables } from "@/tina/__generated__/types";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type CaseDetailPageClientProps = {
  data: CasesQuery;
  variables: CasesQueryVariables;
  query: string;
};

export default function CaseDetailPageClient(props: CaseDetailPageClientProps) {
  const { data } = useMaybeTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const caseData = data.cases;
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  if (!caseData) return null;

  const taxonomy = (caseData.taxonomy || []).filter(Boolean) as string[];
  const responsibilities = (caseData.responsibilities || []).filter(Boolean) as string[];
  const stack = caseData.stack || "";
  const constraints = (caseData.constraints || []).filter(Boolean) as string[];
  const outcomes = (caseData.outcomes || []).filter(Boolean) as string[];
  const interventions = (caseData.interventions || []).filter(Boolean) as string[];
  const gallery = (caseData.gallery || []).filter(Boolean) as any[];

  // Interações do modal
  const openModal = (idx: number) => setActiveImageIdx(idx);
  const closeModal = () => setActiveImageIdx(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx(activeImageIdx === 0 ? gallery.length - 1 : activeImageIdx - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIdx === null) return;
    setActiveImageIdx(activeImageIdx === gallery.length - 1 ? 0 : activeImageIdx + 1);
  };

  return (
    <article className="flex-1 w-full bg-page pt-20 pb-24">

      {/* SECTION 1: HERO (Meta Info + Hero Image) */}
      <section className="bg-gradient-default">
        <div className="mx-auto px-6 lg:px-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-12 lg:pt-24 pb-16">

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              {taxonomy.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {taxonomy.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full border border-badge-border text-fg-body font-utils text-size-body-xs tracking-wide">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-primary text-fg-heading text-size-title leading-title font-bold tracking-tight">
                {caseData.title}
              </h1>
            </div>


            <div className="flex flex-col gap-2 text-size-body-xs font-utils text-fg-body-subtle py-3 border-y border-fg-section-separator">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <span>Cliente: <strong className="text-fg-body">{caseData.client || "Nome do Cliente"}</strong></span>
                <span>Parceiro: <strong className="text-fg-body">{caseData.partner || "Nome do Parceiro"}</strong></span>
                <span>Ano: <strong className="text-fg-body">{caseData.year || "Ano Base"}</strong></span>
              </div>
              <div className="w-full">
                Stack: <strong className="text-fg-body">{stack || "Tecnologias, Ferramentas"}</strong>
              </div>
            </div>

            {(caseData.context || "Mocked context paragraph to represent case background and strategy overview.") && (
              <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
                {caseData.context || "Projeto de reestruturação do site institucional de uma consultoria estratégica com foco em reposicionamento digital... O site anterior concentrava grande volume de conteúdo acumulado ao longo dos anos, com baixa padronização."}
              </p>
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
          <div className="w-full lg:sticky lg:top-32">
            <div className="w-full rounded-2xl overflow-hidden bg-surface-inverse aspect-video lg:aspect-square flex items-center justify-center relative">
              {caseData.thumbnail ? (
                <img src={caseData.thumbnail} alt={caseData.title} className="absolute inset-0 w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full bg-slate-800" />
              )}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: DEVELOPMENT (Narrative + Gallery Grid) */}
      <section className="w-full pt-16">
        <div className="mx-auto px-6 lg:px-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* Narrative Text */}
          <div className="flex flex-col gap-12">

            <div className="flex flex-col gap-4">
              <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Problema</h2>
              <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
                {caseData.problem || "O site apresentava problemas críticos de performance e organização da informação..."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Restrições</h2>
              <ul className="list-none flex flex-col gap-1">
                {(constraints.length > 0 ? constraints : ["Grande volume de conteúdo legado", "Necessidade de preservar identidade", "Limitação de tempo de entrega"]).map((c, i) => (
                  <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg flex items-start gap-3 text-fg-body text-size-body leading-body">
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Desafio</h2>
              <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
                {caseData.challenge || "Reestruturar um site com conteúdo denso e desorganizado sem comprometer a integridade..."}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Solução</h2>
              <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
                {caseData.solution || "Foi proposta a reconstrução do site utilizando abordagem de entrega estática, aliada a uma nova arquitetura de informação..."}
              </p>
            </div>

            {interventions.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Intervenções</h2>
                <ul className="list-none flex flex-col gap-1">
                  {interventions.map((c, i) => (
                    <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg flex items-start gap-3 text-fg-body text-size-body leading-body">
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {outcomes.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Resultados</h2>
                <ul className="flex flex-col gap-3">
                  {outcomes.map((c, i) => (
                    <li key={i} className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[0.785em] before:size-2 before:-translate-y-1/2 before:rounded-r-sm before:bg-bullet-fg flex items-start gap-3 text-fg-body text-size-body leading-body">

                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4 auto-rows-max lg:sticky lg:top-32">
            {gallery.length > 0 ? gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => openModal(idx)}
                className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-inverse shadow-sm group relative focus:outline-none focus:ring-2 focus:ring-fg-heading"
                aria-label={`Ver imagem ${idx + 1} ampliada`}
              >
                {img.image ? (
                  <img src={img.image} alt={img.alt || `Gallery Image ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-slate-800/40 flex items-center justify-center text-fg-body-dimmed text-[10px] text-center uppercase tracking-widest font-utils p-2">
                    {img.kind || "Image Placeholder"}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />


              </button>
            )) : (
              // Mock Gallery for viewing layout while it's empty
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-inverse shadow-sm" />
              ))
            )}
          </div>

        </div>
      </section>

      {/* IMAGE DIALOG/CAROUSEL */}
      <Dialog open={activeImageIdx !== null} onClose={closeModal} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-page/95 backdrop-blur-sm transition-opacity" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center relative">

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>

            {/* Prev/Next Controls */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
                  aria-label="Próxima"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Render ACTIVE image */}
            {activeImageIdx !== null && gallery[activeImageIdx] && (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-12">
                {gallery[activeImageIdx].image ? (
                  <img
                    src={gallery[activeImageIdx].image}
                    alt={gallery[activeImageIdx].alt || "Galeria Expandida"}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full max-w-4xl max-h-[80vh] bg-slate-800/40 rounded-3xl flex items-center justify-center text-fg-body-dimmed font-utils tracking-widest uppercase border border-white/10 shadow-2xl">
                    {gallery[activeImageIdx].kind || "Image Placeholder"}
                  </div>
                )}


                {(gallery[activeImageIdx].caption || gallery[activeImageIdx].kind) && (
                  <p className="mt-4 text-fg-body-dimmed text-sm text-center">
                    {gallery[activeImageIdx].caption || gallery[activeImageIdx].kind}
                  </p>
                )}
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

    </article>
  );
}
