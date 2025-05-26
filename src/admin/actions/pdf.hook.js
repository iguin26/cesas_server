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

import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const gerarPdfDoAluno = (student) => {
  const doc = new PDFDocument();
  const filepath = path.join(
    __dirname,
    `../../uploads/pdf/aluno-${student.id}.pdf`
  );

  doc.pipe(fs.createWriteStream(filepath));

  doc.fontSize(20).text("Ficha do Aluno", { align: "center" });
  doc.moveDown();

  doc.fontSize(12);
  doc.text(`Nome: ${student.name}`);

  doc.end();

  return filepath;
};
