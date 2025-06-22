import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { createToken } from "../utils/token.js";
import { hashPassword, comparePasswords } from "../utils/hash.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const before = await User.findOne({ email });
  if (before) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = createToken({ id: user._id, role: user.role });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email address");
  }

  const comparePass = await comparePasswords(password, user.password);
  if (!comparePass) {
    res.status(400);
    throw new Error("Invalid password");
  }

  const token = createToken({ id: user._id, role: user.role });

  res.status(200).json({
    id: user._id,
    email: user.email,
    token,
  });
});

export const getProfile = (req, res) => {
  res.status(200).json(req.user);
};
