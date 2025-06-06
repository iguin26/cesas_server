import { profisStudent } from "../../models/profisStudent.js";
import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";

export const profisStudentResource = {
  resource: profisStudent,
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
