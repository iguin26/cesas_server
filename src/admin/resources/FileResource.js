import uploadFeature from "@adminjs/upload";
import { File } from "../../models/File.js";
import componentLoader from "./component-loader.js";

const localProvider = {
  bucket: "uploads/",
  opts: {
    baseUrl: "/file",
  },
};

export const files = {
  resource: File,
  options: {
    properties: {
      filename: {
        type: "string",
      },
      path: {
        type: "textarea",
        isSortable: false,
      },
    },
  },
  features: [
    Edit({
      componentLoader,
      provider: { local: localProvider },
      validation: { mimeTypes: ["image/png", "application/pdf"] },
    }),
  ],
};
