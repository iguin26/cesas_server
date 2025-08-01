import express from "express";
import { homeController } from "./controllers/homeControllers.js";
import ejaStudentController from "./controllers/ejaStudentController.js";
import profisStudentController from "./controllers/profisStudentController.js";
import PdfController from "./controllers/pdfControllers.js";
import ejaSubmitFormTitleController from "./controllers/ejaSubmitFormTitleController.js";
import profisSubmitFormTitleController from "./controllers/profisSubmitFormTitleController.js";
import footerController from "./controllers/footerController.js";
import CourseService from "./services/courseService.js";
import CsvController from "./controllers/csvControllers.js";
import { uploadStudentFiles } from "./config/multer.js";
import CardService from './services/cardsService.js'
import FaqService from "./services/faqService.js";
import TeamService from "./services/teamService.js";
import HomeService from "./services/homeService.js";
import StudentAreaService from "./services/studentAreaService.js";

export const router = express.Router();

router.get("/", homeController.index);

router.get("/admin/pdf/student/:id", PdfController.generateStudentPdfById);

router.get("/admin/pdf/all", PdfController.generateAllStudentsPdfs);

router.get("/admin/pdf/selected", PdfController.generateSelectedStudentsPdfs);

router.get(
  "/admin/csv/profis-student/:id",
  CsvController.generateStudentCsvById
);
router.get("/admin/csv/profis-all", CsvController.generateAllStudentsCsv);
router.get(
  "/admin/csv/profis-selected",
  CsvController.generateSelectedStudentsCsv
);

router.get(
  "/ejaSubmitFormTitle",
  ejaSubmitFormTitleController.getSubmitFormTitle
);
router.get(
  "/profisSubmitFormTitle",
  profisSubmitFormTitleController.getSubmitFormTitle
);
router.get("/getFooterData", footerController.getFooterData);

router.get("/getProfisCursos", async (req, res) => {
  try {
    const cursos = await CourseService.listAllProfisCourses();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar cursos" });
  }
});

router.get("/getEJACursos", async (req, res) => {
  try {
    const cursos = await CourseService.listAllEJACourses();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar cursos" });
  }
});

router.get("/getCards", async (req, res) => {
  try {
    const cards = await CardService.listAllCards();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar cards" });
  }
});

router.get("/getEJAFaqs", async (req, res) => {
  try {
    const cards = await FaqService.listAllEJAFaqs();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar faqs" });
  }
});

router.get("/getStudentAreaURL", async (req, res) => {
  try {
    const cards = await StudentAreaService.listStudentAreaURL();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar URL" });
  }
});

router.get("/getProfisFaqs", async (req, res) => {
  try {
    const cards = await FaqService.listAllProfisFaqs();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar faqs" });
  }
});

router.get("/getEquipe", async (req, res) => {
  try {
    const staff = await TeamService.listStaff();
    const supervision = await TeamService.listSupervision();
    const coordinators = await TeamService.listCoordinators();
    const teaching_staff = await TeamService.listTeachingStaff();


    res.json({ staff, supervision, coordinators, teaching_staff });
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar equipe" });
  }
});

router.get("/getHomeData", async (req, res) => {
  try {
    const data = await HomeService.listHomeData();
    const events = await HomeService.listEvents();

    res.json({ data,events});
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar infos do mural" });
  }
});

// import Admin from "./models/Admin.js"
// router.get('/test-admin', async (req, res) => {
//   try {
//     const admins = await Admin.findAll();
//     res.json(admins);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ erro: 'Deu ruim' });
//   }
// });

router.post(
  "/eja/students",
  uploadStudentFiles.fields([
    { name: "studentPhoto", maxCount: 1 },
    { name: "studentProofOfResidence", maxCount: 1 },
    { name: "studentId", maxCount: 1 },
    { name: "studentMedicalReport", maxCount: 1 },
    { name: "studentAcademicRecord", maxCount: 1 },
  ]),
  ejaStudentController.insertStudent
);

router.post(
  "/professionalizing/students",
  uploadStudentFiles.fields([{ name: "studentMedicalReport", maxCount: 1 }]),
  profisStudentController.insertStudent
);
