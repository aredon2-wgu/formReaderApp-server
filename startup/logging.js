import winston from "winston";
import "winston-mongodb";
import "express-async-errors";
import config from "config";
import path from "path";
import fs from "fs";

const logDir = "logs";

export default function () {
  //Create log directory if doesn't exist
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  //Catching unexpected exceptions
  winston.exceptions.handle(
    new winston.transports.File({
      filename: path.join(logDir, "uncaughtExceptions.log"),
    }),
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );

  //Setup winston logging to file and database
  winston.add(
    new winston.transports.File({
      filename: path.join(logDir, "logfile.log"),
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: `${config.get("dbConfig.host")}:${config.get(
        "dbConfig.port"
      )}/${config.get("dbConfig.dbName")}`,
    })
  );
}
