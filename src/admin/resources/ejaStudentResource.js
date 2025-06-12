import { downloadSinglePdf } from "../actions/pdfs/downloadSinglePdf.js";
import { downloadAllPdfs } from "../actions/pdfs/downloadAllPdfs.js";
import { downloadSelectedPdfs } from "../actions/pdfs/downloadSelectedPdfs.js";
import { ejaStudent } from "../../models/ejaStudent.js";

export const ejaStudentResource = {
  resource: ejaStudent,
  options: {
    listProperties: ["id", "name"],
    actions: {
      downloadSelectedPdfs,
      downloadSinglePdf,
      downloadAllPdfs,

      edit: {
        // isVisible: false,
      },
    },
  },
};
