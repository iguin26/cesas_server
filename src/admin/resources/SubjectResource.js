import { Subject } from "../../models/Subject.js";

export const SubjectResource = {
  resource: Subject,
  options: {},
  listProperties: ["id", "name"],
  editProperties: ["name"],
};
