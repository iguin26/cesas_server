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

    //titulo
    doc
      .fontSize(20)
      .font("OpenSans")
      .text("Ficha do Aluno", { align: "center" });
    doc.moveDown();

    // cabecalho
    const startX = 50;
    const startY = doc.y;
    const headerMargin = 10;

    const headerInfo = [
      `Nome: ${student.name}`,
      `Data de nascimento: ${student.birthDate}`,
      `Turno: ${student.shift}`,
      `Tipo: ${student.applyType}`,
      `CPF: ${student.cpf}`,
    ];

    doc.fontSize(12).fillColor("black").font("OpenSans");

    const lineHeight = 15;
    const headerHeight = lineHeight * headerInfo.length + headerMargin * 2;
    const headerWidth = doc.page.width - startX * 2;
    doc
      .rect(
        startX - headerMargin,
        startY - headerMargin,
        headerWidth + headerMargin * 2,
        headerHeight
      )
      .fillAndStroke("#f0f0f0", "black");
    doc.fillColor("black");
    headerInfo.forEach((info, i) => {
      doc.text(info, startX, startY + i * lineHeight);
    });
    doc.y = startY + headerHeight + 20;

    const yesNo = (bool) => (bool ? "Sim" : "Não");

    doc.text(`Já foi estudante: ${yesNo(student.legacyStudent)}`, {
      lineGap: 6,
    });
    doc.text(`Tem problemas de saúde?: ${yesNo(student.disabledStudent)}`, {
      lineGap: 6,
    });
    doc.text(
      `Necessita de exame de classificação ou reclassificação? ${yesNo(
        student.recordlessStudent
      )}`,
      { lineGap: 6 }
    );
    if (student.socialName)
      doc.text(`Nome social: ${student.socialName}`, { lineGap: 6 });

    doc.text(`Nacionalidade: ${student.nationality}`, { lineGap: 6 });
    doc.text(`Estado: ${student.state}`, { lineGap: 6 });
    doc.text(`Número do RG: ${student.idNumber}`, { lineGap: 6 });
    doc.text(`Data de expedição do RG: ${student.idExpDate}`, { lineGap: 6 });
    doc.text(`Órgão de expedição do RG: ${student.idIssuingBody}`, {
      lineGap: 6,
    });
    doc.text(`Raça/Etnia: ${student.ethnicity}`, { lineGap: 6 });
    doc.text(`CEP: ${student.cep}`, { lineGap: 6 });
    doc.text(`Endereço: ${student.address}`, { lineGap: 6 });
    doc.text(`Celular: ${student.cellphoneNumber}`, { lineGap: 6 });
    doc.text(`Telefone: ${student.landlinePhone}`, { lineGap: 6 });
    doc.text(`Telefone de emergência: ${student.emergencyPhone}`, {
      lineGap: 6,
    });
    doc.text(`Nome do responsável: ${student.responsibleName}`, { lineGap: 6 });
    doc.text(`RG do responsável: ${student.responsibleId}`, { lineGap: 6 });
    doc.text(`Gênero: ${student.gender}`, { lineGap: 6 });

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
