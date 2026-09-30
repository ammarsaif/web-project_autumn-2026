CREATE DATABASE restaurant_db;

USE restaurant_db;


-- =====================================================
-- 1. ROLES
-- role_id 1 = admin
-- role_id 2 = customer
-- =====================================================

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);


-- =====================================================
-- 2. USERS
-- =====================================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_users_roles
        FOREIGN KEY (role_id)
        REFERENCES roles (role_id)
);


-- =====================================================
-- 3. RESTAURANTS
-- =====================================================

CREATE TABLE restaurants (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    postal_code VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    opening_hour TEXT
);


-- =====================================================
-- 4. CATEGORIES
-- =====================================================

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);


-- =====================================================
-- 5. MENU ITEMS
-- =====================================================

CREATE TABLE menu_items (
    menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    product_type VARCHAR(25),
    image_url VARCHAR(250),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    allergens SET('gluten','nuts','dairy','egg','soy','fish','shellfish'),
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_category_menu_items
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
);


-- =====================================================
-- 6. ORDERS
-- =====================================================

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    order_type ENUM('pickup', 'delivery', 'dine_in') NOT NULL,
    status ENUM(
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'completed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',
    total_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    order_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pickup_time DATETIME,
    delivery_time DATETIME,

    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id),

    CONSTRAINT fk_orders_restaurant
        FOREIGN KEY (restaurant_id)
        REFERENCES restaurants(restaurant_id)
);


-- =====================================================
-- 7. ORDER STATUS HISTORY
-- =====================================================

CREATE TABLE order_status_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status ENUM(
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'completed',
        'cancelled'
    ) NOT NULL,
    user_id INT NOT NULL,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_osh_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    CONSTRAINT fk_osh_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


-- =====================================================
-- 8. ORDER ITEMS
-- =====================================================

CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) DEFAULT 0.00,
    total_price DECIMAL(10,2) DEFAULT 0.00,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    CONSTRAINT fk_order_items_menu
        FOREIGN KEY (menu_item_id)
        REFERENCES menu_items(menu_item_id)
);


-- =====================================================
-- 9. MENU SCHEDULE
-- =====================================================

CREATE TABLE menu_schedule (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_item_id INT NOT NULL,
    day_of_week INT NOT NULL COMMENT '1=Mon ... 7=Sun',
    week_start_date DATE NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_menu_schedule_item
        FOREIGN KEY (menu_item_id)
        REFERENCES menu_items(menu_item_id)
);


-- =====================================================
-- 10. NOTIFICATIONS
-- =====================================================

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    audience ENUM('customers') NOT NULL DEFAULT 'customers',
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_notifications_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
);


-- =====================================================
-- 11. ANNOUNCEMENTS
-- =====================================================

CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content TEXT,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    start_time DATETIME NULL,
    end_time DATETIME NULL
);

-- =====================================================
-- 11. INDEXES
-- =====================================================

-- =====================================================
-- INDEXES
-- =====================================================

-- USERS
CREATE INDEX idx_users_role
ON users (role_id);


-- ORDERS
CREATE INDEX idx_orders_user
ON orders (user_id);

CREATE INDEX idx_orders_restaurant
ON orders (restaurant_id);

CREATE INDEX idx_orders_status
ON orders (status);

CREATE INDEX idx_orders_user_status
ON orders (user_id, status);


-- ORDER STATUS HISTORY
CREATE INDEX idx_osh_order
ON order_status_history (order_id);

CREATE INDEX idx_osh_user
ON order_status_history (user_id);


-- MENU ITEMS
CREATE INDEX idx_menu_items_category
ON menu_items (category_id);

CREATE INDEX idx_menu_items_available
ON menu_items (available);


-- MENU SCHEDULE
CREATE INDEX idx_menu_schedule_item
ON menu_schedule (menu_item_id);

CREATE INDEX idx_menu_schedule_day
ON menu_schedule (day_of_week);

CREATE INDEX idx_menu_schedule_week
ON menu_schedule (week_start_date);


-- ORDER ITEMS
CREATE INDEX idx_order_items_order
ON order_items (order_id);

CREATE INDEX idx_order_items_menu_item
ON order_items (menu_item_id);


-- NOTIFICATIONS
CREATE INDEX idx_notifications_user
ON notifications (user_id);


-- ANNOUNCEMENTS
CREATE INDEX idx_announcements_window
ON announcements (active, start_time, end_time);