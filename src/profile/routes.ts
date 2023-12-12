import express from "express";
import { uploadProfileImage } from "./controller";
import multer from "multer";
import { HttpStatusCodes } from "../utils/status.code";

const router = express.Router();

const multerUpload = multer({ storage: multer.memoryStorage() });

router.post(
  "/uploadImage",
  multerUpload.single("file"),
  async (req: any, res: express.Response) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const result = await uploadProfileImage(req.file, req.query.user_id);
      return res
        .status(200)
        .json({ message: "File uploaded successfully", data: result });
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error uploading file", error: error.message });
    }
  }
);

export default router;
