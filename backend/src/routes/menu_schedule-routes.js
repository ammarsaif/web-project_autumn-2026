import express from "express";

import {
  getAllMenuSchedules,
  getSingleMenuSchedule,
  getSchedulesByMenuItemId,
  getActiveSchedulesByWeek,
  createMenuSchedule,
  editMenuSchedule,
  removeMenuSchedule,
} from "../controllers/menu_schedule-controller.js";

const router = express.Router();

// GET all menu schedules
router.get("/", getAllMenuSchedules);

// GET schedules for one menu item
router.get("/menu-item/:menuItemId", getSchedulesByMenuItemId);

// GET active schedules for one week
router.get("/week/:weekStartDate", getActiveSchedulesByWeek);

// GET one menu schedule
router.get("/:id", getSingleMenuSchedule);

// CREATE menu schedule
router.post("/", createMenuSchedule);

// UPDATE menu schedule
router.put("/:id", editMenuSchedule);

// DELETE menu schedule
router.delete("/:id", removeMenuSchedule);

export default router;
