"use client";

import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryItem } from "@/src/types/cases";

interface CaseImageModalProps {
  isOpen: boolean;
  gallery: GalleryItem[];
  activeIdx: number | null;
  onClose: () => void;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

export function CaseImageModal({
  isOpen,
  gallery,
  activeIdx,
  onClose,
  onPrev,
  onNext,
}: CaseImageModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-page/95 backdrop-blur-sm transition-opacity" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>

          {/* Prev/Next Controls */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-surface/50 hover:bg-surface text-fg-body hover:text-fg-heading transition-colors"
                aria-label="Próxima"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Render ACTIVE image or embed */}
          {activeIdx !== null && gallery[activeIdx] && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12">
              {gallery[activeIdx].kind === "embed" && gallery[activeIdx].embed ? (
                <div
                  className="w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center bg-black/20 rounded-xl overflow-hidden shadow-2xl [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-none"
                  dangerouslySetInnerHTML={{ __html: gallery[activeIdx].embed }}
                />
              ) : gallery[activeIdx].image ? (
                <img
                  src={gallery[activeIdx].image}
                  alt={gallery[activeIdx].alt || "Galeria Expandida"}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <div className="w-full h-full max-w-4xl max-h-[80vh] bg-slate-800/40 rounded-3xl flex items-center justify-center text-fg-body-dimmed font-utils tracking-widest uppercase border border-white/10 shadow-2xl">
                  {gallery[activeIdx].kind || "Image Placeholder"}
                </div>
              )}

              {(gallery[activeIdx].caption || gallery[activeIdx].kind || gallery[activeIdx].alt) && (
                <p className="mt-4 text-fg-body-dimmed text-sm text-center">
                  {gallery[activeIdx].caption ||
                    (gallery[activeIdx].kind
                      ? `${gallery[activeIdx].kind}${gallery[activeIdx].alt ? `: ${gallery[activeIdx].alt}` : ""}`
                      : gallery[activeIdx].alt)}
                </p>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
