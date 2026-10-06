import express from "express";

import {
  getAllOrders,
  getSingleOrder,
  createOrder,
  editOrder,
  removeOrder,
} from "../controllers/orders-controller.js";

const router = express.Router();

router.get("/", getAllOrders); // GET all orders
router.get("/:id", getSingleOrder); // GET one order
router.post("/", createOrder); // CREATE order
router.put("/:id", editOrder); // UPDATE order
router.delete("/:id", removeOrder); // DELETE order

export default router;
