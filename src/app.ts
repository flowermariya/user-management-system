import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./user/routes";
import profileRoutes from "./profile/routes";
import loginRoutes from "./login/route";

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(express.json());

app.use("/user", userRoutes);
app.use("/profile", profileRoutes);
app.use("/login", loginRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
