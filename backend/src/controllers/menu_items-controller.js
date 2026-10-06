import {
  getMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../models/menu_items-model.js";

// GET all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await getMenuItems();

    res.json(menuItems);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get menu items",
    });
  }
};

// GET one menu item
const getSingleMenuItem = async (req, res) => {
  try {
    const menuItem = await getMenuItemById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        error: "Menu item not found",
      });
    }

    res.json(menuItem);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get menu item",
    });
  }
};

// CREATE menu item
const createMenuItem = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
    } = req.body;

    const result = await addMenuItem(
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
    );

    res.status(201).json({
      message: "Menu item created successfully",
      menu_item_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create menu item",
    });
  }
};

// UPDATE menu item
const editMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
    } = req.body;

    const result = await updateMenuItem(
      id,
      category_id,
      name,
      description,
      price,
      product_type,
      image_url,
      available,
      allergens,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Menu item not found",
      });
    }

    res.json({
      message: "Menu item updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update menu item",
    });
  }
};

// DELETE menu item
const removeMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteMenuItem(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Menu item not found",
      });
    }

    res.json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete menu item",
    });
  }
};

export {
  getAllMenuItems,
  getSingleMenuItem,
  createMenuItem,
  editMenuItem,
  removeMenuItem,
};
