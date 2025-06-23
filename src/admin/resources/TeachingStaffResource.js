
import { TeachingStaff } from "../../models/TeachingStaff.js";

export const TeachingStaffResource = {
  resource: TeachingStaff,
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
