import express from "express";
import { homeController } from "./controllers/homeControllers.js";
import { showLogin, showRegister } from "./controllers/userControllers.js";
import FaqController from "./controllers/faqControllers.js";
import CourseController from "./controllers/coursesControllers.js";

export const router = express.Router();

router.get("/", homeController.index);

router.get("/auth/login", showLogin);

router.get("/auth/register", showRegister);

router.get("/courses", CourseController.listCourse);

router.get("/courses:name", CourseController.listCourseByName);

router.get("/faq", FaqController.listFaq);
router.get("/faq:pergunta", FaqController.listFaqByLike);
