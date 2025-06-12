import { profisStudent } from "../models/profisStudent.js";
import { sanitizeFilename } from "../utils/sanitize.js";
import archiver from "archiver";
import streamBuffers from "stream-buffers";

class CsvService {
  static studentToCsvRow(student) {
    const fields = [
      student.id || "",
      student.name || "",
      student.applyCourse || "",
      student.applyShift || "",
      student.disabledStudent ? "Sim" : "Não",
      student.levelOfEducation || "",
      student.specialNecessity || "",
      student.birthDate || "",
      student.cpf || "",
      student.nationality || "",
      student.naturality || "",
      student.cep || "",
      student.address || "",
      student.phone || "",
      student.mothersName || "",
      student.fathersName || "",
      student.gender || "",
      // student.studentMedicalReport || "",
      student.createdAt || "",
    ];

    return fields
      .map((field) => {
        const stringField = String(field);
        if (
          stringField.includes(",") ||
          stringField.includes('"') ||
          stringField.includes("\n")
        ) {
          return `"${stringField.replace(/"/g, '""')}"`;
        }
        return stringField;
      })
      .join(",");
  }

  static getCsvHeader() {
    return [
      "ID",
      "Nome",
      "Curso Pretendido",
      "Turno Pretendido",
      "Aluno com Deficiência",
      "Nível de Escolaridade",
      "Necessidade Especial",
      "Data de Nascimento",
      "CPF",
      "Nacionalidade",
      "Naturalidade",
      "CEP",
      "Endereço",
      "Telefone",
      "Nome da Mãe",
      "Nome do Pai",
      "Gênero",
      // "Relatório Médico do Estudante",
      "Data de Envio do Formulário",
    ].join(",");
  }

  static async generateSingleStudentCsv(studentId) {
    const student = await profisStudent.findByPk(studentId);
    if (!student) {
      throw new Error("Estudante não encontrado");
    }

    const header = this.getCsvHeader();
    const row = this.studentToCsvRow(student.toJSON());
    const csvContent = `${header}\n${row}`;

    const safeName = sanitizeFilename(student.name).substring(0, 50);
    const filename = `aluno-profis-${student.id}-${safeName}.csv`;

    return {
      content: csvContent,
      filename,
      buffer: Buffer.from(csvContent, "utf8"),
    };
  }

  static async generateAllStudentsCsvAsZip() {
    const students = await profisStudent.findAll({ raw: true });
    if (!students || students.length === 0) {
      throw new Error("Nenhum estudante PROFIS encontrado para gerar o CSV");
    }

    const header = this.getCsvHeader();

    const allStudentsCsv = [
      header,
      ...students.map((student) => this.studentToCsvRow(student)),
    ].join("\n");

    const individualCsvs = students.map((student) => {
      const csvContent = `${header}\n${this.studentToCsvRow(student)}`;
      const safeName = sanitizeFilename(student.name).substring(0, 50);
      const filename = `aluno-profis-${student.id}-${safeName}.csv`;
      return { filename, content: csvContent };
    });

    const zipBuffer = new streamBuffers.WritableStreamBuffer();
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(zipBuffer);

    archive.append(Buffer.from(allStudentsCsv, "utf8"), {
      name: "todos-alunos-profis.csv",
    });

    individualCsvs.forEach(({ filename, content }) => {
      archive.append(Buffer.from(content, "utf8"), {
        name: `individuais/${filename}`,
      });
    });

    await archive.finalize();
    const zipData = zipBuffer.getContents();
    const filename = "csvs_todos_alunos_profis.zip";

    return { buffer: zipData, filename };
  }

  static async generateSelectedStudentsCsvAsZip(studentIds) {
    if (!studentIds || studentIds.length === 0) {
      throw new Error("Nenhum ID de estudante fornecido para o CSV");
    }

    const students = await profisStudent.findAll({
      where: { id: studentIds },
      raw: true,
    });

    if (!students || students.length === 0) {
      throw new Error(
        "Nenhum estudante PROFIS encontrado para os IDs fornecidos"
      );
    }

    const header = this.getCsvHeader();

    const selectedStudentsCsv = [
      header,
      ...students.map((student) => this.studentToCsvRow(student)),
    ].join("\n");

    // CSVs individuais para cada student selecionado
    const individualCsvs = students.map((student) => {
      const csvContent = `${header}\n${this.studentToCsvRow(student)}`;
      const safeName = sanitizeFilename(student.name).substring(0, 50);
      const filename = `aluno-profis-${student.id}-${safeName}.csv`;
      return { filename, content: csvContent };
    });

    const zipBuffer = new streamBuffers.WritableStreamBuffer();
    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(zipBuffer);

    archive.append(Buffer.from(selectedStudentsCsv, "utf8"), {
      name: "alunos-profis-selecionados.csv",
    });

    individualCsvs.forEach(({ filename, content }) => {
      archive.append(Buffer.from(content, "utf8"), {
        name: `individuais/${filename}`,
      });
    });

    await archive.finalize();
    const zipData = zipBuffer.getContents();
    const filename = "csvs_alunos_profis_selecionados.zip";

    return { buffer: zipData, filename };
  }
}

export default CsvService;
