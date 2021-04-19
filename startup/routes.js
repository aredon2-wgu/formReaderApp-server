import express from "express";
import cors from "cors";
import helmet from "helmet";
import documents from "../routes/documents.js";
import users from "../routes/users.js";
import home from "../routes/home.js";
import auth from "../routes/auth.js"; //Authentication
import error from "../middleware/error.js";
import files from "../routes/files.js";

export default function (app) {
  //Middleware installation
  app.use(cors());
  app.use(express.json());
  // app.use(express.static("public"));
  app.use(
    "/static/downloads",
    express.static(
      "/Volumes/Samsung Portable SSD T5 Media/WGU Shool Stuff/Capstone/formReaderApp/resources/static/downloads"
    )
  );
  // app.use(
  //   "/static/uploads",
  //   express.static(
  //     "/Volumes/Samsung Portable SSD T5 Media/WGU Shool Stuff/Capstone/formReaderApp/resources/static/uploads"
  //   )
  // );
  app.use(helmet());
  app.use("/api/documents", documents); //for any routes that start with /api/documents use the ./routes/documents.js router
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/files", files);
  app.use("/", home);
  app.use(error);
}
