const express = require('express');
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
const errorMiddleware = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const holdingsRoutes = require('./routes/holdingsRoutes');
const positionsRoutes = require('./routes/positionsRoutes');
const fundsRoutes = require('./routes/fundsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors(corsConfig));
app.options('*', cors(corsConfig)); // Enable preflight for all routes
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stocks', watchlistRoutes);
app.use('/api/trade', orderRoutes);
app.use('/api/trade', holdingsRoutes);
app.use('/api/trade', positionsRoutes);
app.use('/api/user', userRoutes);
app.use('/', fundsRoutes); // Mount at root since routes inside have full paths like /api/user/add-funds and /api/trade/transactions

app.get('/api/ping', (req, res) => res.json({ message: 'Trading API is live.' }));
app.use(errorMiddleware);

module.exports = app;
