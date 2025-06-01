import { Student } from "../../models/index.js";
import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";

export const StudentResource = {
  resource: Student,
  options: {
    listProperties: ["id", "name"],
    actions: {
      edit: {
        before: [pdfBeforeHook],
        after: [pdfAfterHook],
        // isVisible: false,
      },
    },
  },
};
