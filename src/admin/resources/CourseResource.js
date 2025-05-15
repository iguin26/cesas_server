import { Course } from "../../models/Course.js";

export const CourseResource = {
  resource: Course,
  options: {
    properties: {
      uploadImage: {
        components: {},
      },
    },
  },
};
