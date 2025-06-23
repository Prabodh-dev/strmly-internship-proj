import express from "express";
import { register, login, getProfile } from "../controllers/authController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import { validateInputs } from "../middleware/validateInputs.js"; // Make sure this file exists

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateInputs,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateInputs,
  login
);

router.get("/profile", checkAuth, getProfile);

export default router;
