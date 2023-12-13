import jwt from "jsonwebtoken";
import { HttpStatusCodes } from "../utils/status.code";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization header is missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(HttpStatusCodes.FORBIDDEN).json({ message: "Invalid token" });
  }
};
