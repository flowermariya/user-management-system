import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./user/routes";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
