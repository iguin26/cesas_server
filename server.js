import "dotenv/config";
import { app } from "./src/app.js";
import { sequelize } from "./src/models/index.js";
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
// sequelize.sync();
