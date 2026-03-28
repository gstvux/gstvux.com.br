import { defineConfig } from "tinacms";
import { globalCollection } from "./collections/global";
import { cvCollection } from "./collections/cv";
import { pageCollection } from "./collections/page";
import { casesCollection } from "./collections/cases";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

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
      globalCollection,
      cvCollection,
      pageCollection,
      casesCollection,
    ],
  },
});