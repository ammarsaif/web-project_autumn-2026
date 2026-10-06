import pool from "../../database-connection.js";

// GET all menu items
const getMenuItems = async () => {
  const [rows] = await pool.query(`SELECT * FROM menu_items`);

  return rows;
};

// GET one menu item
const getMenuItemById = async (menu_item_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM menu_items
     WHERE menu_item_id = ?`,
    [menu_item_id],
  );

  return rows[0];
};

// CREATE menu item
const addMenuItem = async (
  category_id,
  name,
  description,
  price,
  product_type,
  image_url,
  available,
  allergens,
) => {
  const [result] = await pool.query(
    `INSERT INTO menu_items
     (category_id, name, description, price, product_type, image_url, available, allergens)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
    ],
  );

  return result;
};

// UPDATE menu item
const updateMenuItem = async (
  menu_item_id,
  category_id,
  name,
  description,
  price,
  product_type,
  image_url,
  available,
  allergens,
) => {
  const [result] = await pool.query(
    `UPDATE menu_items
     SET category_id = ?,
         name = ?,
         description = ?,
         price = ?,
         product_type = ?,
         image_url = ?,
         available = ?,
         allergens = ?
     WHERE menu_item_id = ?`,
    [
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
      menu_item_id,
    ],
  );

  return result;
};

// DELETE menu item
const deleteMenuItem = async (menu_item_id) => {
  const [result] = await pool.query(
    `DELETE FROM menu_items
     WHERE menu_item_id = ?`,
    [menu_item_id],
  );

  return result;
};

export {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
