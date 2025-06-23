import { Supervision } from "../../models/Supervision.js";



export const SupervisionResource = {
  resource: Supervision,
  options: {
    listProperties: ["id","member"],
    properties: {
      member: {
        position: 2,
      },
    },

    actions: {
      new: { isAccessible: true },
      edit: {isAccessible: true},
      delete: { isAccessible: true},
    },
  },
};
