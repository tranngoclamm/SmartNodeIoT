<template>
  <div class="websocket-test">
    <div>
      <h2>Cảm Biến</h2>
      <ul>
        <li v-for="sensor in sensors" :key="sensor.pin">
          Pin: {{ sensor.pin }} - Giá trị: {{ sensor.value }}
        </li>
      </ul>
      
      <h2>Thiết Bị</h2>
      <ul>
        <li v-for="device in devices" :key="device.pin">
          Pin: {{ device.pin }} - Giá trị: {{ device.value }}
        </li>
      </ul>
    </div>
    <h1>WebSocket Test</h1>
    <div>
      <label for="authToken">Auth Token:</label>
      <input v-model="authToken" type="text" id="authToken" placeholder="Enter Auth Token" />
    </div>
    <div>
      <label for="pin">Pin:</label>
      <input v-model="pin" type="text" id="pin" placeholder="Enter Pin" />
    </div>
    <div>
      <label for="value">Value:</label>
      <input v-model="value" type="text" id="value" placeholder="Enter Value" />
    </div>
    <button @click="joinProject">Join Project</button>
    <button @click="sendSensorData">Send Sensor Data</button>
    <button @click="updateDeviceState">Update Device State</button>
    <button @click="fetchDeviceStates">fetchDeviceStates</button>
    
    <div>
      <h2>Logs</h2>
      <div v-for="log in logs" :key="log" class="log">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
// import WebSocket from "websocket";

export default {
  data() {
    return {
      logs: [],
      authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
      value: null,
      socket: null,
      sensors: [], // Dữ liệu cảm biến
      devices: []   // Dữ liệu thiết bị
    };
  },
  created() {
    const wsUrl = `ws://172.20.10.13:8000?token=${this.authToken}`;
    this.socket = new WebSocket(wsUrl); // Khởi tạo WebSocket kết nối với token trong query string
    // Đăng ký các sự kiện WebSocket
    this.socket.onopen = () => {
      this.logs.push("Connected to WebSocket server123.");
    };
    // Lắng nghe sự kiện 'open' khi kết nối thành công
    this.socket.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    // Lắng nghe sự kiện 'message' để nhận dữ liệu từ server
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      this.handleWebSocketMessage(message);
    });

    this.socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log('Received response:', response);
      const data = JSON.parse(event.data);
      if (data.action === "sensor_update") {
        this.logs.push(`Sensor Update: ${JSON.stringify(data)}`);
        console.log('Sensor Update: ', response.data);
      } else if (data.action === "device_update") {
        console.log('Device states:', response.data);
        this.logs.push(`Device Update: ${JSON.stringify(data)}`);
      } else if (data.action === "device_states") {
        console.log('Device states:', response.data);
        this.logs.push(`Device States: ${JSON.stringify(data)}`);
      }
    };

    this.socket.onerror = (error) => {
      this.logs.push(`Error: ${error.message}`);
    };

    this.socket.onclose = () => {
      this.logs.push("Disconnected from WebSocket server.");
    };
  },
  methods: {
  // Gửi dữ liệu cảm biến qua WebSocket
  sendSensorData() {
    if (!this.pin || !this.value) {
      alert("Please fill in all fields.");
      return;
    }
    const message = JSON.stringify({
      action: "sensor_data",  // Cấu trúc hành động cần gửi
      data: {
        pin: this.pin,        // Pin cảm biến
        value: this.value,    // Giá trị cảm biến
      },
    });
    this.socket.send(message);  // Gửi dữ liệu qua WebSocket
  },
  
  // Cập nhật trạng thái thiết bị
  updateDeviceState() {
    if (!this.pin || !this.value) {
      alert("Please fill in all fields.");
      return;
    }
    const message = JSON.stringify({
      action: "update_device",  // Cấu trúc hành động cập nhật thiết bị
      data: {
        devicePin: this.pin,          // Pin thiết bị
        deviceValue: this.value,      // Giá trị mới của thiết bị
      },
    });
    this.socket.send(message);  // Gửi dữ liệu qua WebSocket
  },

  // Lấy trạng thái của các thiết bị
  fetchDeviceStates() {
    const message = JSON.stringify({
      action: "get_devices",    // Cấu trúc hành động lấy thông tin thiết bị
    });
    this.socket.send(message);  // Gửi yêu cầu qua WebSocket
  },
  handleWebSocketMessage(message) {
    switch (message.action) {
      case 'sensor_update':
        this.updateSensorData(message.data);
        break;
      case 'device_update':
        this.updateDeviceData(message.data);
        break;
      default:
        console.log('Unknown action:', message.action);
    }
  },
  
  updateSensorData(data) {
    // Cập nhật dữ liệu cảm biến
    const index = this.sensors.findIndex(sensor => sensor.pin === data.pin);
    if (index !== -1) {
      this.sensors[index].value = data.value;
    } else {
      this.sensors.push(data);
    }
  },
  
  updateDeviceData(data) {
    // Cập nhật dữ liệu thiết bị
    const index = this.devices.findIndex(device => device.pin === data.pin);
    if (index !== -1) {
      this.devices[index].value = data.value;
    } else {
      this.devices.push(data);
    }
  },
},

  beforeUnmount() {
    // Đảm bảo đóng kết nối WebSocket khi component bị hủy
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<!-- <script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      logs: [],
      authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
      value: null,
    };
  },
  created() {
    this.socket = io("http://172.20.10.13:8000", {
      transports: ["websocket"], 
      // auth: {
      //   token: this.authToken, // Gửi JWT để xác thực
      // },
    });

    this.socket.on("connect", () => {
      this.logs.push("Connected to WebSocket server.");
    });

    this.socket.on("sensor_update", (data) => {
      this.logs.push(`Sensor Update: ${JSON.stringify(data)}`);
    });

    this.socket.on("device_update", (data) => {
      this.logs.push(`Device Update: ${JSON.stringify(data)}`);
    });

    this.socket.on("device_states", (data) => {
      this.logs.push(`Device States: ${JSON.stringify(data)}`);
    });

    this.socket.on("error", (error) => {
      this.logs.push(`Error: ${error}`);
    });

    this.socket.on("disconnect", () => {
      this.logs.push("Disconnected from WebSocket server.");
    });
  },
  methods: {
    sendSensorData() {
      if (!this.pin || !this.value) {
        alert("Please fill in all fields.");
        return;
      }
      this.socket.emit("sensor_data", {
        pin: this.pin,
        value: this.value,
      });
    },
    updateDeviceState() {
      if (!this.pin || !this.value) {
        alert("Please fill in all fields.");
        return;
      }
      this.socket.emit("update_device", {
        pin: this.pin,
        value: this.value,
      });
    },
    fetchDeviceStates() {
      this.socket.emit("get_devices");
    },
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};

</script> -->


<!-- <script>
import axios from "axios";

export default {
  data() {
    return {
      logs: [],
      authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
      value: null,
      pin: null,
      apiUrl: "http://192.168.31.225:8000/api",
    };
  },
  methods: {
    // Gửi dữ liệu cảm biến qua HTTP POST
    async sendSensorData() {
      if (!this.pin || !this.value) {
        alert("Please fill in all fields.");
        return;
      }
      try {
        const response = await axios.post(`${this.apiUrl}/sensor-data`, {
          authToken: this.authToken,
          pin: this.pin,
          value: this.value,
        });
        this.logs.push(`Sensor Data Sent: ${JSON.stringify(response.data)}`);
      } catch (error) {
        this.logs.push(`Error: ${error.response?.data?.error || error.message}`);
      }
    },
    // Cập nhật trạng thái thiết bị qua HTTP POST
    async updateDeviceState() {
      if (!this.pin || !this.value) {
        alert("Please fill in all fields.");
        return;
      }
      try {
        const response = await axios.post(`${this.apiUrl}/device-state`, {
          authToken: this.authToken,
          pin: this.pin,
          value: this.value,
        });
        this.logs.push(`Device State Updated: ${JSON.stringify(response.data)}`);
      } catch (error) {
        this.logs.push(`Error: ${error.response?.data?.error || error.message}`);
      }
    },
    // Lấy trạng thái của các thiết bị qua HTTP GET
    async fetchDeviceStates() {
      try {
        const response = await axios.get(`${this.apiUrl}/device-states`, {
          headers: {
            Authorization: this.authToken,
          },
        });
        this.logs.push(`Device States: ${JSON.stringify(response.data)}`);
      } catch (error) {
        this.logs.push(`Error: ${error.response?.data?.error || error.message}`);
      }
    },
  },
};
</script> -->

<style>
.websocket-test {
  padding: 20px;
}
.log {
  margin: 10px 0;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
}
</style>
