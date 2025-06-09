import express from "express";
import "dotenv/config";
import { admin } from "./admin/admin.js";
import { sessionConfig } from "./config/session.js";
import { router } from "./routes.js";
import { buildAuthenticatedRouter, name } from "@adminjs/express";
import { authenticate } from "./services/authService.js";
import multer from "multer";
import bodyParser from "body-parser";
import { File } from "./models/File.js";

import path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Configuração do AdminJS
const adminRouter = buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
  },
  null,
  sessionConfig
);

app.use(admin.options.rootPath, adminRouter);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  const { originalname, path } = req.file;
  File.create({ filename: originalname, path })
    .then(() => {
      res.send("File uploaded successfully");
    })
    .catch((err) => {
      res.status(500).send("Error uploading the file");
    });
});

app.get("/file/:id", (req, res) => {
  const fileId = req.params.id;
  if (!/^\d+$/.test(fileId)) {
    return res.status(400).send("invalid id");
  }
  File.findByPk(fileId)
    .then((file) => {
      if (!file) {
        return res.status(404).send("File not found");
      }
      const absolutePath = path.join(__dirname, "..", "uploads", file.filename);
      // res.download(file.path);
      res.sendFile(absolutePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error sending the file");
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error fetching the file");
    });
});

app.use(router);

import { Student } from "./models/Student.js";
import { generateStudentPdf } from "./utils/generateStudentPdf.js";
import { sanitizeFilename } from "./utils/sanitize.js";
import streamBuffers from "stream-buffers";

app.get("/admin/pdf/student/:id", async (req, res) => {
  if (!req.session || !req.session.adminUser) {
    return res.status(401).send("Não autorizado");
  }
  try {
    const id = req.params.id;
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).send({ msg: "nn encontrado" });
    }

    const pdfBuffer = await generateStudentPdf(student.toJSON());

    const safeName = sanitizeFilename(student.name).substring(0, 50);

    const filename = `aluno-${student.id}-${safeName}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.log("error");
    res.status(500).send("Erro ao gerar PDF");
  }
});

import archiver from "archiver";
app.get("/admin/pdf/all", async (req, res) => {
  if (!req.session || !req.session.adminUser) {
    return res.status(401).send("Não autorizado");
  }

  const students = await Student.findAll({ raw: true });

  try {
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

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fichas_alunos.zip"
    );
    res.send(zipData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar os arquivos");
  }
});

app.get("/admin/pdf/selected", async (req, res) => {
  if (!req.session || !req.session.adminUser) {
    return res.status(401).send("Não autorizado");
  }
  const ids = req.query.ids
    ? req.query.ids.split(",").map((id) => parseInt(id, 10))
    : [];
  if (!ids.length) return res.status(400).send("Nenhum aluno selecionado");

  const students = await Student.findAll({
    where: { id: ids },
    raw: true,
  });

  try {
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

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fichas_alunos_selecionados.zip"
    );
    res.send(zipData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao gerar os arquivos");
  }
});
