import mongoose from "mongoose";
import config from "config";
import logger from "./logger.js"

 async function connect() {
  const dbURI = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbURI);
    logger.info("Database connected!");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

export default connect;
