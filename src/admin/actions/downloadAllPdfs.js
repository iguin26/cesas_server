import { Components } from "../components/components.js";

export const downloadAllPdfs = {
  actionType: "resource",
  icon: "Download",
  label: "Gerar PDFs (ZIP)",
  handler: async (request, response, context) => {
    const { records } = context;
    const redirectUrl = "/admin/pdf/all";
    context.resource.redirectUrl = redirectUrl;
    return {
      records,
      redirectUrl,
      notice: {
        message: "Baixando todos os PDFs de todos os alunos",
        type: "success",
      },
    };
  },
  component: Components.DownloadAllPdfs,
};
