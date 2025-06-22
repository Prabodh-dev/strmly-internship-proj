import dotenv from "dotenv";
import app from "./src/app.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Mongodb connected successfuly");
    app.listen(PORT, () => {
      console.log(`server is runing on PORT  ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB connection error", err);
  });
