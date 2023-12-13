import { CreateUserDto } from "./dto/createUser.input";
import User from "./model";
import Authentication from "../login/model";
import Profile from "../profile/model";
import express from "express";
import { UpdateUserDto } from "./dto/updateUser.input";
import { HttpStatusCodes } from "../utils/status.code";

export async function createUser(req: express.Request, res: express.Response) {
  try {
    const createUserDto = new CreateUserDto(req?.body);

    const newUser = new User(createUserDto);
    await newUser.save();

    const newAuthentication = new Authentication({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await newAuthentication.save();

    res.status(HttpStatusCodes.CREATED).json({
      message: "User successfully created",
      user: newUser,
    });
  } catch (error) {
    // Handling duplicate errors
    if (error.code === 11000) {
      res.status(409).json({ message: `EmailId already exists` });
    } else {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}

export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    res.status(HttpStatusCodes.OK).json({
      message: "Users retrieved successfully",
      users: await User.find(),
    });
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const findUser = await User.findById({
      _id: req.params.id,
    });

    if (!findUser) {
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: `No user found with ID ${req.params.id}` });
    }

    const profileImage = await Profile.findOne({ user_id: req.params.id });

    const user = {
      ...findUser.toObject(),
      profile_image: profileImage ? profileImage.profile_image_url : null,
    };

    res.status(HttpStatusCodes.OK).json({
      message: `User with ID ${req.params.id} fetched successfully`,
      user,
    });
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export async function updateUser(req: any, res: express.Response) {
  try {
    const user = await User.findById({
      _id: req.params.id,
    });

    const updateUserDto = new UpdateUserDto(req?.body);

    if (!user) {
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: `No user found with ID ${req.params.id} to update` });
    }

    if (req?.user?.userId !== req?.params?.id) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to update this user" });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { ...updateUserDto },
      { new: true }
    );

    res.status(HttpStatusCodes.OK).json({
      message: `User with ID ${req.params.id} updated successfully`,
      updatedUser,
    });
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export async function deleteUser(req: any, res: express.Response) {
  try {
    const user = await User.findById({
      _id: req?.params?.id,
    });

    if (!user) {
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: `No user found with ID ${req.params.id} to delete` });
    }

    if (req?.user?.userId !== req?.params?.id) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: "You are not authorized to delete this user" });
    }

    await User.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(HttpStatusCodes.OK).json({
      message: `User with ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
