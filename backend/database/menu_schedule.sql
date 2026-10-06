-- GET all menu schedules
SELECT * FROM menu_schedule;


-- GET one menu schedule
SELECT * FROM menu_schedule
WHERE schedule_id = ?;


-- CREATE menu schedule
INSERT INTO menu_schedule
(menu_item_id, day_of_week, week_start_date, is_active)
VALUES (?, ?, ?, ?);


-- UPDATE menu schedule
UPDATE menu_schedule
SET menu_item_id = ?,
    day_of_week = ?,
    week_start_date = ?,
    is_active = ?
WHERE schedule_id = ?;


-- DELETE menu schedule
DELETE FROM menu_schedule
WHERE schedule_id = ?;