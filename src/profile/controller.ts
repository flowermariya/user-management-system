import Profile from "./model";
import express from "express";
import { HttpStatusCodes } from "../utils/status.code";
import AWS from "aws-sdk";
import { File } from "multer";
import { simplifyFileName } from "../utils/simplyfyFileName";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const handleS3Image = async (req: any, res: express.Response) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const result = await uploadProfileImage(req.file, req.query.user_id);
    return res
      .status(HttpStatusCodes.OK)
      .json({ message: "File uploaded successfully", data: result });
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error uploading file", error: error.message });
  }
};

export const uploadProfileImage = async (file: File, user_id: string) => {
  const modifiedFileName = await simplifyFileName(file.originalname);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: modifiedFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const res = await s3.upload(params).promise();

    const updateData = {
      profile_image_url: res?.Location,
      user_id,
    };

    console.log("Update Params:", { user_id, updateData });

    const newImage = await Profile.findOneAndUpdate({ user_id }, updateData, {
      new: true,
      upsert: true,
    });

    console.log("findOneAndUpdate Result:", newImage);

    return newImage;
  } catch (error) {
    throw error;
  }
};
