import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./controller";
import { createValidation, updateValidation } from "./validation";

const router = express.Router();

router.post("/createUser", createValidation, createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUser);
router.patch("/updateUser/:id", updateValidation, updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
