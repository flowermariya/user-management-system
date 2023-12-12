import { CreateProfileImageDto } from "./dto/uploadProfileImage.input";
import Profile from "./model";
import express from "express";
import { HttpStatusCodes } from "../utils/status.code";
import AWS from "aws-sdk";
import { File } from "multer";
import { simplifyFileName } from "./utils/simplyfyFileName";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const uploadProfileImage = async (file: File, user_id: string) => {
  const modifiedFileName = await simplifyFileName(file.originalname);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: modifiedFileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3.upload(params).promise();

    const newImage = new Profile({
      profile_image_url: modifiedFileName,
      user_id,
    });

    await newImage.save();

    return newImage;
  } catch (error) {
    throw error;
  }
};
