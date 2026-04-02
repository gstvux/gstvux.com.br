"use client";

import { Search, Code } from "lucide-react";
import { GalleryItem } from "@/src/types/cases";

interface CaseGalleryGridProps {
  gallery: GalleryItem[];
  hasThumbnail: boolean;
  onOpenModal: (index: number) => void;
}

export function CaseGalleryGrid({ gallery, hasThumbnail, onOpenModal }: CaseGalleryGridProps) {
  if (gallery.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 auto-rows-max lg:sticky lg:top-32">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="w-full aspect-square rounded-2xl overflow-hidden bg-surface-inverse shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 auto-rows-max lg:sticky lg:top-32">
      {gallery.map((img, idx) => {
        const modalIdx = hasThumbnail ? idx + 1 : idx;
        return (
          <button
            key={idx}
            onClick={() => onOpenModal(modalIdx)}
            className="w-full aspect-square rounded-2xl bg-surface-inverse shadow-sm group relative focus:outline-none focus:ring-2 focus:ring-fg-heading overflow-hidden"
            aria-label={`Ver ${img.kind || 'imagem'} ${idx + 1} ampliada`}
          >
            {img.image ? (
              <img src={img.image} alt={img.alt || `Gallery Image ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            ) : img.kind === 'embed' ? (
              <div className="absolute inset-0 w-full h-full bg-linear-to-br from-surface-inverse/20 to-surface-inverse/5 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center transition-all duration-300 group-hover:bg-surface-inverse/10">
                <Code size={24} className="text-fg-body-subtle mb-3 opacity-70" />
                <span className="text-[10px] font-utils text-fg-body-subtle uppercase tracking-[0.15em] leading-tight">
                  {img.kind}{img.alt ? `: ${img.alt}` : ''}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full bg-slate-800/40 flex items-center justify-center text-fg-body-dimmed text-[10px] text-center uppercase tracking-widest font-utils p-2">
                {img.kind || "Image Placeholder"}
              </div>
            )}
            <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center">
              <div className="size-12 rounded-full bg-cta-bg text-cta-fg flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                <Search size={24} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
