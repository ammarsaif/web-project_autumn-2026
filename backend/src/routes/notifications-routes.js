import express from "express";

import {
  getAllNotifications,
  getSingleNotification,
  createNotification,
  editNotification,
  removeNotification,
} from "../controllers/notifications-controller.js";

const router = express.Router();

router.get("/", getAllNotifications); // GET all notifications
router.get("/:id", getSingleNotification); // GET one notification
router.post("/", createNotification); // CREATE notification
router.put("/:id", editNotification); // UPDATE notification
router.delete("/:id", removeNotification); // DELETE notification

export default router;
