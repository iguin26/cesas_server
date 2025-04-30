import express from "express";
import "dotenv/config";
import { router } from "./src/routes.js";

const PORT = process.env.PORT;
const app = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
