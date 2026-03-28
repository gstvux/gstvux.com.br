import { Collection } from "tinacms";
import React from "react";

/**
 * A simple read-only text component for TinaCMS
 */
const ReadOnlyField = (props: any) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {props.field.label}
      </label>
      <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200 font-mono break-all">
        {props.input.value || "(vazio)"}
      </div>
    </div>
  );
};

export const cvCollection: Collection = {
  name: "cv",
  label: "Currículo",
  path: "src/content/global",
  format: "json",
  match: {
    include: "cv",
  },
  ui: {
    global: true,
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "image",
      name: "file",
      label: "Arquivo do CV (PDF)",
      description: "Faça o upload do novo PDF aqui. Depois, execute 'pnpm cv:publish' no terminal.",
    },
    {
      type: "boolean",
      name: "isMajorUpdate",
      label: "Major Update?",
      description: "Ative se esta for uma mudança estrutural importante (v1.x -> v2.0).",
    },
    {
      type: "string",
      name: "language",
      label: "Idioma",
      options: [
        { label: "Português (pt-BR)", value: "pt-BR" },
        { label: "Inglês (en)", value: "en" },
      ],
    },
    {
      type: "string",
      name: "publicMeta",
      label: "Metadados Públicos",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
    {
      type: "string",
      name: "version",
      label: "Versão Atual",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
    {
      type: "string",
      name: "href",
      label: "Link Final (Public)",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
    {
      type: "string",
      name: "updatedAt",
      label: "Última Atualização",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
    {
      type: "string",
      name: "extension",
      label: "Extensão",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
    {
      type: "string",
      name: "format",
      label: "Formato",
      ui: {
        component: ReadOnlyField,
      } as any,
    },
  ],
};
