import { Student } from "../../models/index.js";
import { pdfBeforeHook, pdfAfterHook } from "../actions/pdf.hook.js";
import { pdfStudent } from "../../utils/pdfStudent.js";
import { sanitizeFilename } from "../../utils/sanitize.js";
import { downloadIndividualPdf } from "../actions/downloadIndividualPdf.js";
import { Components } from "../components/components.js";

export const StudentResource = {
  resource: Student,
  options: {
    listProperties: ["id", "name"],
    actions: {
      downloadIndividualPdf: {
        //downloadIndividualPdf,

        actionType: "record",
        icon: "Document",
        label: "Visualizar PDF do Aluno",

        handler: async (request, response, context) => {
          const { record } = context;
          if (!record) {
            return {
              record: null,
              notice: {
                message: "Aluno não encontrado",
                type: "error",
              },
            };
          }
          const studentId = record.param("id");
          const redirectUrl = `/admin/pdf/student/${studentId}`;
          context.record.params.redirectUrl = redirectUrl;
          return {
            redirectUrl,
            record: context.record.toJSON(),
            notice: {
              message: "Abrindo PDF em nova aba",
              type: "success",
            },
          };
        },
        component: Components.OpenPdfInNewTab,
      },

      edit: {
        // before: [pdfBeforeHook],
        // after: [pdfAfterHook],
        // isVisible: false,
      },
    },
  },
};
