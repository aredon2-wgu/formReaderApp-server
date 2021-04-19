import mongoose from "mongoose";
import Joi from "joi";
import _ from "lodash";

// Create mongoose model to work with Document objects
// And Define our mongoose schema
const Document = mongoose.model(
  "Document",
  new mongoose.Schema({
    title: { type: String, required: true, trim: true, lowercase: true },
    firstName: { type: String, required: true, trim: true, lowercase: true },
    lastName: { type: String, required: true, trim: true, lowercase: true },
    sex: {
      type: String,
      required: true,
      enum: ["male", "female"],
      lowercase: true,
    },
    address: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true, lowercase: true },
    state: { type: String, required: true, trim: true, lowercase: true },
    zipCode: { type: String, required: true, lowercase: true },
    memberGroupNumber: { type: String, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true, lowercase: true },
    memberId: { type: String, trim: true, lowercase: true },
    insuranceProvider: { type: String, trim: true, lowercase: true },
    policyNumber: { type: String, trim: true, lowercase: true },
    creationDate: { type: Date, default: Date.now },
  })
);

function validateDocument(document) {
  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    sex: Joi.string().required().min(4).max(6),
    address: Joi.string().required().max(50),
    city: Joi.string().required().max(50),
    state: Joi.string().required().min(2).max(40),
    zipCode: Joi.string().required().min(5).max(5),
    memberGroupNumber: Joi.string().max(10).label("Member Group Number"),
    phoneNumber: Joi.string().min(10).max(12).label("Phone"),
    memberId: Joi.string().max(15).label("Member ID"),
    insuranceProvider: Joi.string().label("Insurance Provider"),
    policyNumber: Joi.string().max(15).label("Policy Number"),
  });

  return schema.validate(document);
}

export async function createDocument(document) {
  let newDoc = new Document(
    _.pick(document, [
      "title",
      "firstName",
      "lastName",
      "sex",
      "address",
      "city",
      "state",
      "zipCode",
      "memberGroupNumber",
      "phoneNumber",
      "memberId",
      "insuranceProvider",
      "policyNumber",
    ])
  );

  newDoc = await newDoc.save();
  return newDoc;
}

export async function getDocuments() {
  const documents = await Document.find();
  return documents;
}

export async function getDocument(id) {
  return Document.findById(id);
}

export async function updateDocument(id, updatedFields) {
  //Query First update - good for validating first before updating
  const document = await Document.findById(id);
  if (!document) return;

  document.set(updatedFields);
  const result = await document.save();
  return result;
}

export async function deleteDocument(id) {
  const result = await Document.deleteOne({ _id: id }); //deletes the first match only
  return result;
}

export async function deleteAndReturnDocument(id) {
  const deletedDocument = await Document.findByIdAndDelete(id); //returns the object that is deleted
  return deletedDocument;
}

// export const Document = document;
export const validate = validateDocument;
