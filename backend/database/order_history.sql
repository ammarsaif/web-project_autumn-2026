-- GET all order status history
SELECT * FROM order_status_history;


-- GET one status history record
SELECT * FROM order_status_history
WHERE history_id = ?;


-- CREATE status history
INSERT INTO order_status_history
(order_id, status, user_id)
VALUES (?, ?, ?);


-- UPDATE status history
UPDATE order_status_history
SET order_id = ?,
    status = ?,
    user_id = ?
WHERE history_id = ?;


-- DELETE status history
DELETE FROM order_status_history
WHERE history_id = ?;