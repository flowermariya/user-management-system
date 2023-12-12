import express from "express";
import { handleS3Image } from "./controller";
import multer from "multer";

const router = express.Router();

const multerUpload = multer({ storage: multer.memoryStorage() });

router.post("/uploadImage", multerUpload.single("file"), handleS3Image);

export default router;
