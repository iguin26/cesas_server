import { sequelize } from "../config/db.js";
import { Course } from "./Course.js";
import { Subject } from "./Subject.js";
import { Student } from "./Student.js";

Course.belongsTo(Subject, {
  foreignKey: "subject",
  onDelete: "SET NULL",
});
Subject.hasMany(Course, {
  foreignKey: "subject",
});

// Course.hasMany(Student, {
//   foreignKey: "course",
//   onDelete: "SET NULL",
// });

// Student.belongsTo(Course, {
//   foreignKey: "course",
//   onDelete: "SET NULL",
// });

export { sequelize, Course, Subject, Student };
