import express from "express";

import {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  removeUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getSingleUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", removeUser);

export default router;
