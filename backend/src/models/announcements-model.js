import pool from "../../database-connection.js";

// GET all announcements
const getAnnouncements = async () => {
  let conn;

  try {
    conn = await pool.getConnection();

    const [rows] = await conn.query(`
      SELECT * FROM announcements
    `);

    return rows;
  } finally {
    if (conn) conn.release();
  }
};

// GET one announcement
const getAnnouncementById = async (announcement_id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query(
      `
      SELECT * FROM announcements
      WHERE announcement_id = ?
      `,
      [announcement_id],
    );

    return rows[0];
  } finally {
    if (conn) conn.release();
  }
};

// CREATE announcement
const addAnnouncement = async (announcement) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      INSERT INTO announcements
      (title, content, active, start_time, end_time)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        announcement.title,
        announcement.content,
        announcement.active,
        announcement.start_time,
        announcement.end_time,
      ],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

// UPDATE announcement
const updateAnnouncement = async (announcement_id, announcement) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      UPDATE announcements
      SET title = ?,
          content = ?,
          active = ?,
          start_time = ?,
          end_time = ?
      WHERE announcement_id = ?
      `,
      [
        announcement.title,
        announcement.content,
        announcement.active,
        announcement.start_time,
        announcement.end_time,
        announcement_id,
      ],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

// DELETE announcement
const deleteAnnouncement = async (announcement_id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `
      DELETE FROM announcements
      WHERE announcement_id = ?
      `,
      [announcement_id],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

export {
  getAnnouncements,
  getAnnouncementById,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
