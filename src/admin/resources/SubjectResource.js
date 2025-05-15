import { Subject } from "../../models/Subject.js";

export const SubjectResource = {
  resource: Subject,
  options: {
    properties: {
      secret_key: {
        isVisible: {
          edit: false,
          show: true,
          list: false,
          filter: true,
        },
      },
    },
    listProperties: ["id", "name"],
    editProperties: ["name", "secret_key"],
  },
};
