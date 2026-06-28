import { Reveal } from '@/src/components/ui/Reveal';

export function TransitionSection() {
  return (
    <section className="w-full py-20 lg:py-32 overflow-hidden" id="trajetoria">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

          {/* Left — label + accent line */}
          <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 shrink-0">
            <Reveal direction="fade">
              <p className="font-utils text-size-body-xs text-brand-lime tracking-widest uppercase whitespace-nowrap">
                Trajetória
              </p>
            </Reveal>
            <div
              className="hidden lg:block w-px bg-brand-lime/30 mt-6"
              style={{ height: '320px' }}
              aria-hidden
            />
            <div className="flex lg:hidden flex-1 h-px bg-brand-lime/30" aria-hidden />
          </div>

          {/* Right — content */}
          <div className="flex flex-col gap-8 max-w-[660px]">

            <Reveal direction="up">
              <h2 className="font-primary text-size-title font-bold leading-title text-fg-heading">
                Não fui para automação por acidente.
              </h2>
            </Reveal>

            <div className="flex flex-col gap-5 font-secondary text-size-body leading-normal text-fg-body">

              <Reveal direction="up" delay={80}>
                <p>
                  Por anos, trabalhei no design de sistemas para <span className="text-fg-heading font-semibold">Cisco, VMware e Dell</span>.
                  Aprendi a mapear fluxos, entender por que as pessoas fazem o que fazem e
                  estruturar soluções que times conseguem manter.
                </p>
              </Reveal>

              <Reveal direction="up" delay={160}>
                <p>
                  Em algum momento, os problemas mais críticos deixaram de estar na interface —
                  e passaram a estar no processo por trás dela.
                </p>
              </Reveal>

              <Reveal direction="up" delay={240}>
                <p className="text-fg-heading font-semibold">
                  Comecei a automatizar.
                </p>
              </Reveal>

              <Reveal direction="up" delay={320}>
                <p>
                  Hoje, o background em UX é o que diferencia meu trabalho em automação:
                  entendo o processo do ponto de vista de quem opera, não só de quem o projeta.
                  Isso reduz resistência.{' '}
                  <span className="text-brand-lime font-semibold">Aumenta adoção.</span>
                </p>
              </Reveal>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
