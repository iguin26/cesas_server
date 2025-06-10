import { Student } from "../models/Student.js";
import { generateStudentPdf } from "../utils/generateStudentPdf.js";
import { sanitizeFilename } from "../utils/sanitize.js";
import streamBuffers from "stream-buffers";
import archiver from "archiver";

class PdfService {
  static async generateSingleStudentPdf(studentId) {
    const student = await Student.findByPk(studentId);
    if (!student) {
      throw new Error("Estudante não encontrado"); // O controller tratará isso como 404
    }

    const pdfBuffer = await generateStudentPdf(student.toJSON());
    const safeName = sanitizeFilename(student.name).substring(0, 50);
    const filename = `aluno-${student.id}-${safeName}.pdf`;

    return { buffer: pdfBuffer, filename };
  }

  static async generateAllStudentsPdfsAsZip() {
    const students = await Student.findAll({ raw: true });
    if (!students || students.length === 0) {
      throw new Error("Nenhum estudante encontrado para gerar o ZIP"); // O controller tratará isso
    }

    const pdfs = await Promise.all(
      students.map(async (student) => {
        const pdfBuffer = await generateStudentPdf(student);
        return { id: student.id, name: student.name, pdf: pdfBuffer };
      })
    );

    const zipBuffer = new streamBuffers.WritableStreamBuffer();
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.pipe(zipBuffer);

    pdfs.forEach(({ id, name, pdf }) => {
      const safeName = sanitizeFilename(name).substring(0, 50);
      archive.append(pdf, { name: `aluno-${id}-${safeName}_Ficha.pdf` });
    });

    await archive.finalize();
    const zipData = zipBuffer.getContents();
    const filename = "fichas_todos_alunos.zip";

    return { buffer: zipData, filename };
  }

  static async generateSelectedStudentsPdfsAsZip(studentIds) {
    if (!studentIds || studentIds.length === 0) {
      throw new Error("Nenhum ID de estudante fornecido para o ZIP"); // O controller tratará isso
    }

    const students = await Student.findAll({
      where: { id: studentIds },
      raw: true,
    });

    if (!students || students.length === 0) {
      throw new Error(
        "Nenhum estudante encontrado para os IDs fornecidos no ZIP"
      ); // O controller tratará isso
    }

    const pdfs = await Promise.all(
      students.map(async (student) => {
        const pdfBuffer = await generateStudentPdf(student);
        return { id: student.id, name: student.name, pdf: pdfBuffer };
      })
    );

    const zipBuffer = new streamBuffers.WritableStreamBuffer();
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(zipBuffer);

    pdfs.forEach(({ id, name, pdf }) => {
      const safeName = sanitizeFilename(name).substring(0, 50);
      archive.append(pdf, { name: `aluno-${id}-${safeName}_Ficha.pdf` });
    });

    await archive.finalize();
    const zipData = zipBuffer.getContents();
    const filename = "fichas_alunos_selecionados.zip";

    return { buffer: zipData, filename };
  }
}

export default PdfService;
