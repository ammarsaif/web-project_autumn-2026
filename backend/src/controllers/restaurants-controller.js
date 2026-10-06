import {
  getRestaurants,
  getRestaurantById,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../models/restaurants-models.js";

// GET all restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await getRestaurants();

    res.json(restaurants);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get restaurants",
    });
  }
};

// GET one restaurant
const getSingleRestaurant = async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get restaurant",
    });
  }
};

// CREATE restaurant
const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      address,
      postal_code,
      city,
      latitude,
      longitude,
      opening_hour,
    } = req.body;

    const result = await addRestaurant(
      name,
      address,
      postal_code,
      city,
      latitude,
      longitude,
      opening_hour,
    );

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant_id: result.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create restaurant",
    });
  }
};

// UPDATE restaurant
const editRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      address,
      postal_code,
      city,
      latitude,
      longitude,
      opening_hour,
    } = req.body;

    const result = await updateRestaurant(
      id,
      name,
      address,
      postal_code,
      city,
      latitude,
      longitude,
      opening_hour,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    res.json({
      message: "Restaurant updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update restaurant",
    });
  }
};

// DELETE restaurant
const removeRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteRestaurant(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    res.json({
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete restaurant",
    });
  }
};

export {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  editRestaurant,
  removeRestaurant,
};
