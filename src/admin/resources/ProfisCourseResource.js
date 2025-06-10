import { ProfisCourse} from "../../models/ProfisCourse.js";
import { Components } from "../components/components.js";
import {
  uploadBeforeHook,
  uploadAfterHook,
} from "../actions/course-upload-image.hook.js";

export const ProfisCourseResource = {
  resource: ProfisCourse,
  options: {
    listProperties: [
      "id",
      "name",
      "uploadImage",
      "start_date",
      "end_date",
    ],
    properties: {
      name: {
        position: 1,
      },
      description: {
        position: 2,
      },
      start_date: {
        position: 3,
      },
      end_date: {
        position: 4,
      },
      image: {
        isVisible: false,
        position: 5,
      },
      morningShiftAvailable: {
        position: 6,
      },
      afternoonShiftAvailable: {
        position: 7,
      },
      nightShiftAvailable: {
        position: 8
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
