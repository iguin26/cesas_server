import express from "express";
import { homeController } from "./controllers/homeControllers.js";
import StudentController from "./controllers/userControllers.js";
import FaqController from "./controllers/faqControllers.js";
import CourseController from "./controllers/coursesControllers.js";

export const router = express.Router();

router.get("/", homeController.index);

router.get("/auth/login", showLogin);

router.get("/auth/register", showRegister);

router.get("/courses", CourseController.listCourse);

router.get("/courses/:name", CourseController.listCoursesByName);

router.get("/faq", FaqController.listFaq);
router.get("/faq/:search", FaqController.listFaqByLike);


router.post('/students', StudentController.create);