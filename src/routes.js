import express from "express";
import { showHome } from "./controllers/homeControllers.js";
import { showLogin, showRegister } from "./controllers/userControllers.js";
import { showFaq } from "./controllers/faqControllers.js";
import {
  showAllCourses,
  showOneCourse,
} from "./controllers/coursesControllers.js";

export const router = express.Router();

router.get("/", showHome);

router.get("/auth/login", showLogin);

router.get("/auth/register", showRegister);

router.get("/courses", showAllCourses);

router.get("/courses:id", showOneCourse);

router.get("/faq", showFaq);
