import express from "express";
import config from "config";
import connect from "./utils/connect.js";
import logger from "./utils/logger.js";
import routes from "./routes.js";
import { deserializeUser } from "./middleware/deserializeUser.js";
import dotenv from "dotenv";



const port = config.get<number>("port") || 5000;
const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}.`);
  await connect();

  routes(app);
});
