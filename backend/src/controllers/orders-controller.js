import {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder,
} from "../models/orders-models.js";

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get orders",
    });
  }
};

// GET one order
const getSingleOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get order",
    });
  }
};

// CREATE order
const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
    } = req.body;

    const result = await addOrder(
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
    );

    res.status(201).json({
      message: "Order created successfully",
      order_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create order",
    });
  }
};

// UPDATE order
const editOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
    } = req.body;

    const result = await updateOrder(
      id,
      user_id,
      restaurant_id,
      order_type,
      status,
      total_price,
      pickup_time,
      delivery_time,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json({
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update order",
    });
  }
};

// DELETE order
const removeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteOrder(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete order",
    });
  }
};

export { getAllOrders, getSingleOrder, createOrder, editOrder, removeOrder };
