import express from "express";
import path from "path";
import multer from "multer";
import auth from "../middleware/auth.js"; //Authorization
import _ from "lodash";
import py_analyzeFormData from "../services/pythonService.js";

const uploadPath = path.join(process.cwd(), "/resources/static/uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const router = express.Router();

const imageFilter = (req, file, cb) => {
  //Accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

let upload = multer({ storage, fileFilter: imageFilter });

router.post("/", auth, upload.single("filledForm"), async (req, res) => {
  try {
    const jsonResponse = await py_analyzeFormData(req.file.filename);
    res.send(jsonResponse);
  } catch (error) {
    console.log("Calling python script failed");
    res.send("Something has failed.");
  }
});

export default router;
