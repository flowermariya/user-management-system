import User from "./model";
import express from "express";

export async function createUser(req: express.Request, res: express.Response) {
  try {
    const { first_name, last_name, email, phone, gender, address } = req?.body;

    const newUser = new User({
      first_name,
      last_name,
      email,
      phone,
      gender,
      address,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    res.status(201).json({
      message: "All users fetched successfully",
      user: await User.find(),
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
        .status(500)
        .json({ message: `User with id ${req.params.id} Not Found` });
    }

    res.status(201).json({
      message: "User fetched successfully",
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

    const data = req.body;

    console.log(">>data", data);

    if (!user) {
      res
        .status(500)
        .json({ message: `User with id ${req.params.id} Not Found To Update` });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { ...data },
      { new: true }
    );

    res.status(201).json({
      message: "User updated successfully",
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
        .status(500)
        .json({ message: `User with id ${req.params.id} Not Found To Delete` });
    }

    await User.findByIdAndDelete({
      _id: req.params.id,
    });

    res.status(201).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
