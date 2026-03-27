import { useTina } from "tinacms/dist/react";

/**
 * Um wrapper para o hook useTina que permite desativar o runtime do Tina em produção
 * e garante o "two-way data binding" em desenvolvimento.
 */
export function useMaybeTina<T extends object>(props: {
  query: string;
  variables: any;
  data: T;
}) {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_TINA_ADMIN === "true";

  // Em desenvolvimento, o useTina é o responsável por sincronizar os dados.
  // Ele lida internamente com o estado de preview e o two-way binding.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const tina = isDev ? useTina(props) : { data: props.data };

  return { data: tina.data };
}
