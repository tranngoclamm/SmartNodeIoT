const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('./config/firebaseConfig'); // Firebase config
const { handleRequest } = require('./handlers/requestHandler'); // Xử lý HTTP requests
const { handleWebSocketConnection } = require('./handlers/wsHandler'); // Xử lý WebSocket
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(cors({
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(bodyParser.json());

app.use('/api', require('./routers/authRoutes'));
app.use('/api', require('./routers/projectRoutes'));

// Tạo WebSocket server
const wsServer = new WebSocket.Server({ server });

// Xử lý kết nối WebSocket
wsServer.on('connection', (socket, req) => {
  handleWebSocketConnection(socket, req, firebase, wsServer);
});

// Xử lý các yêu cầu HTTP
app.post('/api/data', (request, response) => {
  handleRequest(request, response, firebase);
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
