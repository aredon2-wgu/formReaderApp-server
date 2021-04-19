import express from "express";
import auth from "../middleware/auth.js"; //Authorization
import admin from "../middleware/admin.js";
import {
  validate,
  getDocuments,
  createDocument,
  getDocument,
  updateDocument,
  deleteAndReturnDocument,
} from "../models/document.js";

const router = express.Router();

// Define our routes
router.get("/", async (req, res, next) => {
  // return list of all document objects from database
  const documents = await getDocuments();
  res.send(documents);
});

router.post("/", auth, async (req, res) => {
  // validate request body first and return 400 error if validation fails
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Create new document from request body
  const document = await createDocument(req.body);
  res.send(document);
});

router.get("/:id", async (req, res) => {
  // return specific document from list of all document objects from database
  // res.send(req.params); // for route parameters
  // res.send(req.query); // for query strings
  const document = await getDocument(req.params.id);
  if (!document) {
    return res.status(404).send("The course with the given ID was not found.");
  }
  res.send(document);
});

router.put("/:id", auth, async (req, res) => {
  // Look up the document
  // if no document exist, return 404 resource not found

  // validate the document
  // If invalid, return 400 - bad request
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // update the document
  const document = await updateDocument(req.params.id, req.body);
  if (!document) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  // return the updated document to the client
  res.send(document);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  // Look up the course
  // if doesn't exist, return 404
  // const document = documentList.find((d) => d.id === parseInt(req.params.id));
  const document = await deleteAndReturnDocument(req.params.id);
  if (!document) {
    return res.status(404).send("The course with the given ID was not found.");
  }

  // return the same course
  res.send(document);
});

export default router;
