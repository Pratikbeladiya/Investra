const app = require('./app');
const env = require('./config/env');
const connectDB = require('./config/db');
const Stock = require('./models/Watchlist');
const User = require('./models/User');
const stockData = require('./seed/stockData');
const bcrypt = require('bcryptjs');

const seedStocks = async () => {
  const count = await Stock.countDocuments();
  if (count === 0) {
    await Stock.insertMany(stockData.map((item) => ({
      symbol: item.symbol,
      companyName: item.companyName,
      price: item.price,
      change: item.change,
      percent: item.percent,
      volume: item.volume,
      high: item.high,
      low: item.low,
    })));
    console.log(`✅ Seeded ${stockData.length} stock documents.`);
  } else {
    console.log(`ℹ️ Stock collection already has ${count} records.`);
  }
};

const seedUsers = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    const hashedPassword = await bcrypt.hash('demo123', 10);
    await User.create({
      username: 'Demo Trader',
      email: 'demo@example.com',
      password: hashedPassword,
      balance: 100000
    });
    console.log('✅ Seeded demo user: demo@example.com / demo123');
  } else {
    console.log(`ℹ️ User collection already has ${count} records.`);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await seedStocks();
    await seedUsers();

    app.listen(env.PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
};

startServer();
