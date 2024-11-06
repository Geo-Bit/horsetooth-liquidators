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
('sly_fox', '$2b$10$DlZJJXR/htaS7eca3SoBH.IbtgrloabqYWponhCCQFMSywIK9pLJG', 'admin'),          -- password: Rx5#vL9$tM4
('rookie_raccoon', '$2b$10$HhALUZvWxVXUhwVtStm1f.KJYdy4EX.INUv6OPvnQAlXFE9iNHUcO', 'user');    -- password: trash_panda123

-- Note: You'll need to generate new hashes for these passwords