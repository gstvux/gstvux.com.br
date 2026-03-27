"use client";

import { useMaybeTina } from "@/src/hooks/use-tina-data";
import { ButtonLink } from "../../components/ui/button/ButtonLink";
import { MoveLeft } from "lucide-react";
import type { GlobalQuery } from "@/tina/__generated__/types";

type NotFoundClientProps = {
  query: string;
  variables: any;
  data: GlobalQuery;
};

export default function NotFoundClient(props: NotFoundClientProps) {
  const { data } = useMaybeTina(props);
  const notFound = data.global.notFound;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <h1 className="text-[12rem] font-bold leading-none opacity-15 select-none font-primary">
        404
      </h1>
      <h2 className="text-3xl font-bold mb-4 font-primary text-fg-body">
        {notFound?.title || "Página não encontrada"}
      </h2>
      <p className="max-w-[400px] mb-12 text-fg-body font-secondary leading-relaxed">
        {notFound?.message || "O conteúdo que você procura não existe ou foi movido."}
      </p>

      <ButtonLink
        href="/"
        appearance="primary"
        size="md"
        leadingIcon={<MoveLeft />}
      >
        {notFound?.buttonLabel || "Voltar para a Home"}
      </ButtonLink>
    </div>
  );
}
