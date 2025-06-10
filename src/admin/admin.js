// src/config/admin.js
import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { ProfisCourseResource } from "./resources/ProfisCourseResource.js";
import { SubjectResource } from "../admin/resources/SubjectResource.js";
import { CardResource } from "./resources/CardResource.js";
import { FaqResource } from "./resources/FaqResource.js";
import { FooterResource } from "./resources/FooterResource.js";
import { HomeResource } from "./resources/HomeResource.js";
import { ejaStudentResource } from "./resources/ejaStudentResource.js";
import { profisStudentResource } from "./resources/profisStudentResource.js";
import { translations } from "./translate.js";
import { componentLoader } from "./components/components.js";
import { ejaSubmitFormTitleResource } from "./resources/ejaSubmitFormTitleResource.js";
import { profisSubmitFormTitleResource } from "./resources/profisSubmitFormTitleResource.js";
import { ejaCourseResource } from "./resources/ejaCourseResource.js";

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

export const admin = new AdminJS({
  resources: [
    CardResource,
    ProfisCourseResource,
    ejaCourseResource,
    ejaStudentResource,
    profisStudentResource,
    SubjectResource,
    HomeResource,
    FaqResource,
    FooterResource,
    ejaSubmitFormTitleResource,
    profisSubmitFormTitleResource
  ],
  componentLoader: componentLoader,
  locale: {
    language: "pt-BR",
    availableLanguages: ["pt-BR", "en"],
    translations: translations,
  },
  branding: {
    companyName: "CESAS",
    logo: "/uploads/logo/logo-cesas.jpg",
    softwareBrothers: false,
  },
});
admin.watch();
