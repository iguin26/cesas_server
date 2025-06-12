import { profisStudent } from "../../models/profisStudent.js";
// import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";
import { downloadSingleCsv } from "../actions/csvs/downloadSingleCsv.js";
import { downloadAllCsvs } from "../actions/csvs/downloadAllCsvs.js";
import { downloadSelectedCsvs } from "../actions/csvs/downloadSelectedCsvs.js";

export const profisStudentResource = {
  resource: profisStudent,
  options: {
    listProperties: ["id", "name"],
    actions: {
      downloadSingleCsv,
      downloadAllCsvs,
      downloadSelectedCsvs,

      edit: {
        // before: [pdfBeforeHook],
        // after: [pdfAfterHook],
        // isVisible: false,
      },
    },
  },
};
