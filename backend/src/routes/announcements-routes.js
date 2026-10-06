import express from "express";

import {
  getAllAnnouncements,
  getSingleAnnouncement,
  createAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} from "../controllers/announcements-controller.js";

const router = express.Router();

router.get("/", getAllAnnouncements); // GET all announcements
router.get("/:id", getSingleAnnouncement); // GET one announcement
router.post("/", createAnnouncement); // CREATE announcement
router.put("/:id", editAnnouncement); // UPDATE announcement
router.delete("/:id", removeAnnouncement); // DELETE announcement

export default router;
