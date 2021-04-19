import express from "express";
import logging from "./startup/logging.js";
import routes from "./startup/routes.js";
import connectDB from "./startup/db.js";
import configStart from "./startup/config.js";
import config from "config";
import winston from "winston";
import prod from "./startup/prod.js";

//Create app express object
const app = express();
logging();
routes(app);
connectDB();
configStart(app);
prod(app);

// Read the PORT environment variable
// to set environment var on mac/unix: export PORT=5000
const port = config.get("server.port") || 3000;
//Start the server
app.listen(port, () => winston.info(`Listening on port ${port}...`));
