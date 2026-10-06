import express from "express";

import {
  getAllMenuItems,
  getSingleMenuItem,
  createMenuItem,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menu_items-controller.js";

import {
  authenticateToken,
  requireAdmin,
} from "../authentication/auth-middlewear.js";

const router = express.Router();

router.get("/", getAllMenuItems); // GET all menu items
router.get("/:id", getSingleMenuItem); // GET one menu item
router.post("/", authenticateToken, requireAdmin, createMenuItem); // CREATE menu item
router.put("/:id", authenticateToken, requireAdmin, editMenuItem); // UPDATE menu item
router.delete("/:id", authenticateToken, requireAdmin, removeMenuItem); // DELETE menu item

export default router;
