import express from "express";

import {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  editRestaurant,
  removeRestaurant,
} from "../controllers/restaurants-controller.js";

const router = express.Router();

router.get("/", getAllRestaurants); // GET all restaurants
router.get("/:id", getSingleRestaurant); // GET one restaurant
router.post("/", createRestaurant); // CREATE restaurant
router.put("/:id", editRestaurant); // UPDATE restaurant
router.delete("/:id", removeRestaurant); // DELETE restaurant

export default router;
