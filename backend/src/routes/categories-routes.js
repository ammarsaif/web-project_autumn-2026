import express from "express";

import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  editCategory,
  removeCategory,
} from "../controllers/categories-controller.js";

const router = express.Router();

router.get("/", getAllCategories); // GET all categories
router.get("/:id", getSingleCategory); // GET one category
router.post("/", createCategory); // CREATE category
router.put("/:id", editCategory); // UPDATE category
router.delete("/:id", removeCategory); // DELETE category

export default router;
