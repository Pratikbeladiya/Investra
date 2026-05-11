const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
  PORT: process.env.PORT || 3002,
  DB_URL: process.env.DB_URL || process.env.MONGO_URI || process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1:27017/zerodha_clone',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
};
