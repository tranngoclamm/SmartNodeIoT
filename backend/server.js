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

// Middleware xác thực auth token
io.use(async (socket, next) => {
  const authToken = socket.handshake.auth.token;
  if (!authToken) return next(new Error('Authentication error'));

  try {
    // Xác thực auth token
    const projectsSnapshot = await db.ref('projects').once('value');
    let matchedProject = null;

    projectsSnapshot.forEach((projectSnapshot) => {
      const project = projectSnapshot.val();
      if (project.auth_token === authToken) {
        matchedProject = { id: projectSnapshot.key, ...project };
      }
    });

    if (!matchedProject) {
      return next(new Error('Invalid project auth token'));
    }

    socket.project = {
      projectId: matchedProject.id,
      projectName: matchedProject.projectName,
    };

    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`User connected to project: ${socket.project.projectName}`);

  // ESP32 gửi dữ liệu sensor/device
  socket.on('sensor_data', async ({ pin, value }) => {
    try {
      const projectId = socket.project.projectId;

      // Tìm datastream theo pin
      const datastreamsSnapshot = await db
        .ref(`projects/${projectId}/datastreams`)
        .orderByChild('pin')
        .equalTo(pin)
        .once('value');

      if (!datastreamsSnapshot.exists()) {
        socket.emit('error', `Datastream with pin ${pin} not found`);
        return;
      }

      const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];
      const datastream = datastreamsSnapshot.val()[datastreamKey];

      // Cập nhật giá trị mới
      await db.ref(`projects/${projectId}/datastreams/${datastreamKey}`).update({
        lastValue: value,
      });

      // Phát dữ liệu tới tất cả client trong phòng
      io.to(projectId).emit('sensor_update', {
        datastreamId: datastreamKey,
        pin: datastream.pin,
        value,
        type: datastream.type,
      });

      console.log(`Updated sensor data: Pin ${pin}, Value ${value}`);
    } catch (err) {
      socket.emit('error', err.message);
    }
  });

  // Client yêu cầu bật/tắt device
  socket.on('update_device', async ({ pin, value }) => {
    try {
      const projectId = socket.project.projectId;

      // Tìm datastream theo pin
      const datastreamsSnapshot = await db
        .ref(`projects/${projectId}/datastreams`)
        .orderByChild('pin')
        .equalTo(pin)
        .once('value');

      if (!datastreamsSnapshot.exists()) {
        socket.emit('error', `Datastream with pin ${pin} not found`);
        return;
      }

      const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];
      const datastream = datastreamsSnapshot.val()[datastreamKey];

      if (datastream.type !== 'device') {
        socket.emit('error', `Pin ${pin} is not a device`);
        return;
      }

      // Cập nhật trạng thái mới
      await db.ref(`projects/${projectId}/datastreams/${datastreamKey}`).update({
        lastValue: value,
      });

      // Phát trạng thái mới tới ESP32 và các client trong phòng
      io.to(projectId).emit('device_update', {
        datastreamId: datastreamKey,
        pin: datastream.pin,
        value,
        type: datastream.type,
      });

      console.log(`Updated device state: Pin ${pin}, Value ${value}`);
    } catch (err) {
      socket.emit('error', err.message);
    }
  });

  // ESP32 yêu cầu trạng thái hiện tại của các device
  socket.on('get_devices', async () => {
    try {
      const projectId = socket.project.projectId;

      // Lấy tất cả device trong project
      const devicesSnapshot = await db
        .ref(`projects/${projectId}/datastreams`)
        .orderByChild('type')
        .equalTo('device')
        .once('value');

      if (!devicesSnapshot.exists()) {
        socket.emit('error', 'No devices found');
        return;
      }

      const devices = [];
      devicesSnapshot.forEach((childSnapshot) => {
        devices.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      socket.emit('device_states', devices);
      console.log(`Sent devices states for project ${projectId}`);
    } catch (err) {
      socket.emit('error', err.message);
    }
  });

  // Ngắt kết nối
  socket.on('disconnect', () => {
    console.log(`User disconnected from project: ${socket.project.projectName}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});