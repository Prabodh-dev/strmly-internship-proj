import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
