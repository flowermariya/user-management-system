import mongoose from "mongoose";
import { baseSchemaFields } from "../base.model";
import bcrypt from "bcryptjs";

const loginSchema = new mongoose.Schema({
  ...baseSchemaFields,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

loginSchema.index({ email: 1 }, { unique: true });

loginSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export default mongoose.model("Authentication", loginSchema);
