CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing users if any
TRUNCATE users RESTART IDENTITY CASCADE;

-- Insert test users
INSERT INTO users (username, password_hash, role) VALUES
('admin', '$2b$10$rB5GGLJbZgzqNFN0UAjXp.GxXRDDhMf8uVE9RyFqPvqPFXJJh6Y6q', 'admin'),
('john_doe', '$2b$10$LKV7VI0OzM8UXxwxB5H.a.9ING6JNCIh88i5EVKSsaj8rZz4hQ8PC', 'user'),
('jane_smith', '$2b$10$QX5hRDbvpqP.CYqrNA7KQuIK7F4QqgVp8S8vqQXGrqWoHBGQF9WSi', 'user');