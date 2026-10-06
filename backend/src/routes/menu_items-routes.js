import express from "express";

import {
  getAllMenuItems,
  getSingleMenuItem,
  createMenuItem,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menu_items-controller.js";

const router = express.Router();

router.get("/", getAllMenuItems); // GET all menu items
router.get("/:id", getSingleMenuItem); // GET one menu item
router.post("/", createMenuItem); // CREATE menu item
router.put("/:id", editMenuItem); // UPDATE menu item
router.delete("/:id", removeMenuItem); // DELETE menu item

export default router;
