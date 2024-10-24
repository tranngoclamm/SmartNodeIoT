<template>
    <div class="developer__home-wrapper">
      <div class="d-flex flex-column project-code-editor">
        <!-- Phần hướng dẫn sử dụng bên dưới -->
        <div class="guide-section">
          <!-- <h3>Hướng dẫn sử dụng</h3> -->
          <ol>
            <li>Install the library and set up the environment
              <p>Install the 
                <a href="">SMIoT Library</a> 
                in a development environment like Arduino IDE or PlatformIO.
              </p>
            </li>
            <li>Obtain the authentication code
              <p>Copy this code for use in your Arduino source code or other IDEs.</p>
              <div class="position-relative mb-4">
                <div class="code-content" ref="codeContent">
                  <p>#define SMIoT_PROJECT_ID 
                    <span>"{{project_id}}"</span>
                  </p>
                  <p>#define SMIoT_PROJECT_NAME 
                    <span>"{{project_name}}"</span>
                  </p>
                  <p>#define SMIoT_AUTH_TOKEN
                    <span>"{{auth_token}}"</span>
                  </p>
                </div>
                <button @click="copyToClipboard" class="copy-button outline-none">
                  <img src="@/assets/images/copy-34.svg" alt="Copy" style="width: 35px; height: 35px;">
                </button>
              </div>
            </li>
            <p v-if="copySuccess" style="color: green;">Code copied to clipboard!</p>
            <li>Configure the connection in the source code
              <p>Add the authentication code and your WiFi connection information to the device's source code. SMIoT provides 
                <a href="">sample examples </a>
                in the library to help you easily connect and control your devices remotely.
              </p>
            </li>
            <li>Program the widgets and controls
              <p>After a successful connection, you can add 
                <router-link to="/developer/widget">control widgets</router-link> 
                to the SMIoT project, such as buttons, gauges, graphs, and control devices through virtual pins.
              </p>
            </li>
            <li>Test and refine
              <p>Finally, you can 
                <router-link to="/dashboard">
                  test and refine 
                </router-link>
                the setup through the Blynk mobile app or Blynk Cloud to control devices remotely and monitor the device status in real time.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
</template>
    
<script>
export default {
  name: 'HomeContent',
  data() {
    return {
      project_id: 'TMPL63ujrsBY6',
      project_name: 'Smart Greenhouse',
      auth_token: 'S1Rq0-alEd67OWfGhaEXB9B3aJnvek3Y',
      copySuccess: false,
    };
  },
  methods: {
    copyToClipboard() {
      // Lấy nội dung của thẻ <div class="code-content">
      const content = this.$refs.codeContent.innerText;

      // Tạo một textarea tạm thời để copy nội dung
      const el = document.createElement('textarea');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      // Hiển thị thông báo copy thành công
      this.copySuccess = true;

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    },
  },
};
</script>

    