-- GET all order items
SELECT * FROM order_items;


-- GET one order item
SELECT * FROM order_items
WHERE item_id = ?;


-- CREATE order item
INSERT INTO order_items
(order_id, menu_item_id, quantity, unit_price, total_price)
VALUES (?, ?, ?, ?, ?);


-- UPDATE order item
UPDATE order_items
SET order_id = ?,
    menu_item_id = ?,
    quantity = ?,
    unit_price = ?,
    total_price = ?
WHERE item_id = ?;


-- DELETE order item
DELETE FROM order_items
WHERE item_id = ?;