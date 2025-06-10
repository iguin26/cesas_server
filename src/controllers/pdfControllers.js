import PdfService from "../services/pdfService.js";

class PdfController {
  static async generateStudentPdfById(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }
    try {
      const studentId = req.params.id;
      const { buffer, filename } = await PdfService.generateSingleStudentPdf(
        studentId
      );

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
      res.send(buffer);
    } catch (error) {
      console.error(
        "Erro no controller ao gerar PDF do estudante:",
        error.message
      );
      if (error.message === "Estudante não encontrado") {
        return res.status(404).send({ msg: error.message });
      }
      res.status(500).send("Erro interno ao gerar PDF do estudante");
    }
  }

  static async generateAllStudentsPdfs(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }

    try {
      const { buffer, filename } =
        await PdfService.generateAllStudentsPdfsAsZip();

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (err) {
      console.error(
        "Erro no controller ao gerar ZIP de todos os PDFs:",
        err.message
      );
      if (err.message === "Nenhum estudante encontrado para gerar o ZIP") {
        return res.status(404).send({ msg: err.message });
      }
      res.status(500).send("Erro interno ao gerar os arquivos ZIP");
    }
  }

  static async generateSelectedStudentsPdfs(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }

    const ids = req.query.ids
      ? req.query.ids
          .split(",")
          .map((id) => parseInt(id, 10))
          .filter((id) => !isNaN(id)) // Garante que são números
      : [];

    if (!ids.length) {
      // Esta validação pode ficar no controller, pois é sobre a requisição
      return res.status(400).send("Nenhum ID de estudante válido fornecido");
    }

    try {
      const { buffer, filename } =
        await PdfService.generateSelectedStudentsPdfsAsZip(ids);

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (err) {
      console.error(
        "Erro no controller ao gerar ZIP dos PDFs selecionados:",
        err.message
      );
      if (
        err.message === "Nenhum ID de estudante fornecido para o ZIP" ||
        err.message ===
          "Nenhum estudante encontrado para os IDs fornecidos no ZIP"
      ) {
        return res.status(404).send({ msg: err.message });
      }
      res.status(500).send("Erro interno ao gerar os arquivos ZIP");
    }
  }
}

export default PdfController;
