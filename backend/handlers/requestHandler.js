// Xử lý yêu cầu HTTP (POST) gửi dữ liệu từ ESP32 lên Firebase
function handleRequest(request, response, firebase) {
    let body = '';
    request.on('data', chunk => {
      body += chunk;
    });
  
    request.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received data from ESP32:', data);
  
        // Lưu dữ liệu vào Firebase
        firebase.database().ref('sensorData').push(data);
  
        // Trả về phản hồi
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Data received successfully' }));
      } catch (err) {
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Failed to process data' }));
      }
    });
  }
  
  module.exports = { handleRequest };
  