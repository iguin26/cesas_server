import { create } from "../models/Admin.js";

const login = "CESAS-admin";
const password = "projetocesas";

async function createAdmin() {
  try {
    const admin = await create(login, password);
    console.log("Admin criado com sucesso");
  } catch (erro) {
    console.error("Erro ao criar admin", erro);
  }
}

createAdmin();
