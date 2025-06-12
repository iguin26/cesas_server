import { Components } from "../../components/components.js";

export const downloadSingleCsv = {
  actionType: "record",
  icon: "Download",
  label: "Baixar CSV",
  handler: (request, response, context) => {
    const { record } = context;
    const recordId = record.params.id;
    const csvUrl = `/admin/csv/profis-student/${recordId}`;

    return {
      record: context.record.toJSON(),
      redirectUrl: csvUrl,
    };
  },
  component: Components.DownloadSingleCsv,
};
