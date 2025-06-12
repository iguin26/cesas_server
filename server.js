import "dotenv/config";
import { app } from "./src/app.js";
import { Admin } from "./src/models/Admin.js";
import {sequelize} from "./src/config/db.js"
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

// Admin.sync({ alter: true }) // ou force: true se quiser forçar recriação
//   .then(() => {
//     console.log('Tabelas sincronizadas');
//   })
//   .catch(console.error);
// sequelize.sync();

import { create } from "./src/models/Admin.js";

const initAdmin = async () => {
  const existing = await Admin.findOne({ where: { login: process.env.ADMIN_LOGIN } });
  if (!existing) {
    await create(process.env.ADMIN_LOGIN, process.env.ADMIN_PASS);
    console.log("Admin criado com sucesso");
  }
};

const start = async () => {
  try {
    await sequelize.sync();
    await initAdmin(); // <-- aqui está a mágica

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
  }
};

start();

