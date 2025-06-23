import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";

export const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const video = req.file;

  if (!video) {
    res.status(400);
    throw new Error("video file not uploaded");
  }

  const createVideo = await Video.create({
    title,
    description,
    videoUrl: video.path,
    publicId: video.filename,
    user: req.user._id,
  });

  res.status(201).json({
    message: "uploaded successfully",
    video: createVideo,
  });
});
