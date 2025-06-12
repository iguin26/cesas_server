import { Components } from "../../components/components.js";

export const downloadSelectedPdfs = {
  actionType: "bulk",
  icon: "Download",
  label: "Gerar PDFs (selecionados)",
  handler: async (request, response, context) => {
    const { records } = context;

    const recordIds = context.records.map((r) => r.id());

    if (!recordIds || recordIds.length === 0) {
      throw new Error(
        "Você deve selecionar ao menos um registro para baixar os PDFs."
      );
    }
    return {
      records,
      notice: {
        message: "Baixando PDFs dos alunos selecionados",
        type: "success",
      },
    };
  },
  component: Components.DownloadSelectedPdfs,
};
