const WebSocket = require('ws');
const { SensorHistory } = require('../models/historyModel');
const { DeviceHistory } = require('../models/historyModel');

// Hàm xử lý kết nối WebSocket
async function handleWebSocketConnection(socket, req, firebase, wsServer) {
  console.log('A new client connected');
  const query = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const authToken = query.get('token');
  console.log('authToken:', authToken);

  if (!authToken) {
    socket.close(1008, 'Authentication error');
    return;
  }

  try {
    // Xác thực token từ Firebase
    const projectsSnapshot = await firebase.ref('projects').once('value');
    let matchedProject = null;

    projectsSnapshot.forEach((projectSnapshot) => {
      const project = projectSnapshot.val();
      if (project.auth_token === authToken) {
        matchedProject = { id: projectSnapshot.key, ...project };
      }
    });

    if (!matchedProject) {
      socket.close(1008, 'Invalid auth token');
      return;
    }

    socket.project = {
      projectId: matchedProject.id,
      projectName: matchedProject.projectName,
    };

    // Thêm client vào danh sách kết nối
    wsServer.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          action: 'new_client_connected',
          projectName: matchedProject.projectName,
        }));
      }
    });

    // Xử lý các tin nhắn từ client
    socket.on('message', async (message) => {
      console.log(`Message received from client: ${message}`);
      try {
        const { action, data } = JSON.parse(message);
        
        switch (action) {
          case 'sensor_data':
            await handleSensorData(socket, data, firebase);
            // await saveToHistory(socket, data, firebase);
            wsServer.clients.forEach(client => {
              if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  action: 'sensor_update',
                  data: { pin, value, datastreamId: datastreamKey },
                }));
              }
            });
            break;
          case 'update_threshold':
            await handleUpdateThreshold(socket, data, firebase);
            wsServer.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  action: 'update_threshold',
                  data: data,
                }));
              }
            });
            break;
          case 'update_mode':
            await handleUpdateMode(socket, data, firebase);
            wsServer.clients.forEach(client => {
              if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  action: 'update_mode',
                  data: data,
                }));
              }
            });
            break;            
          case 'update_device':
            await handleDeviceUpdate(socket, data, firebase);
            await wsServer.clients.forEach(client => {
              if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  action: 'device_update',
                  data: data,
                }));
              }
            });
            break;

          case 'get_devices':
            await getDevices(socket, firebase);
            break;

          default:
            socket.send(JSON.stringify({ error: 'Unknown action' }));
        }
      } catch (err) {
        socket.send(JSON.stringify({ error: err.message }));
      }
    });

    // Ngắt kết nối client
    socket.on('close', () => {
      console.log(`Client disconnected: ${socket.project?.projectName}`);
    });
  } catch (err) {
    socket.close(1008, 'Authentication error');
    console.log(err);
  }
}

// Xử lý dữ liệu cảm biến
async function handleSensorData(socket, data, firebase) {
  const { pin, value } = data;
  const datastreamsSnapshot = await firebase
    .ref(`projects/${socket.project.projectId}/datastreams`)
    .orderByChild('pin')
    .equalTo(pin)
    .once('value');

  if (!datastreamsSnapshot.exists()) {
    socket.send(JSON.stringify({ error: `Datastream with pin ${pin} not found` }));
    return;
  }

  const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];
  await firebase
    .ref(`projects/${socket.project.projectId}/datastreams/${datastreamKey}`)
    .update({ lastValue: value });

  const projectId = socket.project.projectId; 
  // Lưu dữ liệu ngắn hạn
  SensorHistory.saveShortTermData(projectId, pin, value);

  // Lưu dữ liệu lâu dài (chạy riêng mỗi 5 phút một lần)
  SensorHistory.saveLongTermData(projectId, pin);
}


// Hàm cập nhật ngưỡng
async function handleUpdateThreshold(socket, data, firebase) {
  const { pin, lowThreshold, highThreshold, standard_value, user } = data;

  try {
    // Kiểm tra xem `pin` có hợp lệ không
    const datastreamsSnapshot = await firebase
      .ref(`projects/${socket.project.projectId}/datastreams`)
      .orderByChild('pin')
      .equalTo(pin)
      .once('value');

    if (!datastreamsSnapshot.exists()) {
      socket.send(JSON.stringify({ error: `Datastream with pin ${pin} not found` }));
      return;
    }

    // Lấy key của datastream
    const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];

    // Cập nhật ngưỡng thấp và ngưỡng cao
    await firebase
      .ref(`projects/${socket.project.projectId}/datastreams/${datastreamKey}`)
      .update({ lowThreshold, highThreshold, standard_value });

    // Ghi lịch sử thay đổi
    const timestamp = Date.now();
    const historyRef = firebase.ref(`device_histories/${socket.project.projectId}/${timestamp}`);

    await historyRef.set({
      type: "updateThreshold",
      value: { pin, lowThreshold, highThreshold, standard_value },
      time: new Date(timestamp).toISOString(),
      user: user ? user.fullName : "Unknown", // Kiểm tra và gán giá trị mặc định nếu user không có
    });

    console.log("Threshold updated and history logged.");
    
  } catch (error) {
    console.error("Error in handleUpdateThreshold:", error.message);
    socket.send(JSON.stringify({ error: "Failed to update threshold or log history." }));
  }
}

// Hàm cập nhật chế độ
async function handleUpdateMode(socket, data, firebase) {
  const { pin, mode, user } = data;

  try {
    // Kiểm tra xem `pin` có hợp lệ không
    const datastreamsSnapshot = await firebase
      .ref(`projects/${socket.project.projectId}/datastreams`)
      .orderByChild('pin')
      .equalTo(pin)
      .once('value');

    if (!datastreamsSnapshot.exists()) {
      socket.send(JSON.stringify({ error: `Datastream with pin ${pin} not found` }));
      return;
    }

    // Lấy key của datastream
    const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];

    // Cập nhật mode (Auto/Manual)
    await firebase
      .ref(`projects/${socket.project.projectId}/datastreams/${datastreamKey}`)
      .update({ mode });

    // Ghi lịch sử thay đổi
    const timestamp = Date.now();
    const historyRef = firebase.ref(`device_histories/${socket.project.projectId}/${timestamp}`);

    await historyRef.set({
      type: "updateMode",
      value: { pin, mode },
      time: new Date(timestamp).toISOString(),
      user: user ? user.fullName : "Unknown", // Kiểm tra và gán giá trị mặc định nếu user không có
    });

    console.log("Mode updated and history logged.");
    
  } catch (error) {
    console.error("Error in handleUpdateMode:", error.message);
    socket.send(JSON.stringify({ error: "Failed to update mode or log history." }));
  }
}


async function handleUpdateMode(socket, data, firebase) {
  const { pin, mode, user } = data;

  // Kiểm tra xem `pin` có hợp lệ không
  const datastreamsSnapshot = await firebase
    .ref(`projects/${socket.project.projectId}/datastreams`)
    .orderByChild('pin')
    .equalTo(pin)
    .once('value');

  if (!datastreamsSnapshot.exists()) {
    socket.send(JSON.stringify({ error: `Datastream with pin ${pin} not found` }));
    return;
  }

  // Lấy key của datastream
  const datastreamKey = Object.keys(datastreamsSnapshot.val())[0];

  // Cập nhật mode (Auto/Manual)
  await firebase
    .ref(`projects/${socket.project.projectId}/datastreams/${datastreamKey}`)
    .update({ mode }); 
  // Ghi lịch sử thay đổi
  const timestamp = Date.now();
  const historyRef = firebase.ref(`device_histories/${socket.project.projectId}/${timestamp}`);

  await historyRef.set({
    type: "updateMode",
    value: { pin, mode },
    time: new Date(timestamp).toISOString(),
    user: user ? user.fullName : "Unknown",
  });

  console.log("Mode updated and history logged.");
}

// Xử lý cập nhật thiết bị
async function handleDeviceUpdate(socket, data, firebase) {
  const { devicePin, deviceValue, user } = data;

  try {
    // Kiểm tra thiết bị có tồn tại không
    const devicesSnapshot = await firebase
      .ref(`projects/${socket.project.projectId}/datastreams`)
      .orderByChild('pin')
      .equalTo(devicePin)
      .once('value');

    if (!devicesSnapshot.exists()) {
      socket.send(JSON.stringify({ error: `Device with pin ${devicePin} not found` }));
      return;
    }

    // Lấy key của thiết bị
    const deviceKey = Object.keys(devicesSnapshot.val())[0];

    // Cập nhật giá trị thiết bị
    await firebase
      .ref(`projects/${socket.project.projectId}/datastreams/${deviceKey}`)
      .update({ lastValue: deviceValue });

    // console.log("Device value updated successfully.");

    // Ghi lịch sử thay đổi
    // const timestamp = Date.now();
    // const historyRef = firebase.ref(`device_histories/${socket.project.projectId}/${timestamp}`);

    // // Kiểm tra nếu socket.user không tồn tại, gán giá trị mặc định
    // const userName = user ? user.fullName : "Unknown";
    // await historyRef.set({
    //   type: "deviceUpdate",
    //   value: { devicePin, deviceValue },
    //   time: new Date(timestamp).toISOString(),
    //   user: userName, // Sử dụng userName từ socket.user
    // });

    // console.log("Device update history logged.");

  } catch (error) {
    console.error("Error in handleDeviceUpdate:", error.message);
    socket.send(JSON.stringify({ error: "Failed to update device or log history." }));
    return;
  }
}


// Lấy trạng thái các thiết bị
async function getDevices(socket, firebase) {
  const allDevicesSnapshot = await firebase
    .ref(`projects/${socket.project.projectId}/datastreams`)
    // .orderByChild('type')
    // .equalTo('device')
    .once('value');

  if (!allDevicesSnapshot.exists()) {
    socket.send(JSON.stringify({ error: 'No devices found' }));
    return;
  }

  const devices = [];
  allDevicesSnapshot.forEach((childSnapshot) => {
    devices.push({ id: childSnapshot.key, ...childSnapshot.val() });
  });

  socket.send(JSON.stringify({ action: 'device_states', data: devices }));
}

module.exports = { handleWebSocketConnection };
