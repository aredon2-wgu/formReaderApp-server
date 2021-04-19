import winston from "winston";

export default function (err, req, res, next) {
  //Log the error
  winston.error(err.message, err);

  //Return 500 code
  res.status(500).send("Something failed.");
}
