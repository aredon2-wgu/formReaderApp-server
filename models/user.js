import mongoose from "mongoose";
import Joi from "joi";
import _ from "lodash";
import config from "config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// And Define our mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  //generate new json web token
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

// Create mongoose model to work with Document objects
export const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}

export async function createUser(user) {
  // create new user object
  let newUser = new User(_.pick(user, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  newUser = await newUser.save(); //save and return new user object
  return newUser;
}

// export const Document = document;
export const validate = validateUser;
