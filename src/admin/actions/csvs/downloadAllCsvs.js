import { Components } from "../../components/components.js";

export const downloadAllCsvs = {
  actionType: "resource",
  icon: "DocumentDownload",
  label: "Baixar CSVs de Todos",
  handler: () => {
    const csvUrl = `/admin/csv/profis-all`;

    return {
      redirectUrl: csvUrl,
    };
  },
  component: Components.DownloadAllCsvs,
};
