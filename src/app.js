import express from "express";
import "dotenv/config";
import { admin } from "./config/admin.js";
import { sessionConfig } from "./config/session.js";
import { router } from "./routes.js";
import { buildAuthenticatedRouter } from "@adminjs/express";
import { authenticate } from "./config/authenticate.js";
import multer from "multer";
import bodyParser from "body-parser";
import { File } from "./models/File.js";

export const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
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
  File.findByPk(fileId)
    .then((file) => {
      if (!file) {
        return res.status(404).send("File not found");
      }
      res.download(file.path);
    })
    .catch((err) => {
      res.status(500).send("Error fetching the file");
    });
});

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
app.use(router);
