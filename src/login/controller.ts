import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../user/model";
import { HttpStatusCodes } from "../utils/status.code";

const router = express.Router();

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user?.password)) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: `Invalid credentials` });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.first_name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRED_IN,
      }
    );

    res.status(HttpStatusCodes.OK).json({
      message: `Token`,
      token,
    });
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export default router;
