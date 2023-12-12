import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  gender: String,
  address: String,
});

export default mongoose.model("User", userSchema);
