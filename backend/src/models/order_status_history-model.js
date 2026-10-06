import pool from "../../database-connection.js";

// GET all order status history
const getOrderStatusHistory = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM order_status_history
  `);

  return rows;
};

// GET one status history record
const getOrderStatusHistoryById = async (history_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_status_history
    WHERE history_id = ?
    `,
    [history_id],
  );

  return rows[0];
};

// GET status history for one order
const getOrderStatusHistoryByOrderId = async (order_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_status_history
    WHERE order_id = ?
    ORDER BY created_time ASC
    `,
    [order_id],
  );

  return rows;
};

// CREATE status history
const addOrderStatusHistory = async (order_id, status, user_id) => {
  const [result] = await pool.query(
    `
    INSERT INTO order_status_history
    (order_id, status, user_id)
    VALUES (?, ?, ?)
    `,
    [order_id, status, user_id],
  );

  return result;
};

// UPDATE status history
const updateOrderStatusHistory = async (
  history_id,
  order_id,
  status,
  user_id,
) => {
  const [result] = await pool.query(
    `
    UPDATE order_status_history
    SET order_id = ?,
        status = ?,
        user_id = ?
    WHERE history_id = ?
    `,
    [order_id, status, user_id, history_id],
  );

  return result;
};

// DELETE status history
const deleteOrderStatusHistory = async (history_id) => {
  const [result] = await pool.query(
    `
    DELETE FROM order_status_history
    WHERE history_id = ?
    `,
    [history_id],
  );

  return result;
};

export {
  getOrderStatusHistory,
  getOrderStatusHistoryById,
  getOrderStatusHistoryByOrderId,
  addOrderStatusHistory,
  updateOrderStatusHistory,
  deleteOrderStatusHistory,
};
