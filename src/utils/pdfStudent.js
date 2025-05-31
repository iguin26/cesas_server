import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pdfStudent = (student) => {
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
  doc.text(`Curso: ${student.course}`);
  doc.text(`Turno: ${student.shift}`);
  if (student.were_student) {
    doc.text(`Já foi estudante: Sim`);
  } else {
    doc.text(`Já foi estudante: Não`);
  }
  if (student.health_issues) {
    doc.text(`Tem problemas de saúde?: Sim`);
  } else {
    doc.text(`Tem problemas de saúde?: Não`);
  }

  if (student.social_name) {
    doc.text(`Nome social: ${student.social_name}`);
  }

  doc.text(`Data de nacimento: ${student.birthday}`);
  doc.text(`CPF ${student.cpf}`);
  doc.text(`Nacionalidade: ${student.nationality}`);
  doc.text(`Estado: ${student.state}`);
  doc.text(`Número do RG: ${student.rg_number}`);
  doc.text(`Data de expedição do RG: ${student.rg_date}`);
  doc.text(`Raça: ${student.race}`);
  doc.text(`CEP: ${student.cep}`);
  doc.text(`Endereço: ${student.address}`);
  doc.text(`Celular: ${student.phone}`);
  doc.text(`Telefone: ${student.telephone}`);
  doc.text(`Status: ${student.status}`);

  //   doc.text(`Foto: ${student.photo}`);
  //   doc.text(`Foto do RG: ${student.rg_photo}`);
  //   doc.text(`Foto do CEP: ${student.cep_photo}`);
  //   doc.text(`Nome do responsavel: ${student.parent_name}`);
  //   doc.text(`CPF do responsavel: ${student.parent_cpf}`);
  //   doc.text(`Histórico Escolar: ${student.transcript}`);
  //   doc.text(`Laudo médico: ${student.medical_report}`);

  doc.end();

  return filepath;
};
