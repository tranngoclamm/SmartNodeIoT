const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
require('dotenv').config();

// Routes
app.use('/api', require('./routers/index.js'));

// Kết nối đến MongoDB

mongoose.connect(process.env.uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});


// WebSocket
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('control-led', (data) => {
    console.log('Received LED control command:', data);
    // Xử lý điều khiển ESP32 từ đây
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API để nhận dữ liệu từ ESP32
app.use(express.json());

app.post('/api/sensor-data', (req, res) => {
  const { temperature, humidity } = req.body;
  // Lưu dữ liệu cảm biến vào MongoDB (logic chưa thêm)
  res.status(201).send('Data received');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

