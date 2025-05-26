import { Home } from "../../models/Home.js";

export const HomeResource = {
  resource: Home,
  options: {
    listProperties: ["text", "image"],

    properties: {
      text: {
        position: 1,
      },
      image: {
        position: 2,
      },
    },

    actions: {
      new: {
        isAccessible: false,
      },
      list: {
        showFilter: false,
      },
      delete: {
        isAccessible: false,
      },
    },
  },
};
