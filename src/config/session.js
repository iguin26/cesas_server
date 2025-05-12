import Connect from "connect-pg-simple";
import session from "express-session";

const ConnectSession = Connect(session);

export const sessionStore = new ConnectSession({
  conObject: {
    connectionString: "postgres://postgres:8659@localhost:5432/cesas",
    ssl: process.env.NODE_ENV === "production",
  },
  tableName: "session",
  createTableIfMissing: true,
});

export const sessionConfig = {
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  secret: "sessionsecret",
  cookie: {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
  },
  name: "adminjs",
};
