import express from "express";
import { register, login } from "../controllers/authController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/profile", checkAuth, getProfile);

export default router;
