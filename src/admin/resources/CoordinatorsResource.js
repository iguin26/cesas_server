import { Coordinators } from "../../models/Coordinators.js";



export const CoordinatorsResource = {
  resource: Coordinators,
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
