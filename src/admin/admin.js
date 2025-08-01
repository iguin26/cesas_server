// src/config/admin.js
import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";
import { ProfisCourseResource } from "./resources/ProfisCourseResource.js";
import { CardResource } from "./resources/CardResource.js";
import { EjaFaqResource } from "./resources/ejaFaqResource.js";
import { ProfisFaqResource } from "./resources/profisFaqResource.js";
import { FooterResource } from "./resources/FooterResource.js";
import { HomeResource } from "./resources/HomeResource.js";
import { ejaStudentResource } from "./resources/ejaStudentResource.js";
import { profisStudentResource } from "./resources/profisStudentResource.js";
import { translations } from "./translate.js";
import { componentLoader, Components } from "./components/components.js";
import { ejaSubmitFormTitleResource } from "./resources/ejaSubmitFormTitleResource.js";
import { profisSubmitFormTitleResource } from "./resources/profisSubmitFormTitleResource.js";
import { ejaCourseResource } from "./resources/ejaCourseResource.js";
import { StaffResource } from "./resources/StaffResource.js";
import { CoordinatorsResource } from "./resources/CoordinatorsResource.js";
import { SupervisionResource } from "./resources/SupervisionResource.js";
import { TeachingStaffResource } from "./resources/TeachingStaffResource.js";
import { EventResource } from "./resources/EventResource.js";
import { studentAreaURLResource } from "./resources/studentAreaURLResource.js";

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
    StaffResource,
    CoordinatorsResource,
    SupervisionResource,
    TeachingStaffResource,
    EventResource,
    HomeResource,
    studentAreaURLResource,
    EjaFaqResource,
    ProfisFaqResource,
    FooterResource,
    ejaSubmitFormTitleResource,
    profisSubmitFormTitleResource,
  ],
  componentLoader: componentLoader,
  locale: {
    language: "pt-BR",
    availableLanguages: ["pt-BR", "en"],
    translations: translations,
  },
  branding: {
    companyName: "CESAS",
    logo: "/uploads/logo/logo-cesas.png",
    softwareBrothers: false,
    favicon: "uploads/logo/favicon.ico",
    withMadeWithLove: false,
  },
  dashboard: {
    component: Components.HomePage,
  },
  assets: {
    styles: ["/custom-admin.css"],
  },
});
admin.watch();
