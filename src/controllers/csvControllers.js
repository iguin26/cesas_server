import CsvService from "../services/csvService.js";

class CsvController {
  static async generateStudentCsvById(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }
    try {
      const studentId = req.params.id;
      const { buffer, filename } = await CsvService.generateSingleStudentCsv(
        studentId
      );

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (error) {
      console.error(
        "Erro no controller ao gerar CSV do estudante:",
        error.message
      );
      if (error.message === "Estudante não encontrado") {
        return res.status(404).send({ msg: error.message });
      }
      res.status(500).send("Erro interno ao gerar CSV do estudante");
    }
  }

  static async generateAllStudentsCsv(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }

    try {
      const { buffer, filename } =
        await CsvService.generateAllStudentsCsvAsZip();

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (err) {
      console.error(
        "Erro no controller ao gerar ZIP de todos os CSVs:",
        err.message
      );
      if (
        err.message === "Nenhum estudante PROFIS encontrado para gerar o CSV"
      ) {
        return res.status(404).send({ msg: err.message });
      }
      res.status(500).send("Erro interno ao gerar os arquivos CSV");
    }
  }

  static async generateSelectedStudentsCsv(req, res) {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).send("Não autorizado");
    }

    const ids = req.query.ids
      ? req.query.ids
          .split(",")
          .map((id) => parseInt(id, 10))
          .filter((id) => !isNaN(id))
      : [];

    if (!ids.length) {
      return res.status(400).send("Nenhum ID de estudante válido fornecido");
    }

    try {
      const { buffer, filename } =
        await CsvService.generateSelectedStudentsCsvAsZip(ids);

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );
      res.send(buffer);
    } catch (err) {
      console.error(
        "Erro no controller ao gerar ZIP dos CSVs selecionados:",
        err.message
      );
      if (
        err.message === "Nenhum ID de estudante fornecido para o CSV" ||
        err.message ===
          "Nenhum estudante PROFIS encontrado para os IDs fornecidos"
      ) {
        return res.status(404).send({ msg: err.message });
      }
      res.status(500).send("Erro interno ao gerar os arquivos CSV");
    }
  }
}

export default CsvController;
