import PDFDocument from "pdfkit";
import streamBuffers from "stream-buffers";

const writeImage = (doc, imgPath, field) => {
  const maxWidth = doc.page.width - 50; // 50 de margemzinha em cd lado p nn ficar mto esticadoo
  const maxHeight = doc.page.height / 3; // no máx 1/3 da altura p nn ser altao desproporcional

  const availableHeight = doc.page.height - doc.y - 50; // 50 de margem embaixo p nn cortar a img caso a acabe a pagina

  if (availableHeight < maxHeight) {
    doc.addPage();
  }

  try {
    const image = doc.openImage(imgPath);
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
    const imgWidth = image.width * scale;
    const imgHeight = image.height * scale;

    doc.text(field);

    doc.image(image, (doc.page.width - imgWidth) / 2, doc.y, {
      width: imgWidth,
    });

    doc.y += imgHeight + 10;
    doc.moveDown();
  } catch (error) {
    doc.text(field);
    doc.moveDown();
    doc.fillColor("red").text("Erro ao carregar imagem.", { align: "center" });
    doc.fillColor("black");
    doc.moveDown();
  }
};

export const generateStudentPdf = async (student) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffer = new streamBuffers.WritableStreamBuffer();

    doc.pipe(buffer);

    doc.fontSize(20).text("Ficha do Aluno", { align: "center" });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Nome: ${student.name}`);
    doc.text(`Tipo: ${student.applyType}`);
    doc.text(`Turno: ${student.shift}`);
    if (student.legacyStudent) {
      doc.text(`Já foi estudante: Sim`);
    } else {
      doc.text(`Já foi estudante: Não`);
    }
    if (student.disabledStudent) {
      doc.text(`Tem problemas de saúde?: Sim`);
    } else {
      doc.text(`Tem problemas de saúde?: Não`);
    }

    if (student.socialName) {
      doc.text(`Nome social: ${student.socialName}`);
    }

    doc.text(`Data de nacimento: ${student.birthDate}`);
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
      const field = "Foto do estudante: ";
      writeImage(doc, student.studentPhoto, field);
    } else {
      doc.text("Foto do estudante: ");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não encontrada. ", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentId) {
      const field = "Foto do RG do estudante: ";

      writeImage(doc, student.studentId, field);
    } else {
      doc.text("Foto do RG do estudante: ");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não encontrada. ", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentProofOfResidence) {
      const field = "Foto do comprovante de residência: ";
      writeImage(doc, student.studentProofOfResidence, field);
    } else {
      doc.text("Foto do comprovante de residência: ");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não encontrada. ", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentMedicalReport) {
      const field = "Laudo médico: ";
      writeImage(doc, student.studentMedicalReport, field);
    } else {
      doc.text("Laudo médico: ");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não encontrada. ", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }

    if (student.studentAcademicReport) {
      const field = "Histórico escolar: ";
      writeImage(doc, student.studentAcademicReport, field);
    } else {
      doc.text("Histórico escolar: ");
      doc.moveDown();
      doc.fillColor("red").text("Imagem não encontrada. ", { align: "center" });
      doc.fillColor("black");
      doc.moveDown();
    }
    doc.end();

    buffer.on("finish", () => resolve(buffer.getContents()));
    buffer.on("error", reject);
  });
};
