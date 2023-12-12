import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "./controller";

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUser/:id", getUser);
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
