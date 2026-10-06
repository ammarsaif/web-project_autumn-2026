import pool from "../../database-connection.js";

// GET all orders
const getOrders = async () => {
  const [rows] = await pool.query(`SELECT * FROM orders`);

  return rows;
};

// GET one order
const getOrderById = async (order_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM orders
     WHERE order_id = ?`,
    [order_id],
  );

  return rows[0];
};

// CREATE order
const addOrder = async (
  user_id,
  restaurant_id,
  order_type,
  status,
  total_price,
  pickup_time,
  delivery_time,
) => {
  const [result] = await pool.query(
    `INSERT INTO orders
     (user_id, restaurant_id, order_type, status, total_price, pickup_time, delivery_time)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
    ],
  );

  return result;
};

// UPDATE order
const updateOrder = async (
  order_id,
  user_id,
  restaurant_id,
  order_type,
  status,
  total_price,
  pickup_time,
  delivery_time,
) => {
  const [result] = await pool.query(
    `UPDATE orders
     SET user_id = ?,
         restaurant_id = ?,
         order_type = ?,
         status = ?,
         total_price = ?,
         pickup_time = ?,
         delivery_time = ?
     WHERE order_id = ?`,
    [
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
      order_id,
    ],
  );

  return result;
};

// DELETE order
const deleteOrder = async (order_id) => {
  const [result] = await pool.query(
    `DELETE FROM orders
     WHERE order_id = ?`,
    [order_id],
  );

  return result;
};

export { getOrders, getOrderById, addOrder, updateOrder, deleteOrder };
