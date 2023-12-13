import mongoose from "mongoose";
import { baseSchemaFields } from "../base.model";

const userSchema = new mongoose.Schema({
  ...baseSchemaFields,
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
