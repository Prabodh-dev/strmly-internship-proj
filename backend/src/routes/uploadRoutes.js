import express from "express";
import multer from "multer";
import { storage } from "../utils/cloudinary.js";
import { uploadVideo } from "../controllers/uploadController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/upload", checkAuth, upload.single("video"), uploadVideo);
export default router;
