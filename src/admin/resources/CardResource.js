import { Card } from "../../models/Card.js";

export const CardResource = {
  resource: Card,
  options: {
    listProperties: ["id","title", "description"],
    properties: {
      title: {
        position: 2,
      },
      description: {
        position: 3,
      },
    },

    actions: {
      new: { isAccessible: true },
      delete: { isAccessible: true},
    },
  },
};
