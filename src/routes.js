import express from "express";
import { homeController } from "./controllers/homeControllers.js";
import ejaStudentController from "./controllers/ejaStudentController.js";
import profisStudentController from "./controllers/profisStudentController.js";
import FaqController from "./controllers/faqControllers.js";
import PdfController from "./controllers/pdfControllers.js";
// import CourseController from "./controllers/coursesControllers.js";
// import StudentController from "./controllers/userControllers.js";
import { upload } from "./config/multer.js";
import ejaSubmitFormTitleController from "./controllers/ejaSubmitFormTitleController.js";
import profisSubmitFormTitleController from "./controllers/profisSubmitFormTitleController.js";
import footerController from "./controllers/footerController.js";
import CourseService from "./services/courseService.js";

export const router = express.Router();

router.get("/", homeController.index);

// router.get("/auth/login", showLogin);

// router.get("/auth/register", showRegister);

// router.get("/courses", CourseController.listCourse);

// router.get("/courses/:name", CourseController.listCoursesByName);

router.get("/faq", FaqController.listFaq);
router.get("/faq/:search", FaqController.listFaqByLike);

router.post("/students", StudentController.create);

router.get("/admin/pdf/student/:id", PdfController.generateStudentPdfById);
router.get("/admin/pdf/all", PdfController.generateAllStudentsPdfs);
router.get("/admin/pdf/selected", PdfController.generateSelectedStudentsPdfs);
// router.post('/students', StudentController.insertStudent);

router.get(
  "/ejaSubmitFormTitle",
  ejaSubmitFormTitleController.getSubmitFormTitle
);
router.get(
  "/profisSubmitFormTitle",
  profisSubmitFormTitleController.getSubmitFormTitle
);
router.get("/getFooterData", footerController.getFooterData);
// router.get("/getCursos", CourseService.listAllCourses);

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

router.post(
  "/eja/students",
  upload.fields([
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
  upload.fields([{ name: "studentMedicalReport", maxCount: 1 }]),
  profisStudentController.insertStudent
);
