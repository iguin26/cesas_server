import { ejaStudent } from "../models/ejaStudent.js";
import { profisStudent } from "../models/profisStudent.js";
import { generateStudentPdf } from "../utils/generateStudentPdf.js";
import { sanitizeFilename } from "../utils/sanitize.js";
import streamBuffers from "stream-buffers";
import archiver from "archiver";

class PdfService {
  static async generateSingleStudentPdf(studentId) {
    let student = await ejaStudent.findByPk(studentId);
    let studentType = "ejaStudent";

    if (!student) {
      student = await profisStudent.findByPk(studentId);
      studentType = "profisStudent";
    }

    if (!student) {
      throw new Error("Estudante não encontrado");
    }

    const pdfBuffer = await generateStudentPdf(student.toJSON(), studentType);
    const safeName = sanitizeFilename(student.name).substring(0, 50);
    const filename = `aluno-${studentType}-${student.id}-${safeName}.pdf`;

    return { buffer: pdfBuffer, filename };
  }

  static async generateAllStudentsPdf() {
    const ejaStudents = await ejaStudent.findAll();
    const profisStudents = await profisStudent.findAll();

    const buffer = new streamBuffers.WritableStreamBuffer();
    const archive = archiver("zip");

    archive.pipe(buffer);

    for (const student of ejaStudents) {
      try {
        const pdfBuffer = await generateStudentPdf(
          student.toJSON(),
          "ejaStudent"
        );
        const safeName = sanitizeFilename(student.name).substring(0, 50);
        const filename = `eja-${student.id}-${safeName}.pdf`;
        archive.append(pdfBuffer, { name: filename });
      } catch (error) {
        console.error(
          `Erro ao gerar PDF para estudante EJA ${student.id}:`,
          error
        );
      }
    }

    for (const student of profisStudents) {
      try {
        const pdfBuffer = await generateStudentPdf(
          student.toJSON(),
          "profisStudent"
        );
        const safeName = sanitizeFilename(student.name).substring(0, 50);
        const filename = `profis-${student.id}-${safeName}.pdf`;
        archive.append(pdfBuffer, { name: filename });
      } catch (error) {
        console.error(
          `Erro ao gerar PDF para estudante PROFIS ${student.id}:`,
          error
        );
      }
    }

    await archive.finalize();

    return new Promise((resolve, reject) => {
      buffer.on("finish", () => {
        resolve(buffer.getContents());
      });
      buffer.on("error", reject);
    });
  }
}

export default PdfService;
