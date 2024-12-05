const { Pool } = require('pg')

const createPool = () => {
  // Check if we're in production and using Cloud SQL
  if (process.env.NODE_ENV === 'production' && process.env.INSTANCE_CONNECTION_NAME) {
    return new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
      // Don't set port when using Unix socket
    })
  }

  // Local development configuration
  return new Pool({
    user: process.env.DB_USER || process.env.POSTGRES_USER,
    host: process.env.DB_HOST || process.env.POSTGRES_HOST,
    database: process.env.DB_NAME || process.env.POSTGRES_DB,
    password: process.env.DB_PASSWORD || process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || process.env.POSTGRES_PORT || '5432')
  })
}

const pool = createPool()

const initializeDatabase = async () => {
  try {
    const client = await pool.connect()
    console.log('Database connection established:', {
      host: process.env.NODE_ENV === 'production' ? 'Cloud SQL' : process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    })
    client.release()
  } catch (err) {
    console.error('Error connecting to database:', err)
    throw err
  }
}

module.exports = pool
module.exports.initializeDatabase = initializeDatabase 