CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing users if any
TRUNCATE users RESTART IDENTITY CASCADE;

-- Insert themed users with more secure passwords
INSERT INTO users (username, password_hash, role) VALUES
('mr_badger', '$2b$10$qkHs83XudbIVqyJXP8ZKauC5DI44WYwZPdaMHPznnexBB6SQcW9Qm', 'super_admin'),  -- password: Kj8#mP9$nQ2
('sly_fox', '$2b$10$msFIaGa8rsd1idWuilE4B.uoHK6YMqz9nEX.KPaZ41AodK9XHoNbG', 'super_admin'),    -- password: clever_fox_123
('rookie_raccoon', '$2b$10$HhALUZvWxVXUhwVtStm1f.KJYdy4EX.INUv6OPvnQAlXFE9iNHUcO', 'user');    -- password: trash_panda123

-- Note: You'll need to generate new hashes for these passwords

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'processing',
    total DECIMAL(10,2) NOT NULL,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Clear existing orders if any
TRUNCATE orders RESTART IDENTITY CASCADE;
TRUNCATE order_items RESTART IDENTITY CASCADE;

-- Insert sample orders
-- Order for rookie_raccoon (user_id 3)
INSERT INTO orders (user_id, date, status, total) VALUES 
(3, '2024-02-15', 'completed', 799.99);

INSERT INTO order_items (order_id, product_id, quantity, price, name) VALUES 
(1, 3, 1, 799.99, 'Vintage IBM Keyboard');

-- Order for mr_badger (user_id 1) with hidden flag
INSERT INTO orders (user_id, date, status, total, notes) VALUES
(1, '2024-02-14', 'completed', 2999.99, 'noco{7b4d8e2f1a9c6b3d5e8f2a1b4c7d9e6a}');

INSERT INTO order_items (order_id, product_id, quantity, price, name) VALUES 
(2, 12, 1, 2999.99, 'Classified Server Logs');

-- Another order for rookie_raccoon
INSERT INTO orders (user_id, date, status, total) VALUES 
(3, '2024-03-15', 'processing', 299.98);

INSERT INTO order_items (order_id, product_id, quantity, price, name) VALUES 
(3, 5, 2, 149.99, 'Retro Gaming Console');