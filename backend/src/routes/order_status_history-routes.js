import express from "express";

import {
  getAllOrderStatusHistory,
  getSingleOrderStatusHistory,
  getHistoryByOrderId,
  createOrderStatusHistory,
  editOrderStatusHistory,
  removeOrderStatusHistory,
} from "../controllers/order_status_history-controller.js";

const router = express.Router();

router.get("/", getAllOrderStatusHistory); // GET all status history
router.get("/:id", getSingleOrderStatusHistory); // GET one status history record
router.get("/order/:orderId", getHistoryByOrderId); // GET status history for one order
router.post("/", createOrderStatusHistory); // CREATE status history
router.put("/:id", editOrderStatusHistory); // UPDATE status history
router.delete("/:id", removeOrderStatusHistory); // DELETE status history
export default router;
