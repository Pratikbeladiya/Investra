const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  const mongoUri = env.DB_URL;

  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined in environment variables.');
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    autoIndex: true,
    maxPoolSize: 10,
  });
};

module.exports = connectDB;
