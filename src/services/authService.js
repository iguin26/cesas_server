import { Admin } from "../models/Admin.js";
import { compare } from "bcrypt";

const rawEmail = await Admin.findOne({
  attributes: ["login"],
  raw: true,
});
const rawPassword = await Admin.findOne({
  attributes: ["password"],
  raw: true,
});

const DEFAULT_ADMIN = {
  email: rawEmail.login,
  password: rawPassword.password,
};
export const authenticate = async (email, password) => {
  const check = await compare(password, DEFAULT_ADMIN.password);

  if (email === DEFAULT_ADMIN.email && check) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
