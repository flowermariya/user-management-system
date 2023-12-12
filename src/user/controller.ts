import { CreateUserDto } from "./dto/createUser.input";
import { validate } from "class-validator";
import User from "./model";
import express from "express";
import { UpdateUserDto } from "./dto/updateUser.input";

export async function createUser(req: express.Request, res: express.Response) {
  try {
    const createUserDto = new CreateUserDto(req?.body);
    const validationErrors = await validate(createUserDto);

    if (validationErrors.length > 0) {
      const formattedErrors = validationErrors.map(
        (error) => error.constraints
      );
      return res.status(400).json({ errors: formattedErrors });
    }

    const newUser = new User(createUserDto);
    await newUser.save();

    res.status(201).json({
      message: "User successfully created",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    res.status(200).json({
      message: "Users retrieved successfully",
      users: await User.find(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getUser(req: express.Request, res: express.Response) {
  try {
    const user = await User.findById({
      _id: req.params.id,
    });

    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with ID ${req.params.id}` });
    }

    res.status(200).json({
      message: `User with ID ${req.params.id} fetched successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateUser(req: express.Request, res: express.Response) {
  try {
    const user = await User.findById({
      _id: req.params.id,
    });

    const updateUserDto = new UpdateUserDto(req?.body);
    const validationErrors = await validate(updateUserDto);

    if (validationErrors.length > 0) {
      const formattedErrors = validationErrors.map(
        (error) => error.constraints
      );
      return res.status(400).json({ errors: formattedErrors });
    }

    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with ID ${req.params.id} to update` });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { ...updateUserDto },
      { new: true }
    );

    res.status(200).json({
      message: `User with ID ${req.params.id} updated successfully`,
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const user = await User.findById({
      _id: req?.params?.id,
    });

    if (!user) {
      res
        .status(404)
        .json({ message: `No user found with ID ${req.params.id} to delete` });
    }

    await User.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(200).json({
      message: `User with ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
