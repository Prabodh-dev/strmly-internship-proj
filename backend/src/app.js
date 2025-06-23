import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import getVideoRoutes from "./routes/getVideoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use(limit);

app.use("/api/auth", authRoutes);
app.use("/api/video", uploadRoutes);
app.use("/api/allvideo", getVideoRoutes);

app.use(errorHandler);
export default app;
