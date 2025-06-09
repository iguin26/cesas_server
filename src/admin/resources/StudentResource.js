import { Student } from "../../models/index.js";
import { downloadOnePdf } from "../actions/downloadOnePdf.js";
import { downloadAllPdfs } from "../actions/downloadAllPdfs.js";
import { downloadSelectedPdfs } from "../actions/downloadSelectedPdfs.js";

export const StudentResource = {
  resource: Student,
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
