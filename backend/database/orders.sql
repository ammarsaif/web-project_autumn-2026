-- GET all orders
SELECT * FROM orders;


-- GET one order
SELECT * FROM orders
WHERE order_id = ?;


-- CREATE order
INSERT INTO orders
(user_id, restaurant_id, order_type, status, total_price, pickup_time, delivery_time)
VALUES (?, ?, ?, ?, ?, ?, ?);


-- UPDATE order
UPDATE orders
SET user_id = ?,
    restaurant_id = ?,
    order_type = ?,
    status = ?,
    total_price = ?,
    pickup_time = ?,
    delivery_time = ?
WHERE order_id = ?;


-- DELETE order
DELETE FROM orders
WHERE order_id = ?;