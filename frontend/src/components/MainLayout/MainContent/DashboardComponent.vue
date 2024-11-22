<template>
  <div class="dashboard-wrapper px-2 py-6" style="padding-top:20px">
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-3 col-md-6" v-for="(datastream, index) in datastreams" :key="index">
            <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="icon-big text-center">
                      <div>
                        <i :class="datastream.image"></i>
                      </div>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="numbers">
                      <div>
                        <p class="card-category">{{ datastream.name }}</p>
                        <h4 class="card-title">{{ datastream.lastValue}}{{datastream.unit }}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="card-footer row">
                <div class="stats d-flex col-8">
                  <select @change="updateMode(datastream.pin, datastream.mode)" v-model="datastream.mode" class="auto-manual-select">
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                  </select>
                  <div :style="{ visibility: datastream.mode === 'Auto' ? 'visible' : 'hidden' }"
                    class="d-flex align-items-center">
                    <span class="threadhold-value">{{ datastream.lowThreshold }}</span>
                    <span class="threadhold-value mx-1">-</span>
                    <span class="threadhold-value">{{ datastream.highThreshold }}</span>
                    <span class="threadhold-type">{{ datastream.unit }}</span>
                    <i @click="openModal(datastream)" class="setting setting-update-btn cursor-pointer nc-icon nc-preferences-circle-rotate"></i>
                  </div>
                </div>
                <div class="form-switch d-flex align-items-center col-4">
                  <input type="checkbox" @change="updateDeviceState(datastream.devices[0].pin, datastream.devices[0].lastValue)" id="flexSwitchCheckChecked" v-model="datastream.devices[0].lastValue" :true-value="1" :false-value="0">
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="card col-12">
            <div class="card-header">
              <h4 class="card-title">Users Behavior</h4>
              <p class="card-category">24 Hours performance</p>
            </div>
            <div class="card-body">
              <div id="div_1137586267072" class="ct-chart">
                <svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="245px"
                  class="ct-chart-line" style="width: 100%; height: 245px;">
                  <g class="ct-grids">
                    <line y1="210" y2="210" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="185.625" y2="185.625" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="161.25" y2="161.25" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="136.875" y2="136.875" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="112.5" y2="112.5" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="88.125" y2="88.125" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="63.75" y2="63.75" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="39.375" y2="39.375" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                    <line y1="15" y2="15" x1="50" x2="638.65625" class="ct-grid ct-vertical"></line>
                  </g>
                  <g>
                    <g class="ct-series ct-series-a">
                      <path
                        d="M50,140.044C78.031,132.081,106.063,124.393,134.094,116.156C162.125,107.919,190.156,90.881,218.188,90.563C246.219,90.244,274.25,90.39,302.281,90.075C330.313,89.76,358.344,78.392,386.375,74.963C414.406,71.533,442.438,71.207,470.469,67.163C498.5,63.118,526.531,39.863,554.563,39.863C582.594,39.863,610.625,40.35,638.656,40.594"
                        class="ct-line"></path>
                      <line x1="50" y1="140.04375" x2="50.01" y2="140.04375" class="ct-point" ct:value="287" opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="134.09375" y1="116.15625" x2="134.10375" y2="116.15625" class="ct-point" ct:value="385"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="218.1875" y1="90.5625" x2="218.1975" y2="90.5625" class="ct-point" ct:value="490"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="302.28125" y1="90.075" x2="302.29125" y2="90.075" class="ct-point" ct:value="492"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="386.375" y1="74.9625" x2="386.385" y2="74.9625" class="ct-point" ct:value="554"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="470.46875" y1="67.1625" x2="470.47875" y2="67.1625" class="ct-point" ct:value="586"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="554.5625" y1="39.86250000000001" x2="554.5725" y2="39.86250000000001" class="ct-point"
                        ct:value="698" opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="638.65625" y1="40.59375" x2="638.66625" y2="40.59375" class="ct-point" ct:value="695"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                    </g>
                    <g class="ct-series ct-series-b">
                      <path
                        d="M50,193.669C78.031,186.763,106.063,172.95,134.094,172.95C162.125,172.95,190.156,175.144,218.188,175.144C246.219,175.144,274.25,156.645,302.281,151.5C330.313,146.355,358.344,143.903,386.375,140.044C414.406,136.185,442.438,133.614,470.469,128.344C498.5,123.073,526.531,104.287,554.563,103.969C582.594,103.65,610.625,103.644,638.656,103.481"
                        class="ct-line"></path>
                      <line x1="50" y1="193.66875" x2="50.01" y2="193.66875" class="ct-point" ct:value="67" opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="134.09375" y1="172.95" x2="134.10375" y2="172.95" class="ct-point" ct:value="152"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="218.1875" y1="175.14375" x2="218.1975" y2="175.14375" class="ct-point" ct:value="143"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="302.28125" y1="151.5" x2="302.29125" y2="151.5" class="ct-point" ct:value="240"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="386.375" y1="140.04375" x2="386.385" y2="140.04375" class="ct-point" ct:value="287"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="470.46875" y1="128.34375" x2="470.47875" y2="128.34375" class="ct-point" ct:value="335"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="554.5625" y1="103.96875" x2="554.5725" y2="103.96875" class="ct-point" ct:value="435"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="638.65625" y1="103.48125" x2="638.66625" y2="103.48125" class="ct-point" ct:value="437"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                    </g>
                    <g class="ct-series ct-series-c">
                      <path
                        d="M50,204.394C78.031,197.081,106.063,182.456,134.094,182.456C162.125,182.456,190.156,193.669,218.188,193.669C246.219,193.669,274.25,188.117,302.281,183.675C330.313,179.233,358.344,168.672,386.375,163.688C414.406,158.703,442.438,156.372,470.469,151.744C498.5,147.116,526.531,135.329,554.563,135.169C582.594,135.009,610.625,135.006,638.656,134.925"
                        class="ct-line"></path>
                      <line x1="50" y1="204.39375" x2="50.01" y2="204.39375" class="ct-point" ct:value="23" opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="134.09375" y1="182.45625" x2="134.10375" y2="182.45625" class="ct-point" ct:value="113"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="218.1875" y1="193.66875" x2="218.1975" y2="193.66875" class="ct-point" ct:value="67"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="302.28125" y1="183.675" x2="302.29125" y2="183.675" class="ct-point" ct:value="108"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="386.375" y1="163.6875" x2="386.385" y2="163.6875" class="ct-point" ct:value="190"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="470.46875" y1="151.74375" x2="470.47875" y2="151.74375" class="ct-point" ct:value="239"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="554.5625" y1="135.16875" x2="554.5725" y2="135.16875" class="ct-point" ct:value="307"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                      <line x1="638.65625" y1="134.925" x2="638.66625" y2="134.925" class="ct-point" ct:value="308"
                        opacity="0">
                        <animate attributeName="opacity" begin="indefinite" dur="500ms" from="0" to="1" fill="freeze">
                        </animate>
                      </line>
                    </g>
                  </g>
                  <g class="ct-labels">
                    <foreignObject style="overflow: visible;" x="50" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">9:00AM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="134.09375" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">12:00AM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="218.1875" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">3:00PM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="302.28125" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">6:00PM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="386.375" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">9:00PM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="470.46875" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">12:00PM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="554.5625" y="215" width="84.09375" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 84px; height: 20px;">3:00AM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" x="638.65625" y="215" width="30" height="20">
                      <span class="ct-label ct-horizontal ct-end" style="width: 30px; height: 20px;">6:00AM</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="185.625" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">0</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="161.25" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">100</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="136.875" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">200</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="112.5" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">300</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="88.125" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">400</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="63.75" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">500</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="39.375" x="10" height="24.375" width="30">
                      <span class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">600</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="15" x="10" height="24.375" width="30"><span
                        class="ct-label ct-vertical ct-start" style="height: 24px; width: 30px;">700</span>
                    </foreignObject>
                    <foreignObject style="overflow: visible;" y="-15" x="10" height="30" width="30"><span
                        class="ct-label ct-vertical ct-start" style="height: 30px; width: 30px;">800</span>
                    </foreignObject>
                  </g>
                </svg>
              </div>
  
  
            </div>
            <div class="card-footer">
              <div class="legend"><i class="fa fa-circle text-info"></i> Open <i class="fa fa-circle text-danger"></i>
                Click <i class="fa fa-circle text-warning"></i> Click Second Time</div>
              <hr>
              <div class="stats"><i class="fa fa-history"></i> Updated 3 minutes ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-if="isModalVisible" class="modal-container" @click.self="closeModal">
      <div class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div class="modal-header">
                <h5 class="modal-title">{{selectedDataStreamName}}</h5>
                <button type="button" class="close" @click="closeModal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="form-layout detail-section">
                <div class="form-group w-100">
                  <label>Standard <span>*</span></label>
                  <input spellcheck="false" type="number" v-model="selectedStandardValue"  class="form-control" id="Title" placeholder="Enter standard value">
                </div>
                <div class="form-group w-100">
                  <label>Low Threshold <span>*</span></label>
                  <input spellcheck="false" type="number" v-model="selectedLowThreshold"  class="form-control" id="Title" placeholder="Enter low threshold value">
                </div>
                <div class="form-group w-100">
                  <label>High Threshold <span>*</span></label>
                  <input spellcheck="false" type="number" v-model="selectedHighThreshold" class="form-control" placeholder="Enter high threshold value">
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="updateThreshold" class="btn btn-primary w-100">Update</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Overlay mờ phía sau modal -->
      <div class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>
<script>
  import '@/assets/css/bootstrap.css';
  import '@/assets/css/dashboard.css';

  export default {
    name: 'DashboardComponent',
    data() {
      return {
        logs: [],
        authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SWQiOiItT0J0T0FSei0yekZJb3JtQWpOSCIsImlhdCI6MTczMTgzNDcyMn0.fWQUxphvvpnDVJ529HSMJIJ5bgzCmednDmsnbS_0Eco",
        value: null,
        socket: null,
        isModalVisible: false,
        recipient: '',
        selectedPin: '',
        selectedDataStreamName: '',
        selectedStandardValue:'',
        selectedLowThreshold: '',
        selectedHighThreshold: '',
        nameSensor: 'LIGHT',
        projectAuthToken: '',
        lowThreshold: '23',
        highThreshold: '70',
        datastreams: {},
        projectId: '',
        user : {},
      };
    },
    async mounted() {
      localStorage.setItem("project_token", this.authToken); 
      localStorage.setItem("project_id", this.projectId); 
      this.projectAuthToken = localStorage.getItem("project_token"); 
      await this.initializeWebSocket();
      this.user = JSON.parse(localStorage.getItem("user"));
      this.sendMessage({ action: "get_devices" });
    },

    methods: {
      async initializeWebSocket() {
        const wsUrl = `ws://172.20.10.13:8000?token=${this.projectAuthToken}`;
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = () => {
          console.log("Connected to WebSocket server.");
          this.fetchDeviceStates();
        };

        this.socket.onmessage = async (event) => {
          const response = JSON.parse(event.data);
          if (response.action === "sensor_update") {
            console.log(`Sensor Updated`);
          } else if (response.action === "update_threshold") {
            console.log(`Update Threshold: ${JSON.stringify(response)}`);
            this.fetchDeviceStates();
          } else if (response.action === "update_mode") {
            console.log(`Update Mode: ${JSON.stringify(response)}`);
            this.fetchDeviceStates();
          }
           else if (response.action === "device_update") {
            // console.log(`Device Updated`);
            this.fetchDeviceStates();
          } else if (response.action === "device_states") {
            // console.log(`Device States Updated`);
            this.datastreams = this.mergedData(response.data);
          }
        };

        this.socket.onerror = (error) => {
          console.log(`Error: ${error.message}`);
        };

        this.socket.onclose = () => {
          console.log("Disconnected from WebSocket server.");
        };
      },

      // Hàm gửi tin nhắn qua WebSocket an toàn
      sendMessage(message) {
        // Kiểm tra trạng thái WebSocket trước khi gửi
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(message));
        } else {
          // Nếu WebSocket chưa mở, đợi và thử lại sau một thời gian ngắn
          setTimeout(() => {
            this.sendMessage(message);
          }, 500);
        }
      },

      async fetchDeviceStates() {
        // Gửi yêu cầu lấy dữ liệu thiết bị
        this.sendMessage({ action: "get_devices" });
      },

      mergedData(dataStreams) {
        const sensorMap = new Map();
        dataStreams.forEach(item => {
          if (item.type === "sensor") {
            sensorMap.set(item.id, { ...item, devices: [] });
          }
        });

        dataStreams.forEach(item => {
          if (item.type === "device" && item.sensorId) {
            const sensor = sensorMap.get(item.sensorId);
            if (sensor) {
              sensor.devices.push(item);
            }
          }
        });

        return Array.from(sensorMap.values());
      },
      scrollToTop() {
        const mainPanel = document.querySelector('.main-panel');
        if (mainPanel) {
          mainPanel.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      openModal(datastream) {
        this.selectedPin = datastream.pin;
        this.selectedDataStreamName = datastream.name;
        this.selectedLowThreshold = datastream.lowThreshold;
        this.selectedHighThreshold = datastream.highThreshold;
        this.selectedStandardValue = datastream.standard_value;
        this.isModalVisible = true;
        this.scrollToTop();
        this.$store.dispatch('lockScroll');
      },

      closeModal() {
        this.isModalVisible = false;
        this.$store.dispatch('unlockScroll');
      },

      updateThreshold() {
        if (!this.selectedPin || !this.selectedLowThreshold || !this.selectedHighThreshold || !this.selectedStandardValue ) {
          alert("Please fill in all fields.");
          return;
        }
        const message = {
          action: "update_threshold",
          data: {
            pin: this.selectedPin,
            standard_value : this.selectedStandardValue,
            lowThreshold: this.selectedLowThreshold,
            highThreshold: this.selectedHighThreshold,
            user: this.user
          },
        };
        this.sendMessage(message);
        this.closeModal();
      },

      updateMode(pin, mode) {
        const message = {
          action: "update_mode",
          data: {
            pin: pin,
            mode: mode,
            user: this.user
          },
        };
        this.sendMessage(message);
      },

      updateDeviceState(pin, value) {
        const message = {
          action: "update_device",
          data: {
            devicePin: pin,
            deviceValue: value,
            user: this.user
          },
        };
        this.sendMessage(message);
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
