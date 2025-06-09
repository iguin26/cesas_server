import { Course } from "../../models/index.js";
import { Components } from "../components/components.js";
import {
  uploadBeforeHook,
  uploadAfterHook,
} from "../actions/upload-image.hook.js";

export const CourseResource = {
  resource: Course,
  options: {
    listProperties: [
      "id",
      "name",
      "subject",
      "uploadImage",
      "show",
      "start_date",
      "end_date",
    ],
    properties: {
      image: {
        isVisible: false,
      },
      name: {
        position: 1,
      },
      subject: {
        position: 2,
      },
      show: {
        position: 3,
      },
      start_date: {
        position: 4,
      },
      end_date: {
        position: 5,
      },

      uploadImage: {
        isRequired: true,
        type: "mixed",
        isVisible: { list: true, edit: true, filter: false, show: false },
        components: {
          edit: Components.Edit,
          list: Components.List,
        },
      },
    },
    actions: {
      new: {
        before: [uploadBeforeHook],
        after: [uploadAfterHook],
      },
      edit: {
        before: [uploadBeforeHook],
        after: [uploadAfterHook],
      },
      show: {
        isVisible: false,
      },
    },
  },
};
