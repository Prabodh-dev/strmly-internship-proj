import { verifyToken } from "../utils/token.js";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized, No token provided" });
  }
  const token = authHead.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "unauthorized user" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
