import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./user/routes";
import profileRoutes from "./profile/routes";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

app.use("/user", userRoutes);

app.use("/profile", profileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
