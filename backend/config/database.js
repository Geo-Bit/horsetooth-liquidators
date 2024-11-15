const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.DB_USER || process.env.POSTGRES_USER,
    host: process.env.DB_HOST || process.env.POSTGRES_HOST,
    database: process.env.DB_NAME || process.env.POSTGRES_DB,
    password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432')
})

const initializeDatabase = async () => {
    try {
        const client = await pool.connect()
        console.log('Database connection established')
        client.release()
    } catch (err) {
        console.error('Error connecting to database:', err)
        throw err
    }
}

module.exports = pool
module.exports.initializeDatabase = initializeDatabase 