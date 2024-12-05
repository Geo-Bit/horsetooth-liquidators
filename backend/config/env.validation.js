const validateEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  console.log('Current environment:', env);
  console.log('Available environment variables:', Object.keys(process.env));

  const required = {
    production: [
      'NODE_ENV',
      'DB_HOST',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME',
      'JWT_SECRET',
      'CORS_ORIGIN',
      'INSTANCE_CONNECTION_NAME'
    ],
    development: [
      'NODE_ENV',
      'DB_HOST',
      'DB_USER',
      'DB_PASSWORD',
      'DB_NAME',
      'JWT_SECRET',
      'CORS_ORIGIN'
    ]
  };

  const missing = required[env].filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables for ${env} environment: ${missing.join(', ')}`);
  }
};

module.exports = validateEnv; 