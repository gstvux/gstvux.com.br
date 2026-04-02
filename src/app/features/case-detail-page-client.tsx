"use client";

import { useState } from "react";
import { useMaybeTina } from "@/src/hooks/use-tina-data";
import type { CasesQuery, CasesQueryVariables } from "@/tina/__generated__/types";

import { CaseHero } from "@/src/components/sections/cases/CaseHero";
import { CaseNarrative } from "@/src/components/sections/cases/CaseNarrative";
import { CaseGalleryGrid } from "@/src/components/sections/cases/CaseGalleryGrid";
import { CaseImageModal } from "@/src/components/sections/cases/CaseImageModal";
import { GalleryItem, CaseNarrativeData } from "@/src/types/cases";

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

  // Data preparation
  const taxonomy = (caseData.taxonomy || []).filter(Boolean) as string[];
  const responsibilities = (caseData.responsibilities || []).filter(Boolean) as string[];
  const baseGallery = (caseData.gallery || []).filter(Boolean) as GalleryItem[];

  const gallery: GalleryItem[] = [
    ...(caseData.thumbnail ? [{ image: caseData.thumbnail, alt: caseData.title, kind: "Capa" }] : []),
    ...baseGallery
  ];

  const narrative: CaseNarrativeData = {
    problem: caseData.problem,
    challenge: caseData.challenge,
    solution: caseData.solution,
    constraints: (caseData.constraints || []).filter(Boolean) as string[],
    interventions: (caseData.interventions || []).filter(Boolean) as string[],
    outcomes: (caseData.outcomes || []).filter(Boolean) as string[],
  };

  // Handlers
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
      
      {/* SECTION 1: HERO */}
      <CaseHero 
        caseData={caseData as any} 
        taxonomy={taxonomy} 
        responsibilities={responsibilities} 
        onOpenModal={openModal} 
      />

      {/* SECTION 2: DEVELOPMENT (Narrative + Gallery) */}
      <section className="w-full pt-16">
        <div className="mx-auto px-6 lg:px-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          <CaseNarrative data={narrative} />

          <CaseGalleryGrid 
            gallery={baseGallery} 
            hasThumbnail={!!caseData.thumbnail} 
            onOpenModal={openModal} 
          />

        </div>
      </section>

      {/* MODAL / CAROUSEL */}
      <CaseImageModal 
        isOpen={activeImageIdx !== null}
        gallery={gallery}
        activeIdx={activeImageIdx}
        onClose={closeModal}
        onPrev={handlePrev}
        onNext={handleNext}
      />

    </article>
  );
}
