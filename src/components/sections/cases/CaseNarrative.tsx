import { CaseNarrativeData } from "@/src/types/cases";

interface Props {
  data: CaseNarrativeData;
}

export function CaseNarrative({ data }: Props) {
  const { problem, challenge, solution, constraints = [], interventions = [], outcomes = [] } = data;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Problema</h2>
        <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
          {problem || "O site apresentava problemas críticos de performance e organização da informação..."}
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
          {challenge || "Reestruturar um site com conteúdo denso e desorganizado sem comprometer a integridade..."}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-primary text-fg-heading text-size-title-sm font-bold">Solução</h2>
        <p className="text-fg-body text-size-body leading-body whitespace-pre-wrap">
          {solution || "Foi proposta a reconstrução do site utilizando abordagem de entrega estática, aliada a uma nova arquitetura de informação..."}
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
  );
}
