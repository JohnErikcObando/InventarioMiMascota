require('dotenv').config();

const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DB_URI,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = { config };
