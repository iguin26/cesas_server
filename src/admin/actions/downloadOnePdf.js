import { Components } from "../components/components.js";

export const downloadOnePdf = {
  actionType: "record",
  icon: "Clipboard",
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
};
