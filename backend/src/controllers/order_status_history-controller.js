import {
  getOrderStatusHistory,
  getOrderStatusHistoryById,
  getOrderStatusHistoryByOrderId,
  addOrderStatusHistory,
  updateOrderStatusHistory,
  deleteOrderStatusHistory,
} from "../models/order_status_history-model.js";

// GET all order status history
const getAllOrderStatusHistory = async (req, res) => {
  try {
    const history = await getOrderStatusHistory();

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order status history",
    });
  }
};

// GET one status history record
const getSingleOrderStatusHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await getOrderStatusHistoryById(id);

    if (!history) {
      return res.status(404).json({
        error: "Order status history not found",
      });
    }

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order status history",
    });
  }
};

// GET history for one order
const getHistoryByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    const history = await getOrderStatusHistoryByOrderId(orderId);

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order status history",
    });
  }
};

// CREATE status history
const createOrderStatusHistory = async (req, res) => {
  try {
    const { order_id, status, user_id } = req.body;

    const result = await addOrderStatusHistory(order_id, status, user_id);

    res.status(201).json({
      message: "Order status history created successfully",
      history_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create order status history",
    });
  }
};

// UPDATE status history
const editOrderStatusHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const { order_id, status, user_id } = req.body;

    const result = await updateOrderStatusHistory(
      id,
      order_id,
      status,
      user_id,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order status history not found",
      });
    }

    res.json({
      message: "Order status history updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update order status history",
    });
  }
};

// DELETE status history
const removeOrderStatusHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteOrderStatusHistory(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order status history not found",
      });
    }

    res.json({
      message: "Order status history deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete order status history",
    });
  }
};

export {
  getAllOrderStatusHistory,
  getSingleOrderStatusHistory,
  getHistoryByOrderId,
  createOrderStatusHistory,
  editOrderStatusHistory,
  removeOrderStatusHistory,
};
