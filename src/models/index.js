import { sequelize } from "../config/db.js";
// import { Course } from "./ProfisCourse.js";
import { Subject } from "./Subject.js";
import { ejaStudent } from "./ejaStudent.js";

// Course.belongsTo(Subject, {
//   foreignKey: "subject",
//   onDelete: "SET NULL",
// });
// Subject.hasMany(Course, {
//   foreignKey: "subject",
// });

// Course.hasMany(Student, {
//   foreignKey: "course",
//   onDelete: "SET NULL",
// });

// Student.belongsTo(Course, {
//   foreignKey: "course",
//   onDelete: "SET NULL",
// });

export { sequelize, Subject, ejaStudent as Student };
