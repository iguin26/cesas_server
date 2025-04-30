import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "get home" });
});

app.get("auth/login", (req, res) => {
  res.status(200).send({ msg: "get login page" });
});

app.get("auth/register", (req, res) => {
  res.status(200).send({ msg: "get register page" });
});

app.get("/courses/:page", (req, res) => {
  res.status(200).send({ msg: "get cours es  page" });
});

app.get("/faq", (req, res) => {
  res.status(200).send({ msg: "get faq page" });
});
