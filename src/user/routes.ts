import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./controller";
import { createValidation, updateValidation } from "./validation";
import { authenticateToken } from "../login/auth.middleware";

const router = express.Router();

router.post("/createUser", createValidation, createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUser);
router.patch(
  "/updateUser/:id",
  authenticateToken,
  updateValidation,
  updateUser
);
router.delete("/deleteUser/:id", authenticateToken, deleteUser);

export default router;
