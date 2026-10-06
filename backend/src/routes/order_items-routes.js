import express from "express";

import {
  getAllOrderItems,
  getSingleOrderItem,
  getItemsByOrderId,
  createOrderItem,
  editOrderItem,
  removeOrderItem,
} from "../controllers/order_items-controller.js";

const router = express.Router();

router.get("/", getAllOrderItems); // GET all order items
router.get("/order/:orderId", getItemsByOrderId); // GET all items for one order
router.get("/:id", getSingleOrderItem); // GET one order item
router.post("/", createOrderItem); // CREATE order item
router.put("/:id", editOrderItem); // UPDATE order item
router.delete("/:id", removeOrderItem); // DELETE order item

export default router;
