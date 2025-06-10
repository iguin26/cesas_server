import { downloadOnePdf } from "../actions/downloadOnePdf.js";
import { downloadAllPdfs } from "../actions/downloadAllPdfs.js";
import { downloadSelectedPdfs } from "../actions/downloadSelectedPdfs.js";
import { ejaStudent } from "../../models/ejaStudent.js";

export const ejaStudentResource = {
  resource: ejaStudent,
  options: {
    listProperties: ["id", "name"],
    actions: {
      downloadSelectedPdfs,
      downloadOnePdf,
      downloadAllPdfs,

      edit: {
        // isVisible: false,
      },
    },
  },
};
