import { defineConfig } from "tinacms";
import { IconSvgTextareaField } from "./fields/IconSvgTextareaField";


// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const iconSvgTextareaComponent =
  IconSvgTextareaField as unknown as string;

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
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: ({ document }) => {
            if (document._sys.filename === "home") return "/";
            return `/${document._sys.filename}`;
          },
        },
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
            label: "Intro",
            name: "intro",
            fields: [
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
            label: "Featured Cases",
            name: "featuredCases",
            list: true,
            ui: {
              max: 3,
            },
            fields: [
              {
                type: "string",
                label: "Slug",
                name: "slug",
                required: true,
              },
              {
                type: "string",
                label: "Title",
                name: "title",
                required: true,
              },
              {
                type: "string",
                label: "Summary",
                name: "summary",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                label: "Tag",
                name: "tag",
              },
            ],
          },
          {
            type: "object",
            label: "CTA",
            name: "cta",
            fields: [
              {
                type: "string",
                label: "Title",
                name: "title",
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
                label: "Button Label",
                name: "buttonLabel",
              },
              {
                type: "string",
                label: "Button Href",
                name: "buttonHref",
              },
            ],
          },
        ],
      },
    ],
  },
});