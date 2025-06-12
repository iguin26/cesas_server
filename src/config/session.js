import Connect from "connect-pg-simple";
import session from "express-session";
import "dotenv/config";

const ConnectSession = Connect(session);

export const sessionStore = new ConnectSession({
  conObject: {
    connectionString: process.env.DB,
    ssl: process.env.NODE_ENV === "production",
  },
  tableName: "session",
  createTableIfMissing: true,
});

export const sessionConfig = {
  store: sessionStore,
  resave: true,
  saveUninitialized: true,
  secret: process.env.SECRET,
  cookie: {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
  },
  name: "adminjs",
};
