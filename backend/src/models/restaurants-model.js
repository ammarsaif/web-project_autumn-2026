import pool from "../../database-connection.js";

// GET all restaurants
const getRestaurants = async () => {
  const [rows] = await pool.query(`SELECT * FROM restaurants`);

  return rows;
};

// GET one restaurant
const getRestaurantById = async (restaurant_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM restaurants
     WHERE restaurant_id = ?`,
    [restaurant_id],
  );

  return rows[0];
};

// CREATE restaurant
const addRestaurant = async (
  name,
  address,
  postal_code,
  city,
  latitude,
  longitude,
  opening_hour,
) => {
  const [result] = await pool.query(
    `INSERT INTO restaurants
     (name, address, postal_code, city, latitude, longitude, opening_hour)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, address, postal_code, city, latitude, longitude, opening_hour],
  );

  return result;
};

// UPDATE restaurant
const updateRestaurant = async (
  restaurant_id,
  name,
  address,
  postal_code,
  city,
  latitude,
  longitude,
  opening_hour,
) => {
  const [result] = await pool.query(
    `UPDATE restaurants
     SET name = ?,
         address = ?,
         postal_code = ?,
         city = ?,
         latitude = ?,
         longitude = ?,
         opening_hour = ?
     WHERE restaurant_id = ?`,
    [
      name,
      address,
      postal_code,
      city,
      latitude,
      longitude,
      opening_hour,
      restaurant_id,
    ],
  );

  return result;
};

// DELETE restaurant
const deleteRestaurant = async (restaurant_id) => {
  const [result] = await pool.query(
    `DELETE FROM restaurants
     WHERE restaurant_id = ?`,
    [restaurant_id],
  );

  return result;
};

export {
  getRestaurants,
  getRestaurantById,
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
