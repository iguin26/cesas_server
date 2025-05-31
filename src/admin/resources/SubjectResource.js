import { Subject } from "../../models/index.js";

export const SubjectResource = {
  resource: Subject,
  options: {
    listProperties: ["id", "name"],
    editProperties: ["name"],
  },
};
