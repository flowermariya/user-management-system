import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user_id: String,
  profile_image_url: String,
});

export default mongoose.model("Profile", profileSchema);
