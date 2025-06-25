import { Card } from "../../models/Card.js";

export const CardResource = {
  resource: Card,
  options: {
    listProperties: ["id", "name", "title", "text", "show"],
    properties: {
      name: {
        position: 2,
      },
      title: {
        position: 3,
      },
      text: {
        position: 4,
      },
      show: {
        position: 5,
      },
    },
  },
};
