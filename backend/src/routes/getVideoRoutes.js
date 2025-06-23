import express from "express";
import { getAllVideos } from "../controllers/getVideoContoller.js";
const router = express.Router();

router.get("/videos", getAllVideos);

export default router;
