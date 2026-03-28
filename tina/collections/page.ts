import { Collection } from "tinacms";
import { 
  createInlineSvgField, 
  createIconPositionField 
} from "../fields/shared";

export const pageCollection: Collection = {
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
};
