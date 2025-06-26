import { ejaCourse} from "../../models/ejaCourse.js";
import { Components } from "../components/components.js";
import {
  uploadBeforeHook,
  uploadAfterHook,
} from "../actions/upload-image.hook.js";

export const ejaCourseResource = {
  resource: ejaCourse,
  options: {
    listProperties: [
      "id",
      "name",
      "uploadImage",
    ],
    properties: {
      name: {
        position: 1,
      },
      description: {
        position: 2,
      },
      image: {
        isVisible: false,
        position: 3,
      },
      morningShiftAvailable: {
        position: 4,
      },
      afternoonShiftAvailable: {
        position: 5,
      },
      nightShiftAvailable: {
        position: 6
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
