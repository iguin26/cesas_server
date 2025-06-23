import path from "path";
import fs from "fs";
import { ejaStudent } from "../models/ejaStudent.js";
import { profisStudent } from "../models/profisStudent.js";

export const secureFileAccess = async (req, res, next) => {
  try {
    if (!req.session || !req.session.adminUser) {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }

    const { studentType, studentId, filename } = req.params;

    if (!["ejaStudent", "profisStudent"].includes(studentType)) {
      return res.status(400).json({ error: "Tipo de estudante inválido" });
    }
    const StudentModel =
      studentType === "ejaStudent" ? ejaStudent : profisStudent;
    const student = await StudentModel.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Estudante não encontrado" });
    }

    const filePath = path.join(
      process.cwd(),
      "private",
      studentType,
      studentId,
      filename
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Arquivo não encontrado" });
    }

    const normalizedPath = path.normalize(filePath);
    const allowedDir = path.join(
      process.cwd(),
      "private",
      studentType,
      studentId
    );

    if (!normalizedPath.startsWith(allowedDir)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const ext = path.extname(filename).toLowerCase();
    const contentTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
    };

    if (contentTypes[ext]) {
      res.setHeader("Content-Type", contentTypes[ext]);
    }

    req.filePath = filePath;
    next();
  } catch (error) {
    console.error("Erro no middleware de acesso:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};
