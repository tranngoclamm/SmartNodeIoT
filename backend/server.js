const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const db = require('./config/firebaseConfig'); // Firebase config
const jwt = require('jsonwebtoken');
const projectRoutes = require('./routers/projectRoutes');
const authRoutes = require('./routers/authRoutes');
const projectModel = require('./models/projectModel'); // Project model

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(bodyParser.json());
const PORT = 8000;

app.use('/api/auth', authRoutes);
app.use('/api', projectRoutes);

// Middleware để xác thực JWT
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    socket.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.userId}`);

  // Xử lý tham gia phòng dựa trên authToken
  socket.on('join_project', async (authToken) => {
    try {
      const projectsSnapshot = await db.ref('projects').once('value');
      let matchedProject = null;

      // Tìm project theo authToken
      projectsSnapshot.forEach((projectSnapshot) => {
        const project = projectSnapshot.val();
        if (project.auth_token === authToken) {
          matchedProject = { id: projectSnapshot.key, ...project };
        }
      });

      if (!matchedProject) {
        socket.emit('error', 'Invalid auth token');
        return;
      }

      // Kiểm tra quyền
      if (!matchedProject.members[socket.user.userId] && matchedProject.createdBy !== socket.user.userId) {
        socket.emit('error', 'Permission denied');
        return;
      }

      // Tham gia phòng dự án
      socket.join(matchedProject.id);
      socket.emit('joined_project', `Joined project: ${matchedProject.id}`);
      console.log(`User ${socket.user.userId} joined project ${matchedProject.id}`);
    } catch (err) {
      socket.emit('error', 'Failed to join project');
    }
  });

  // Nhận dữ liệu từ ESP32 và phát tới tất cả client
  socket.on('sensor_data', async ({ authToken, pin, value }) => {
    try {
      const result = await projectModel.handleEsp32Data(authToken, pin, value); // Model xử lý dữ liệu
      io.to(result.projectId).emit('sensor_update', {
        datastreamId: result.datastreamId,
        pin: result.pin,
        value: result.value
      });
      console.log(`Sensor data updated: ${result}`);
    } catch (err) {
      socket.emit('error', err.message);
    }
  });

  // Xử lý yêu cầu bật/tắt thiết bị từ FE
  socket.on('update_device', async ({ authToken, pin, value }) => {
    try {
      const result = await projectModel.updateDeviceState(authToken, pin, value); // Model cập nhật thiết bị
      io.to(result.projectId).emit('device_update', {
        datastreamId: result.datastreamId,
        pin: result.pin,
        value: result.value
      });
      console.log(`Device state updated: ${result}`);
    } catch (err) {
      socket.emit('error', err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.userId}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
