import {
  getMenuSchedules,
  getMenuScheduleById,
  getMenuSchedulesByMenuItemId,
  getActiveMenuSchedulesByWeek,
  addMenuSchedule,
  updateMenuSchedule,
  deleteMenuSchedule,
} from "../models/menu_schedule-model.js";

// GET all menu schedules
const getAllMenuSchedules = async (req, res) => {
  try {
    const schedules = await getMenuSchedules();

    res.json(schedules);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get menu schedules",
    });
  }
};

// GET one menu schedule
const getSingleMenuSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await getMenuScheduleById(id);

    if (!schedule) {
      return res.status(404).json({
        error: "Menu schedule not found",
      });
    }

    res.json(schedule);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get menu schedule",
    });
  }
};

// GET schedules for one menu item
const getSchedulesByMenuItemId = async (req, res) => {
  try {
    const { menuItemId } = req.params;

    const schedules = await getMenuSchedulesByMenuItemId(menuItemId);

    res.json(schedules);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get menu item schedules",
    });
  }
};

// GET active schedules for one week
const getActiveSchedulesByWeek = async (req, res) => {
  try {
    const { weekStartDate } = req.params;

    const schedules = await getActiveMenuSchedulesByWeek(weekStartDate);

    res.json(schedules);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get active menu schedules",
    });
  }
};

// CREATE menu schedule
const createMenuSchedule = async (req, res) => {
  try {
    const { menu_item_id, day_of_week, week_start_date, is_active } = req.body;

    const result = await addMenuSchedule(
      menu_item_id,
      day_of_week,
      week_start_date,
      is_active,
    );

    res.status(201).json({
      message: "Menu schedule created successfully",
      schedule_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create menu schedule",
    });
  }
};

// UPDATE menu schedule
const editMenuSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const { menu_item_id, day_of_week, week_start_date, is_active } = req.body;

    const result = await updateMenuSchedule(
      id,
      menu_item_id,
      day_of_week,
      week_start_date,
      is_active,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Menu schedule not found",
      });
    }

    res.json({
      message: "Menu schedule updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update menu schedule",
    });
  }
};

// DELETE menu schedule
const removeMenuSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMenuSchedule(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Menu schedule not found",
      });
    }

    res.json({
      message: "Menu schedule deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete menu schedule",
    });
  }
};

export {
  getAllMenuSchedules,
  getSingleMenuSchedule,
  getSchedulesByMenuItemId,
  getActiveSchedulesByWeek,
  createMenuSchedule,
  editMenuSchedule,
  removeMenuSchedule,
};
