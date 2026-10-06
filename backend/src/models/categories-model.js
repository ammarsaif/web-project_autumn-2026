import pool from "../../database-connection.js";

// GET all categories
const getCategories = async () => {
  const [rows] = await pool.query(`SELECT * FROM categories`);

  return rows;
};

// GET one category
const getCategoryById = async (category_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM categories
     WHERE category_id = ?`,
    [category_id],
  );

  return rows[0];
};

// CREATE category
const addCategory = async (name, description) => {
  const [result] = await pool.query(
    `INSERT INTO categories
     (name, description)
     VALUES (?, ?)`,
    [name, description],
  );

  return result;
};

// UPDATE category
const updateCategory = async (category_id, name, description) => {
  const [result] = await pool.query(
    `UPDATE categories
     SET name = ?,
         description = ?
     WHERE category_id = ?`,
    [name, description, category_id],
  );

  return result;
};

// DELETE category
const deleteCategory = async (category_id) => {
  const [result] = await pool.query(
    `DELETE FROM categories
     WHERE category_id = ?`,
    [category_id],
  );

  return result;
};

export {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
