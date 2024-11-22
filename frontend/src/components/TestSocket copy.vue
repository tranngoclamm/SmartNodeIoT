<template>
  <div class="websocket-test">
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
import axios from "axios";

export default {
  data() {
    return {
      logs: [],
      authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
      value: null,
      pin: null,
      apiUrl: "http://172.20.10.13:8000/api",
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
</script>


<!-- <script>
// import WebSocket from "websocket";

export default {
  data() {
    return {
      logs: [],
      authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
      value: null,
      socket: null,
    };
  },
  created() {
    // Khởi tạo WebSocket kết nối đến server
    this.socket = new WebSocket("ws://172.20.10.13:8000");

    // Đăng ký các sự kiện WebSocket
    this.socket.onopen = () => {
      this.logs.push("Connected to WebSocket server123.");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "sensor_update") {
        this.logs.push(`Sensor Update: ${JSON.stringify(data)}`);
      } else if (data.type === "device_update") {
        this.logs.push(`Device Update: ${JSON.stringify(data)}`);
      } else if (data.type === "device_states") {
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
        type: "sensor_data",
        pin: this.pin,
        value: this.value,
      });
      this.socket.send(message);
    },
    // Cập nhật trạng thái thiết bị
    updateDeviceState() {
      if (!this.pin || !this.value) {
        alert("Please fill in all fields.");
        return;
      }
      const message = JSON.stringify({
        type: "update_device",
        pin: this.pin,
        value: this.value,
      });
      this.socket.send(message);
    },
    // Lấy trạng thái của các thiết bị
    fetchDeviceStates() {
      const message = JSON.stringify({
        type: "get_devices",
      });
      this.socket.send(message);
    },
  },
  beforeUnmount() {
    // Đảm bảo đóng kết nối WebSocket khi component bị hủy
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script> -->

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
