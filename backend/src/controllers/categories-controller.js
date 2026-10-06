import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../models/categories-model.js";

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();

    res.json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get categories",
    });
  }
};

// GET one category
const getSingleCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get category",
    });
  }
};

// CREATE category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result = await addCategory(name, description);

    res.status(201).json({
      message: "Category created successfully",
      category_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create category",
    });
  }
};

// UPDATE category
const editCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description } = req.body;

    const result = await updateCategory(id, name, description);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update category",
    });
  }
};

// DELETE category
const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteCategory(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete category",
    });
  }
};

export {
  getAllCategories,
  getSingleCategory,
  createCategory,
  editCategory,
  removeCategory,
};
