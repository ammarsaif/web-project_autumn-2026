import express from "express";

import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  editCategory,
  removeCategory,
} from "../controllers/categories-controller.js";

import {
  authenticateToken,
  requireAdmin,
} from "../authentication/auth-middlewear.js";

const router = express.Router();

router.get("/", getAllCategories); // GET all categories
router.get("/:id", getSingleCategory); // GET one category
router.post("/", authenticateToken, requireAdmin, createCategory); // CREATE category
router.put("/:id", authenticateToken, requireAdmin, editCategory); // UPDATE category
router.delete("/:id", authenticateToken, requireAdmin, removeCategory); // DELETE category

export default router;
