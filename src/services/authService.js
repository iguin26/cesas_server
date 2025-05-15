import "dotenv/config";

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_LOGIN,
  password: process.env.ADMIN_PASS,
};

export const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};
