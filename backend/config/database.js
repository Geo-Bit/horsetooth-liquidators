const { Pool } = require('pg')
const bcrypt = require('bcrypt')

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
})

const waitForDatabase = async (retries = 5, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const client = await pool.connect()
            await client.query('SELECT 1')
            client.release()
            console.log('Database connection established')
            return true
        } catch (err) {
            console.log(`Database connection attempt ${i + 1} failed. Retrying...`)
            await new Promise(resolve => setTimeout(resolve, delay))
        }
    }
    throw new Error('Unable to connect to database')
}

const initializeDatabase = async () => {
    try {
        // Wait for database to be ready
        await waitForDatabase()

        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)

        // Check if admin user exists
        const adminExists = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            ['admin']
        )

        if (adminExists.rows.length === 0) {
            // Insert initial users
            const users = [
                { username: 'admin', password: 'admin123', role: 'admin' },
                { username: 'john_doe', password: 'password123', role: 'user' },
                { username: 'jane_smith', password: 'letmein', role: 'user' }
            ]

            for (const user of users) {
                const passwordHash = await bcrypt.hash(user.password, 10)
                await pool.query(
                    'INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)',
                    [user.username, passwordHash, user.role]
                )
            }
            console.log('Initial users created')
        }

        console.log('Database initialized successfully')
    } catch (error) {
        console.error('Database initialization error:', error)
        throw error
    }
}

module.exports = {
    pool,
    initializeDatabase
} 