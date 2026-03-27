import { useState, useEffect, useRef } from "react";
import { useTina } from "tinacms/dist/react";

/**
 * Um wrapper para o hook useTina que implementa um "Persistence Lock".
 * Resolve o problema de "flicker" no Next.js 15 ao salvar, onde o servidor 
 * envia dados do cache antes de terminar o refresh completo.
 */
export function useMaybeTina<T extends object>(props: {
  query: string;
  variables: any;
  data: T;
}) {
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_TINA_ADMIN === "true";

  // O hook useTina oficial lida com o preview live
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: tinaData } = isDev ? useTina(props) : { data: props.data };

  // Estado que realmente entregamos para a UI
  const [shieldedData, setShieldedData] = useState<T>(tinaData);
  
  // Ref para rastrear o momento da última alteração via CMS
  const lastUpdateRef = useRef<number>(0);
  
  // Sincroniza o estado live do Tina com o nosso escudo
  useEffect(() => {
    if (isDev) {
      setShieldedData(tinaData);
      lastUpdateRef.current = Date.now();
    }
  }, [tinaData, isDev]);

  // Lógica de Bloqueio de Sincronização (Anti-Flicker)
  useEffect(() => {
    if (!isDev) {
      setShieldedData(props.data);
      return;
    }

    // Se as props do servidor mudaram, verificamos se foi "muito cedo"
    // (provavelmente um refresh de cache obsoleto do Next.js)
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    // Se o servidor atualizar em menos de 4000ms após nossa última edição,
    // nós ignoramos os dados do servidor e confiamos no tinaData.
    if (timeSinceLastUpdate < 4000) {
      console.warn(`[Tina-Anti-Flicker] Ignorando server-data obsoleto (bloqueado por ${4000 - timeSinceLastUpdate}ms)`);
      return;
    }

    // Se já passou o tempo de segurança, aceitamos os dados do servidor como base.
    console.log("[Tina-Anti-Flicker] Aceitando server-data (refresh completo)");
    setShieldedData(props.data);
  }, [props.data, isDev]);

  return { data: shieldedData };
}
