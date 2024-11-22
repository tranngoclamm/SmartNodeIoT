const express = require('express');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const projectModel = require('./models/projectModel'); // Project model

const app = express();
const cors = require('cors');

app.use(cors({
  origin: '*', // Hoặc chỉ định domain cụ thể: ['http://localhost:8080']
}));
app.use(bodyParser.json()); // Để xử lý JSON request body
const PORT = 8000;

// Middleware để xác thực JWT
app.use((req, res, next) => {
  console.log("6r76v")
  const token = req.headers['authorization']; // Lấy token từ header Authorization
  console.log(token)
  if (!token) return res.status(401).json({ error: 'Authentication error' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Nhận dữ liệu từ ESP32 qua HTTP POST request
app.post('/api/sensor-data', async (req, res) => {
  console.log("ahgbn")
  const { authToken, pin, value } = req.body;  // Lấy thông tin từ request body

  try {
    const result = await projectModel.handleEsp32Data(authToken, pin, value); // Xử lý dữ liệu
    res.status(200).json({ message: 'Sensor data updated successfully', data: result });
    console.log(`Sensor data updated: ${result}`);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process sensor data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
