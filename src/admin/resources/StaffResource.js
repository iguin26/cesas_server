
import { Staff } from "../../models/Staff.js";

export const StaffResource = {
  resource: Staff,
  options: {
    listProperties: ["id","director", "vicedirector", "secretary"],
    properties: {
      director: {
        position: 2,
      },
      vicedirector: {
        position: 3,
      },
      secretary: {
        position: 4,
      },
    },

    actions: {
      new: { isAccessible: true },
      edit: {isAccessible: true},
      delete: { isAccessible: true},
    },
  },
};
