-- GET all announcements
SELECT * FROM announcements;


-- GET one announcement
SELECT * FROM announcements
WHERE announcement_id = ?;


-- CREATE announcement
INSERT INTO announcements
(title, content, active, start_time, end_time)
VALUES (?, ?, ?, ?, ?);


-- UPDATE announcement
UPDATE announcements
SET title = ?,
    content = ?,
    active = ?,
    start_time = ?,
    end_time = ?
WHERE announcement_id = ?;


-- DELETE announcement
DELETE FROM announcements
WHERE announcement_id = ?;