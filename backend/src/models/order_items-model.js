import pool from "../../database-connection.js";

// GET all order items
const getOrderItems = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM order_items
  `);

  return rows;
};

// GET one order item
const getOrderItemById = async (item_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_items
    WHERE item_id = ?
    `,
    [item_id],
  );

  return rows[0];
};

// GET all items for one order
const getOrderItemsByOrderId = async (order_id) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM order_items
    WHERE order_id = ?
    ORDER BY item_id
    `,
    [order_id],
  );

  return rows;
};

// CREATE order item
const addOrderItem = async (
  order_id,
  menu_item_id,
  quantity,
  unit_price,
  total_price,
) => {
  const [result] = await pool.query(
    `
    INSERT INTO order_items
    (order_id, menu_item_id, quantity, unit_price, total_price)
    VALUES (?, ?, ?, ?, ?)
    `,
    [order_id, menu_item_id, quantity, unit_price, total_price],
  );

  return result;
};

// UPDATE order item
const updateOrderItem = async (
  item_id,
  order_id,
  menu_item_id,
  quantity,
  unit_price,
  total_price,
) => {
  const [result] = await pool.query(
    `
    UPDATE order_items
    SET order_id = ?,
        menu_item_id = ?,
        quantity = ?,
        unit_price = ?,
        total_price = ?
    WHERE item_id = ?
    `,
    [order_id, menu_item_id, quantity, unit_price, total_price, item_id],
  );

  return result;
};

// DELETE order item
const deleteOrderItem = async (item_id) => {
  const [result] = await pool.query(
    `
    DELETE FROM order_items
    WHERE item_id = ?
    `,
    [item_id],
  );

  return result;
};

export {
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
