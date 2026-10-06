import pool from "../../database-connection.js";

// Get user by Email
const getUserByEmail = async (email) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return rows[0];
  } finally {
    if (conn) conn.release();
  }
};

export { getUserByEmail };
