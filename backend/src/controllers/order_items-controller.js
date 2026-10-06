import {
  getOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../models/order_items-model.js";

// GET all order items
const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await getOrderItems();

    res.json(orderItems);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order items",
    });
  }
};

// GET one order item
const getSingleOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const orderItem = await getOrderItemById(id);

    if (!orderItem) {
      return res.status(404).json({
        error: "Order item not found",
      });
    }

    res.json(orderItem);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order item",
    });
  }
};

// GET all items for one order
const getItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderItems = await getOrderItemsByOrderId(orderId);

    res.json(orderItems);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order items",
    });
  }
};

// CREATE order item
const createOrderItem = async (req, res) => {
  try {
    const { order_id, menu_item_id, quantity, unit_price, total_price } =
      req.body;

    const result = await addOrderItem(
      order_id,
      menu_item_id,
      quantity,
      unit_price,
      total_price,
    );

    res.status(201).json({
      message: "Order item created successfully",
      item_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create order item",
    });
  }
};

// UPDATE order item
const editOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const { order_id, menu_item_id, quantity, unit_price, total_price } =
      req.body;

    const result = await updateOrderItem(
      id,
      order_id,
      menu_item_id,
      quantity,
      unit_price,
      total_price,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order item not found",
      });
    }

    res.json({
      message: "Order item updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update order item",
    });
  }
};

// DELETE order item
const removeOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteOrderItem(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order item not found",
      });
    }

    res.json({
      message: "Order item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete order item",
    });
  }
};

export {
  getAllOrderItems,
  getSingleOrderItem,
  getItemsByOrderId,
  createOrderItem,
  editOrderItem,
  removeOrderItem,
};
