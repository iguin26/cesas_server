import express from "express";
import cors from "cors";
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
import compression from "compression";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
app.use(compression())
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


app.use(cors({
  origin: ["http://localhost:5173", "http://srv762003.hstgr.cloud"], // ou a URL do seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());

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
