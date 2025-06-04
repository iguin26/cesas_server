import { pdfStudent } from "../../utils/pdfStudent.js";
import { sanitizeFilename } from "../../utils/sanitize.js";

export const downloadIndividualPdf = {
  actionType: "record",
  icon: "Download",
  label: "Baixar PDF do Aluno",

  handler: async (request, response, context) => {
    // console.log("vai baixar ss pq ta no show");
    // const student = context.record?.params;
    // const pdf = pdfStudent(student);

    const student = context.record?.params;
    const pdfBuffer = await pdfStudent(student);
    const filename = sanitizeFilename(student.name || "aluno") + ".pdf";
    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    response.send(pdfBuffer);

    return null;
    // {
    //   record: context.record.toJSON(),
    //   notice: {
    //     message: "PDF gerado com sucesso",
    //     type: "success",
    //   },
    // };
  },
  component: false,
};
