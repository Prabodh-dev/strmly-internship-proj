import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { uploadVideo } from "../controllers/uploadController.js";
import { checkAuth } from "../middleware/authMiddleware.js";
import { body } from "express-validator";
import { validateInputs } from "../middleware/validateInputs.js";

const router = express.Router();
const upload = multer({ storage });

router.post(
  "/upload",
  checkAuth,
  upload.single("video"),
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  validateInputs,
  uploadVideo
);

export default router;
