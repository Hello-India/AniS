require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { sequelize } = require('./models');
const redis = require('redis');
const { createClient } = redis;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
redisClient.connect().catch(console.error);

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Static files (for frontend)
app.use('/static', express.static('public'));

// Import routes
const animeRoutes = require('./routes/anime');
const adminRoutes = require('./routes/admin');

app.use('/api/anime', animeRoutes);
app.use('/api/admin', adminRoutes);

// Basic home route
app.get('/', (req, res) => {
  res.send('Anime Streaming Platform API');
});

// Socket.IO example (optional real-time feature)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Sync database and start server
const PORT = process.env.PORT || 4000;
sequelize.sync({ alter: true }).then(() => {
  http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});