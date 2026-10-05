-- GET all users
SELECT * FROM users;


-- GET one user
SELECT * FROM users
WHERE user_id = ?;


-- CREATE user
INSERT INTO users
(role_id, name, email, password_hash)
VALUES (?, ?, ?, ?);


-- UPDATE user
UPDATE users
SET role_id = ?,
    name = ?,
    email = ?,
    password_hash = ?,
    is_active = ?
WHERE user_id = ?;


-- DELETE user
DELETE FROM users
WHERE user_id = ?;