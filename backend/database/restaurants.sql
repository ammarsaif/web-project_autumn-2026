-- GET all restaurants
SELECT * FROM restaurants;


-- GET one restaurant
SELECT * FROM restaurants
WHERE restaurant_id = ?;


-- CREATE restaurant
INSERT INTO restaurants
(name, address, postal_code, city, latitude, longitude, opening_hour)
VALUES (?, ?, ?, ?, ?, ?, ?);


-- UPDATE restaurant
UPDATE restaurants
SET name = ?,
    address = ?,
    postal_code = ?,
    city = ?,
    latitude = ?,
    longitude = ?,
    opening_hour = ?
WHERE restaurant_id = ?;


-- DELETE restaurant
DELETE FROM restaurants
WHERE restaurant_id = ?;