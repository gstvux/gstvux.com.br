import { useTina } from "tinacms/dist/react";

/**
 * Adaptador mínimo do useTina.
 *
 * Em desenvolvimento: delega ao useTina (subscription WebSocket do TinaCMS).
 * Em produção: retorna props.data diretamente (sem TinaCMS conectado).
 *
 * A proteção contra flicker é feita na origem: unstable_noStore() no Server
 * Component garante que, após HMR reload do preview, o Next.js executa o
 * Server Component com dados sempre frescos do TinaCMS local — sem cache.
 */
export function useMaybeTina<T extends object>(props: {
  query: string;
  variables: any;
  data: T;
}) {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_TINA_ADMIN === "true";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = isDev ? useTina(props) : { data: props.data };

  return { data };
}
