import { defineConfig } from "tinacms";
import { IconSvgTextareaField } from "./fields/IconSvgTextareaField";
import { TitleField, ReadOnlyField } from "./fields/TitleField";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isGhPages = process.env.IS_GH_PAGES === "true";
const basePath = isGhPages ? "/gstvux.com.br" : "";

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

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
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
                // required: true,
              },
              {
                type: "string",
                name: "current_year",
                label: "Current Year",
                description: 'Ex: "2024"',
                // required: true,
              },
              {
                type: "string",
                name: "availability",
                label: "Availability",
                description: 'Ex: "Disponível para alocação."',
                // required: true,
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
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
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
            if (document._sys.filename === "home") return `${basePath}/`;
            return `${basePath}/${document._sys.filename}`;
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
                        description: 'Ex.: "GMT-3"',
                      },
                      {
                        type: "string",
                        name: "timezoneId",
                        label: "Timezone ID",
                        description: 'Ex.: "America/Sao_Paulo"',
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
                ui: {
                  max: 3,
                  itemProps: (item) => {
                    if (!item?.case) return { label: "New Featured Case" }
                    const name = item.case.split('/').pop()?.replace('.md', '') || item.case;
                    const label = name.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
                    return { label };
                  }
                },
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
                    ui: {
                      itemProps: (item) => ({ label: item?.title || "New Card" }),
                    },
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
                    ui: {
                      itemProps: (item) => ({ label: item?.label || "New Badge" }),
                    },
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
          filename: {
            readonly: true, // Impedir mudança manual do nome do arquivo
            slugify: (values) => {
              const str = (values?.title || 'no-title') as string;
              return str
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/ç/g, "c")
                .replace(/[^a-z0-9]+/g, "-") 
                .replace(/^-+|-+$/g, "");
            },
          },
          beforeSubmit: async ({ values }) => {
            const slugify = (str: string) => {
              return str
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/ç/g, "c")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            };
            
            const finalSlug = slugify(values.title as string);
            return {
              ...values,
              // Força o slug a ser sempre a versão slugfied do titulo no momento do save
              slug: finalSlug,
            }
          },
          router: ({ document }) => `${basePath}/cases/${document._sys.filename}`,
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
            description: "Identificador único (gerado automaticamente pelo título)",
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
            options: Array.from({length: new Date().getFullYear() - 2008 + 1}, (_, i) => (2008 + i).toString()).reverse(),
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
            ui: {
              itemProps: (item) => ({ label: item?.caption || item?.kind || "Image" }),
              defaultItem: () => ({ image: "", alt: "", caption: "", kind: "screenshot" })
            },
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