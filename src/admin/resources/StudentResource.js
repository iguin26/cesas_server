import { Student } from "../../models/Student.js";
import { gerarPdfDoAluno } from "../actions/pdf.hook.js";

export const StudentResource = {
  resource: Student,
  options: {
    actions: {
      edit: {
        before: async (request, context) => {
          const { record } = context;
          const studentId = request.params?.recordId;
          const previousStudent = await Student.findByPk(studentId);

          context.previousStatus = previousStudent?.status;

          return request;
        },

        after: async (response, request, context) => {
          // const { record, previousRecord } = context;
          const { record } = context;
          const novoStatus = record?.params.status;
          // const statusAnterior = previousRecord?.params.status;
          // const statusAnterior = previousData?.status;
          const statusAnterior = context.previousStatus;
          if (statusAnterior === "Pendente" && novoStatus === "Aprovado") {
            const aluno = record.params;
            // gerarPdfDoAluno(aluno);
          }

          return response;
        },
      },
    },
  },
};
