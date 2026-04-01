import { Collection } from "tinacms";
import { titleComponent, readOnlyComponent } from "../fields/shared";

export const casesCollection: Collection = {
  name: "cases",
  label: "Cases",
  path: "src/content/cases",
  format: "md",
  ui: {
    router: ({ document }) => `/cases/${document._sys.filename}`,
    beforeSubmit: async ({ values }: { values: any }) => {
      return {
        ...values,
        gallery: (values.gallery as any[])?.map((item: any) => ({
          ...item,
          embed: item.kind === "embed" ? item.embed : "",
        })),
      };
    },
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
      ui: {
        itemProps: (item) => {
          const label = item?.kind ? (item.alt ? `${item.kind}: ${item.alt}` : item.kind) : 'Gallery Item';
          return { label };
        },
      },
      fields: [
        {
          type: "string",
          label: "Kind",
          name: "kind",
          options: ["screenshot", "mockup", "before-after", "deliverable", "process", "evidence", "embed"],
        },
        {
          type: "string",
          label: "Embed Snippet",
          name: "embed",
          ui: {
            component: "textarea",
            // @ts-ignore
            hidden: (props: any) => {
              return props?.kind !== "embed";
            },
          } as any,
        },
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
      ],
    },
  ],
};
