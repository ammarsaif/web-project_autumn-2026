import pool from "../../database-connection.js";

// GET all menu schedules
const getMenuSchedules = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM menu_schedule
  `);

  return rows;
};

// GET one menu schedule
const getMenuScheduleById = async (schedule_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM menu_schedule
    WHERE schedule_id = ?
    `,
    [schedule_id],
  );

  return rows[0];
};

// GET schedules for one menu item
const getMenuSchedulesByMenuItemId = async (menu_item_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM menu_schedule
    WHERE menu_item_id = ?
    ORDER BY week_start_date, day_of_week
    `,
    [menu_item_id],
  );

  return rows;
};

// GET active schedules for one week
const getActiveMenuSchedulesByWeek = async (week_start_date) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM menu_schedule
    WHERE week_start_date = ?
      AND is_active = TRUE
    ORDER BY day_of_week
    `,
    [week_start_date],
  );

  return rows;
};

// CREATE menu schedule
const addMenuSchedule = async (
  menu_item_id,
  day_of_week,
  week_start_date,
  is_active,
) => {
  const [result] = await pool.query(
    `
    INSERT INTO menu_schedule
    (menu_item_id, day_of_week, week_start_date, is_active)
    VALUES (?, ?, ?, ?)
    `,
    [menu_item_id, day_of_week, week_start_date, is_active],
  );

  return result;
};

// UPDATE menu schedule
const updateMenuSchedule = async (
  schedule_id,
  menu_item_id,
  day_of_week,
  week_start_date,
  is_active,
) => {
  const [result] = await pool.query(
    `
    UPDATE menu_schedule
    SET menu_item_id = ?,
        day_of_week = ?,
        week_start_date = ?,
        is_active = ?
    WHERE schedule_id = ?
    `,
    [menu_item_id, day_of_week, week_start_date, is_active, schedule_id],
  );

  return result;
};

// DELETE menu schedule
const deleteMenuSchedule = async (schedule_id) => {
  const [result] = await pool.query(
    `
    DELETE FROM menu_schedule
    WHERE schedule_id = ?
    `,
    [schedule_id],
  );

  return result;
};

export {
  getMenuSchedules,
  getMenuScheduleById,
  getMenuSchedulesByMenuItemId,
  getActiveMenuSchedulesByWeek,
  addMenuSchedule,
  updateMenuSchedule,
  deleteMenuSchedule,
};
