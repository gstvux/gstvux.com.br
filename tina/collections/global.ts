import { Collection } from "tinacms";

export const globalCollection: Collection = {
  name: "global",
  label: "Configurações Globais",
  path: "src/content/global",
  format: "json",
  match: {
    include: "index",
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
      type: "string",
      name: "logoText",
      label: "Logo Text",
      required: true,
    },
    {
      type: "object",
      name: "navItems",
      label: "Navigation Items",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label }),
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Label",
          required: true,
        },
        {
          type: "string",
          name: "href",
          label: "URL",
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        {
          type: "string",
          name: "since",
          label: "Since",
          description: 'Ex: "Desde 2013"',
        },
        {
          type: "string",
          name: "current_year",
          label: "Current Year",
          description: 'Ex: "2024"',
        },
        {
          type: "string",
          name: "availability",
          label: "Availability",
          description: 'Ex: "Disponível para alocação."',
        },
      ],
    },
    {
      type: "object",
      name: "notFound",
      label: "Página 404",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título",
        },
        {
          type: "string",
          name: "message",
          label: "Mensagem",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "buttonLabel",
          label: "Texto do Botão",
        },
      ],
    },
  ],
};
