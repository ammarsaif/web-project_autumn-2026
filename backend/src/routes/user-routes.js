import express from "express";

import {
  getAllUsers,
  getSingleUser,
  createUser,
  editUser,
  removeUser,
} from "../controllers/users-controller.js";

const router = express.Router();

router.get("/", getAllUsers); // Get all users
router.get("/:id", getSingleUser); // get a single user
router.post("/", createUser); // create a user
router.put("/:id", editUser); // edit a user
router.delete("/:id", removeUser); // delete a user

export default router;
