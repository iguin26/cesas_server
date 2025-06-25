import PDFDocument from "pdfkit";
import streamBuffers from "stream-buffers";
import path from "path";
import fs from "fs";
import FileService from "../services/FileService.js";

const writeImage = (
  doc,
  studentId,
  filename,
  field,
  studentType = "ejaStudent"
) => {
  const maxWidth = doc.page.width - 50;
  const maxHeight = doc.page.height / 3;
  const availableHeight = doc.page.height - doc.y - 50;

  if (availableHeight < maxHeight) {
    doc.addPage();
  }

  try {
    const imgPath = FileService.getStudentFilePath(
      studentId,
      filename,
      studentType
    );

    if (!fs.existsSync(imgPath)) {
      throw new Error("Imagem não encontrada: " + filename);
    }

    const image = doc.openImage(imgPath);
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
    const imgWidth = image.width * scale;
    const imgHeight = image.height * scale;

    doc.font("OpenSans").fontSize(12);
    doc.text(field);

    doc.image(image, (doc.page.width - imgWidth) / 2, doc.y, {
      width: imgWidth,
    });

    doc.y += imgHeight + 10;
    doc.moveDown();
  } catch (error) {
    console.error("Erro ao carregar imagem:", error.message);
    doc.font("OpenSans").fontSize(12);
    doc.text(field);
    doc.moveDown();
    doc
      .fillColor("red")
      .text(`Erro ao carregar imagem: ${error.message}`, { align: "center" });
    doc.fillColor("black");
    doc.moveDown();
  }
};

export const generateStudentPdf = async (
  student,
  studentType = "ejaStudent"
) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffer = new streamBuffers.WritableStreamBuffer();

    doc.pipe(buffer);

    // Registrar e carregar a fonte OpenSans
    const fontPath = path.resolve(
      "src/fonts/OpenSans-VariableFont_wdth,wght.ttf"
    );
    if (fs.existsSync(fontPath)) {
      doc.registerFont("OpenSans", fontPath);
      doc.font("OpenSans");
    } else {
      console.warn("Arquivo da fonte Open Sans não encontrado em:", fontPath);
    }

    // Desenhar bordas na página
    const drawBorders = () => {
      const margin = 20;
      doc.lineWidth(1);
      doc
        .rect(
          margin,
          margin,
          doc.page.width - 2 * margin,
          doc.page.height - 2 * margin
        )
        .stroke();
    };
    drawBorders();

    try {
      const logoPath = path.resolve("uploads/logo/logo-cesas.png");
      console.log(logoPath);
      const logoImage = doc.openImage(logoPath);

      const logoMaxHeight = 50;
      const scale = logoMaxHeight / logoImage.height;
      const logoWidth = logoImage.width * scale;

      doc.image(logoImage, (doc.page.width - logoWidth) / 2, 30, {
        width: logoWidth,
        height: logoMaxHeight,
      });

      doc.moveDown(2);
    } catch (error) {
      console.error(`Erro ao carregar a logo:`, error.message);
    }

    doc
      .fontSize(20)
      .font("OpenSans")
      .text("Ficha do Aluno", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Nome: ${student.name}`);
    doc.text(`Tipo Matrícula: ${student.applyTypeName}`);
    doc.text(`Turno: ${student.shift}`);

    student.legacyStudent
      ? doc.text(`Já foi estudante: Sim`)
      : doc.text(`Já foi estudante: Não`);

    student.disabledStudent
      ? doc.text(`Tem problemas de saúde?: Sim`)
      : doc.text(`Tem problemas de saúde?: Não`);

    student.recordlessStudent
      ? doc.text("Necessita de exame de classificação ou reclassificação? Sim")
      : doc.text("Necessita de exame de classificação ou reclassificação? Não");

    student.socialName ? doc.text(`Nome social: ${student.socialName}`) : "";

    doc.text(`Data de nascimento: ${student.birthDate}`);
    doc.text(`CPF: ${student.cpf}`);
    doc.text(`Nacionalidade: ${student.nationality}`);
    doc.text(`Estado: ${student.state}`);
    doc.text(`Número do RG: ${student.idNumber}`);
    doc.text(`Data de expedição do RG: ${student.idExpDate}`);
    doc.text(`Órgão de expedição do RG: ${student.idIssuingBody}`);
    doc.text(`Raça/Etnia: ${student.ethnicity}`);
    doc.text(`CEP: ${student.cep}`);
    doc.text(`Endereço: ${student.address}`);
    doc.text(`Celular: ${student.cellphoneNumber}`);
    doc.text(`Telefone: ${student.landlinePhone}`);
    doc.text(`Telefone de emergência: ${student.emergencyPhone}`);
    doc.text(`Nome do responsável: ${student.responsibleName}`);
    doc.text(`RG do responsável: ${student.responsibleId}`);
    doc.text(`Gênero: ${student.gender}`);

    doc.moveDown();

    if (student.studentPhoto) {
      writeImage(
        doc,
        student.id,
        student.studentPhoto,
        "Foto do estudante:",
        studentType
      );
    } else {
      doc.font("OpenSans").text("Foto do estudante:");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não enviada.", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentId) {
      writeImage(
        doc,
        student.id,
        student.studentId,
        "Foto do RG do estudante:",
        studentType
      );
    } else {
      doc.font("OpenSans").text("Foto do RG do estudante:");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não enviada.", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentProofOfResidence) {
      writeImage(
        doc,
        student.id,
        student.studentProofOfResidence,
        "Foto do comprovante de residência:",
        studentType
      );
    } else {
      doc.font("OpenSans").text("Foto do comprovante de residência:");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não enviada.", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentMedicalReport) {
      writeImage(
        doc,
        student.id,
        student.studentMedicalReport,
        "Laudo médico:",
        studentType
      );
    } else {
      doc.font("OpenSans").text("Laudo médico:");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não enviada.", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentAcademicRecord) {
      writeImage(
        doc,
        student.id,
        student.studentAcademicRecord,
        "Histórico escolar:",
        studentType
      );
    } else {
      doc.font("OpenSans").text("Histórico escolar:");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não enviada.", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    doc.end();

    buffer.on("finish", () => resolve(buffer.getContents()));
    buffer.on("error", reject);
  });
};
