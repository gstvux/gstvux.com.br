export function TransitionSection() {
  return (
    <section className="w-full py-16 lg:py-24" id="trajetoria">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-8">

        <div className="border-t border-fg-section-separator mb-12 lg:mb-16" />

        <div className="flex flex-col gap-8 max-w-[680px]">

          <p className="text-size-body-xs font-secondary text-fg-body-subtle tracking-wider font-bold uppercase">
            Trajetória
          </p>

          <h2 className="font-primary text-size-title font-bold leading-title text-fg-heading">
            De designer de sistemas a arquiteto de processos.
          </h2>

          <div className="flex flex-col gap-5 font-secondary text-size-body leading-normal text-fg-body">
            <p>
              Por anos, projetei interfaces para empresas como Cisco, VMware e Dell.
              Aprendi a pensar em fluxo, mapear atrito e estruturar soluções que times conseguem manter.
            </p>
            <p>
              Em determinado ponto, o maior ganho deixou de estar na tela —
              e passou a estar no processo por trás dela.
            </p>
            <p>Comecei a automatizar o que eu documentava.</p>
            <p>
              Robôs eliminando tarefas manuais.
              Integrações conectando sistemas que nunca conversaram.
              Fluxos rodando sem depender de clique humano.
            </p>
            <p className="text-fg-heading font-bold">
              Hoje projeto e implemento automações que reduzem custo operacional,
              eliminam erros e escalam sem aumentar headcount.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
