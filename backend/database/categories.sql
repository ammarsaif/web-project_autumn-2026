-- GET all categories
SELECT * FROM categories;


-- GET one category
SELECT * FROM categories
WHERE category_id = ?;


-- CREATE category
INSERT INTO categories
(name, description)
VALUES (?, ?);


-- UPDATE category
UPDATE categories
SET name = ?,
    description = ?
WHERE category_id = ?;


-- DELETE category
DELETE FROM categories
WHERE category_id = ?;
