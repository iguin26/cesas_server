import { Home } from "../../models/Home.js";
import { Components } from "../components/components.js";
import {
  uploadBeforeHook,
  uploadAfterHook,
} from "../actions/upload-image.hook.js";

export const HomeResource = {
  resource: Home,
  options: {
    listProperties: ["id", "text", "uploadImage"],

    properties: {
      id: {
        position: 1,
      },
      text: {
        position: 2,
      },
      uploadImage: {
        type: "mixed",
        position: 3,
        isVisible: { list: true, edit: true, filter: false, show: false },
        components: {
          edit: Components.Edit,
          list: Components.List,
        },
      },
      image: {
        isVisible: false,
      },
    },

    actions: {
      new: {
        isAccessible: false,
        before: [uploadBeforeHook],
        after: [uploadAfterHook],
      },
      list: {
        showFilter: true,
      },
      delete: {
        isAccessible: false,
      },
      show: {
        isVisible: true,
      },
      edit: {
        before: [uploadBeforeHook],
        after: [uploadAfterHook],
      },
    },
  },
};
