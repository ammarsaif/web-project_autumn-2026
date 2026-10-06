-- GET all menu items
SELECT * FROM menu_items;


-- GET one menu item
SELECT * FROM menu_items
WHERE menu_item_id = ?;


-- CREATE menu item
INSERT INTO menu_items
(category_id, name, description, price, product_type, image_url, available, allergens)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);


-- UPDATE menu item
UPDATE menu_items
SET category_id = ?,
    name = ?,
    description = ?,
    price = ?,
    product_type = ?,
    image_url = ?,
    available = ?,
    allergens = ?
WHERE menu_item_id = ?;


-- DELETE menu item
DELETE FROM menu_items
WHERE menu_item_id = ?;