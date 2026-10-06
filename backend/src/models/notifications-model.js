import pool from "../../database-connection.js";

// GET all notifications
const getNotifications = async () => {
  let conn;

  try {
    conn = await pool.getConnection();

    const [rows] = await conn.query(`
      SELECT * FROM notifications
    `);

    return rows;
  } finally {
    if (conn) conn.release();
  }
};

// GET one notification
const getNotificationById = async (notification_id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query(
      `
      SELECT * FROM notifications
      WHERE notification_id = ?
      `,
      [notification_id],
    );

    return rows[0];
  } finally {
    if (conn) conn.release();
  }
};

// CREATE notification
const addNotification = async (notification) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      INSERT INTO notifications
      (user_id, title, message, type, audience)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        notification.user_id,
        notification.title,
        notification.message,
        notification.type,
        notification.audience,
      ],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

// UPDATE notification
const updateNotification = async (notification_id, notification) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      UPDATE notifications
      SET user_id = ?,
          title = ?,
          message = ?,
          type = ?,
          audience = ?
      WHERE notification_id = ?
      `,
      [
        notification.user_id,
        notification.title,
        notification.message,
        notification.type,
        notification.audience,
        notification_id,
      ],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

// DELETE notification
const deleteNotification = async (notification_id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      DELETE FROM notifications
      WHERE notification_id = ?
      `,
      [notification_id],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

export {
  getNotifications,
  getNotificationById,
  addNotification,
  updateNotification,
  deleteNotification,
};
