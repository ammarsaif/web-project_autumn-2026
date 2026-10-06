-- GET all notifications
SELECT * FROM notifications;


-- GET one notification
SELECT * FROM notifications
WHERE notification_id = ?;


-- CREATE notification
INSERT INTO notifications
(user_id, title, message, type, audience)
VALUES (?, ?, ?, ?, ?);


-- UPDATE notification
UPDATE notifications
SET user_id = ?,
    title = ?,
    message = ?,
    type = ?,
    audience = ?
WHERE notification_id = ?;


-- DELETE notification
DELETE FROM notifications
WHERE notification_id = ?;