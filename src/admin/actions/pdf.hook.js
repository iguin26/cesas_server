// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";

// export const createPdf = (student) => {
//   const doc = new PDFDocument();
//   const filepath = path.join(
//     __dirname,
//     `../../../uploads/pdf/student-${student.id}.pdf`
//   );

//   doc.pipe(fs.createWriteStream(filepath));

//   doc.fontSize(20).text("Ficha do Aluno", { align: "center" });
//   doc.moveDown();

//   doc.fontSize(12);
//   doc.text(`Nome: ${student.name}`);
//   doc.end();

//   return filepath;
// };
import { Student } from "../../models/index.js";
import { pdfStudent } from "../../utils/pdfStudent.js";

export const pdfBeforeHook = async (request, context) => {
  const { record } = context;
  const studentId = request.params?.recordId;
  const previousStudent = await Student.findByPk(studentId);

  context.previousStatus = previousStudent?.status;

  return request;
};

export const pdfAfterHook = async (response, request, context) => {
  const { record } = context;
  const novoStatus = record?.params.status;
  const statusAnterior = context.previousStatus;
  console.log("status anterior: ", statusAnterior);
  console.log("status novo: ", novoStatus);
  if (statusAnterior === "Pendente" && novoStatus === "Aprovado") {
    const aluno = record.params;
    console.log(aluno);
    pdfStudent(aluno);
  }
  return response;
};
