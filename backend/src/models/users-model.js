import pool from "../../database-connection.js";

const getUsers = async () => {
  let conn;

  try {
    conn = await pool.getConnection();

    const [rows] = await conn.query("SELECT * FROM users");

    return rows;
  } finally {
    if (conn) conn.release();
  }
};

// Get user by ID
const getUserById = async (id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const rows = await conn.query("SELECT * FROM users WHERE user_id = ?", [
      id,
    ]);

    return rows[0];
  } finally {
    if (conn) conn.release();
  }
};

const addUser = async (user) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `INSERT INTO users
            (role_id, name, email, password_hash)
            VALUES (?, ?, ?, ?)`,
      [user.role_id, user.name, user.email, user.password_hash],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

const updateUser = async (id, user) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query(
      `UPDATE users
             SET role_id = ?,
                 name = ?,
                 email = ?,
                 password_hash = ?,
                 is_active = ?
             WHERE user_id = ?`,
      [
        user.role_id,
        user.name,
        user.email,
        user.password_hash,
        user.is_active,
        id,
      ],
    );

    return result;
  } finally {
    if (conn) conn.release();
  }
};

const deleteUser = async (id) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const result = await conn.query("DELETE FROM users WHERE user_id = ?", [
      id,
    ]);

    return result;
  } finally {
    if (conn) conn.release();
  }
};

export { getUsers, getUserById, addUser, updateUser, deleteUser };
