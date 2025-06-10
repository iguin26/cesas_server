import { ejaStudent } from "../../models/ejaStudent.js";
import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";

export const ejaStudentResource = {
  resource: ejaStudent,
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
