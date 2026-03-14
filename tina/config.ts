import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
                type: "string",
                label: "Eyebrow",
                name: "eyebrow",
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
                label: "Primary CTA Label",
                name: "primaryCtaLabel",
              },
              {
                type: "string",
                label: "Primary CTA Href",
                name: "primaryCtaHref",
              },
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
