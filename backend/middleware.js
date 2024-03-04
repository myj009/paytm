import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(403).send();
  }
  const token = authToken.split(" ")[1];

  try {
    const jwtToken = jwt.verify(token, JWT_SECRET);
    req.userId = jwtToken.userId;
    next();
  } catch (e) {
    return res.status(403).send();
  }
}
