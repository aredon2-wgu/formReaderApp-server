import jwt from "jsonwebtoken";
import config from "config";

export default function auth(req, res, next) {
  if (!config.get("requiresAuth")) return next();
  
  //authorization
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Access denied. User must be logged in.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token.");
  }
}
