import { Components } from "../../components/components.js";

export const downloadSelectedCsvs = {
  actionType: "bulk",
  icon: "Download",
  label: "Baixar CSVs Selecionados",
  handler: (request, response, context) => {
    const { records } = context;
    const ids = records.map((record) => record.params.id).join(",");
    const csvUrl = `/admin/csv/profis-selected?ids=${ids}`;

    return {
      records,
      redirectUrl: csvUrl,
    };
  },
  component: Components.DownloadSelectedCsvs,
};
