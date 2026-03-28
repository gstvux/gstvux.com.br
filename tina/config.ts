import { defineConfig } from "tinacms";
import { IconSvgTextareaField } from "./fields/IconSvgTextareaField";
import { TitleField, ReadOnlyField } from "./fields/TitleField";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const iconSvgTextareaComponent =
  IconSvgTextareaField as unknown as string;

const titleComponent = TitleField as unknown as string;
const readOnlyComponent = ReadOnlyField as unknown as string;

function createInlineSvgField(name: string, label: string) {
  return {
    type: "string",
    name,
    label,
    ui: {
      component: iconSvgTextareaComponent,
    },
  } as const;
}

function createIconPositionField(name: string, label: string) {
  return {
    type: "string",
    name,
    label,
    options: [
      { label: "Leading", value: "leading" },
      { label: "Trailing", value: "trailing" },
    ],
    ui: {
      component: "select",
    },
  } as const;
}

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "global",
        label: "Configurações Globais",
        path: "src/content/global",
        format: "json",
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
      },
      {
        label: "Pages",
        name: "page",
        path: "src/content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            if (document._sys.filename === "home") return `/`;
            // Retorna undefined para a página de cases para evitar redirect loop
            // causado por conflito entre a coleção 'cases' e a rota '/cases'.
            // O formulário de edição continua funcionando normalmente.
            if (document._sys.filename === "cases") return undefined;
            return `/${document._sys.filename}`;
          },
        },
        templates: [
          {
            name: "home",
            label: "Home Page",
            fields: [
              {
                type: "object",
                label: "SEO",
                name: "seo",
                fields: [
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                    required: true,
                  },
                  {
                    type: "string",
                    label: "Description",
                    name: "description",
                  },
                ],
              },
              {
                type: "object",
                label: "Hero",
                name: "hero",
                fields: [
                  {
                    type: "object",
                    label: "Eyebrow",
                    name: "eyebrow",
                    fields: [
                      {
                        type: "string",
                        label: "Icon",
                        name: "icon",
                      },
                      {
                        type: "string",
                        label: "Text",
                        name: "text",
                      },
                    ],
                  },
                  {
                    type: "image",
                    name: "imageSrc",
                    label: "Imagem do Media Frame",
                  },
                  {
                    type: "string",
                    name: "imageAlt",
                    label: "Texto alternativo",
                  },
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                    required: true,
                  },
                  {
                    type: "string",
                    label: "Subtitle",
                    name: "subtitle",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    label: "Description",
                    name: "description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    label: "Bullets",
                    name: "bullets",
                    list: true,
                  },
                  {
                    type: "string",
                    label: "Primary CTA Label",
                    name: "primaryCtaLabel",
                  },
                  {
                    type: "string",
                    label: "Primary CTA Href",
                    name: "primaryCtaHref",
                  },
                  createInlineSvgField("primaryCtaSvg", "Primary CTA SVG"),
                  createIconPositionField("primaryCtaIconPosition", "Primary CTA Icon Position"),
                  {
                    type: "string",
                    label: "Secondary CTA Label",
                    name: "secondaryCtaLabel",
                  },
                  {
                    type: "string",
                    label: "Secondary CTA Href",
                    name: "secondaryCtaHref",
                  },
                  createInlineSvgField("secondaryCtaSvg", "Secondary CTA SVG"),
                  createIconPositionField("secondaryCtaIconPosition", "Secondary CTA Icon Position"),
                  {
                    type: "string",
                    label: "WhatsApp Label",
                    name: "whatsappLabel",
                  },
                  {
                    type: "string",
                    label: "WhatsApp Href",
                    name: "whatsappHref",
                  },
                  createInlineSvgField("whatsappSvg", "WhatsApp SVG"),
                  createIconPositionField("whatsappIconPosition", "WhatsApp Icon Position"),
                  {
                    type: "object",
                    name: "contactBar",
                    label: "Contact Bar",
                    fields: [
                      {
                        type: "string",
                        name: "locationText",
                        label: "Location",
                      },
                      {
                        type: "string",
                        name: "workmodeText",
                        label: "Work Mode",
                      },
                      {
                        type: "string",
                        name: "linkedinText",
                        label: "LinkedIn Label",
                      },
                      {
                        type: "string",
                        name: "linkedinHref",
                        label: "LinkedIn URL",
                      },
                      {
                        type: "string",
                        name: "email",
                        label: "Email",
                      },
                      {
                        type: "boolean",
                        name: "showTimezone",
                        label: "Show Timezone",
                      },
                      {
                        type: "string",
                        name: "timezoneLabel",
                        label: "Timezone Label",
                      },
                      {
                        type: "string",
                        name: "timezoneId",
                        label: "Timezone ID",
                      }
                    ],
                  }
                ],
              },
              {
                type: "object",
                label: "Profile",
                name: "profile",
                fields: [
                  {
                    type: "image",
                    name: "imageSrc",
                    label: "Imagem do Perfil",
                  },
                  {
                    type: "string",
                    name: "imageAlt",
                    label: "Texto Alternativo",
                  },
                  {
                    type: "string",
                    label: "Kicker",
                    name: "kicker",
                  },
                  {
                    type: "string",
                    label: "Headline",
                    name: "headline",
                  },
                  {
                    type: "string",
                    label: "Body",
                    name: "body",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
              {
                type: "object",
                label: "Cases Overview",
                name: "cases_overview",
                fields: [
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                  },
                  {
                    type: "string",
                    label: "Lede",
                    name: "lede",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    label: "Proof Line",
                    name: "proof_line",
                  },
                  {
                    type: "object",
                    label: "CTA",
                    name: "cta",
                    fields: [
                      {
                        type: "string",
                        label: "Label",
                        name: "label",
                      },
                      {
                        type: "string",
                        label: "Link",
                        name: "link",
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                label: "Featured Cases",
                name: "featured_cases",
                list: true,
                fields: [
                  {
                    type: "reference",
                    name: "case",
                    label: "Case",
                    collections: ["cases"],
                  }
                ]
              },
              {
                type: "object",
                label: "Process",
                name: "process",
                fields: [
                  {
                    type: "string",
                    label: "Title",
                    name: "title",
                  },
                  {
                    type: "string",
                    label: "Description",
                    name: "description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "object",
                    label: "Cards",
                    name: "cards",
                    list: true,
                    fields: [
                      createInlineSvgField("icon", "Icon SVG"),
                      {
                        type: "string",
                        label: "Title",
                        name: "title",
                      },
                      {
                        type: "string",
                        label: "Description",
                        name: "description",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                  {
                    type: "object",
                    label: "Badges",
                    name: "badges",
                    list: true,
                    fields: [
                      createInlineSvgField("icon", "Icon SVG (Optional)"),
                      {
                        type: "string",
                        label: "Label",
                        name: "label",
                      },
                    ],
                  },
                ],
              },
              {
                type: "object",
                label: "Contact",
                name: "contact",
                fields: [
                  {
                    type: "image",
                    name: "imageSrc",
                    label: "Imagem",
                  },
                  {
                    type: "string",
                    name: "imageAlt",
                    label: "Texto Alternativo da Imagem",
                  },
                  {
                    type: "string",
                    label: "Headline",
                    name: "headline",
                  },
                  {
                    type: "string",
                    label: "Body",
                    name: "body",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    label: "Bullets",
                    name: "bullets",
                    list: true,
                  },
                ],
              },
            ],
          },
          {
            name: "cases",
            label: "Cases Page",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "cases",
        label: "Cases",
        path: "src/content/cases",
        format: "md",
        ui: {
          router: ({ document }) => `/cases/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
            ui: {
              component: titleComponent,
            },
          },
          {
            type: "string",
            label: "Slug",
            name: "slug",
            required: true,
            ui: {
                component: readOnlyComponent,
            }
          },
          {
            type: "image",
            label: "Thumbnail",
            name: "thumbnail",
            required: true,
          },
          {
            type: "string",
            label: "Year",
            name: "year",
            options: Array.from(
              { length: new Date().getFullYear() - 2008 + 1 },
              (_, i) => (2008 + i).toString()
            ).reverse(),
            required: true,
          },
          {
            type: "string",
            label: "Client",
            name: "client",
          },
          {
            type: "string",
            label: "Partner",
            name: "partner",
          },
          {
            type: "string",
            label: "Role",
            name: "role",
            list: true,
            required: true,
          },
          {
            type: "string",
            label: "Taxonomy",
            name: "taxonomy",
            list: true,
            required: true,
          },
          {
            type: "string",
            label: "Responsibilities",
            name: "responsibilities",
            list: true,
            required: true,
          },
          {
            type: "string",
            label: "Stack",
            name: "stack",
          },
          {
            type: "string",
            label: "Status",
            name: "status",
            options: ["draft", "ready", "published", "archived"],
          },
          {
            type: "string",
            label: "Context",
            name: "context",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            label: "Problem",
            name: "problem",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            label: "Constraints",
            name: "constraints",
            list: true,
          },
          {
            type: "string",
            label: "Challenge",
            name: "challenge",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            label: "Solution",
            name: "solution",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "string",
            label: "Outcomes",
            name: "outcomes",
            list: true,
          },
          {
            type: "string",
            label: "Strategy",
            name: "strategy",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            label: "Interventions",
            name: "interventions",
            list: true,
          },
          {
            type: "object",
            label: "Gallery",
            name: "gallery",
            list: true,
            fields: [
              {
                type: "image",
                label: "Image",
                name: "image",
              },
              {
                type: "string",
                label: "Alt",
                name: "alt",
              },
              {
                type: "string",
                label: "Caption",
                name: "caption",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                label: "Kind",
                name: "kind",
                options: ["screenshot", "mockup", "before-after", "deliverable", "process", "evidence"],
              },
            ],
          },
        ],
      },
    ],
  },
});