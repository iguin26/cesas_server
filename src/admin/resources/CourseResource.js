import { Course } from "../../models/Course.js";
import { Components } from "../components/components.js";

export const CourseResource = {
  resource: Course,
  options: {
    properties: {
      profilePhotoLocation: {
        components: {
          edit: Components.Edit,
        },
      },
    },
  },
};
