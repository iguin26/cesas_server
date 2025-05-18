import { Course } from "../../models/Course.js";
import { Components } from "../components/components.js";
import {
  uploadBeforeHook,
  uploadAfterHook,
} from "../actions/upload-image.hook.js";

export const CourseResource = {
  resource: Course,
  options: {
    properties: {
      profilePhotoLocation: {
        isVisible: false,
      },

      uploadImage: {
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
