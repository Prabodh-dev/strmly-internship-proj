import asyncHandler from "express-async-handler";
import Video from "../models/Video.js";

export const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find()
    .sort({ createdAt: -1 })
    .populate("user", "name _id");

  const format = videos.map((video) => ({
    id: video._id,
    title: video.title,
    videoUrl: video.videoUrl,
    user: {
      id: video.user._id,
      name: video.user.name,
    },
    uploadedAt: video.createdAt,
  }));
  res.status(200).json(format);
});
