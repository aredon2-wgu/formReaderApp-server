import mongoose from "mongoose";
import config from "config";
import winston from "winston";

export default function () {
  // Connect to Database
  winston.info("Connecting to database...");
  mongoose
    .connect(
      `${config.get("dbConfig.host")}:${config.get(
        "dbConfig.port"
      )}/${config.get("dbConfig.dbName")}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    // .connect("mongodb://localhost:27017/formReaderDB")
    .then(() => winston.info("Connected to MongoDB..."));
}
