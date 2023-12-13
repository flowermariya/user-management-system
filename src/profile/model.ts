import mongoose from "mongoose";
import { baseSchemaFields } from "../base.model";

const profileSchema = new mongoose.Schema({
  ...baseSchemaFields,
  user_id: String,
  profile_image_url: String,
});

export default mongoose.model("Profile", profileSchema);
