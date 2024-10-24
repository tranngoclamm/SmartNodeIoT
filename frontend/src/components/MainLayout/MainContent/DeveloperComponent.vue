<template>
    <div class="content developer-wrapper">
      <div class="header-wrapper d-flex justify-content-between">
        <div class="setting_type-wrapper d-flex align-items-center">
          <!-- Thẻ img hiển thị icon được chọn -->
          <img class="aside-icon mr-1" :src="selectedIcon" />
  
          <!-- Thẻ select để người dùng chọn -->
          <select class="setting-type outline-none" v-model="selectedOption" @change="updateSettingType">
            <option value="home">Home</option>
            <option value="datastreams">Datastreams</option>
            <option value="dashboard">Dashboard</option>
            <option value="notifications">Notifications</option>
          </select>
        </div>
      
        <div class="d-flex">
          <p v-if="copySuccess" style="color: green;">Code copied to clipboard!</p>
          <div v-show="!guideLink" class="">
            <button type="button" class="btn btn-secondary outline-none"><span>Cancel</span></button>
          </div>
          <div v-show="!guideLink" class="">
            <button type="button" class="btn btn-primary font-bold outline-none"><span>Save And Apply</span></button>
          </div>
          <div v-show="guideLink" class="">
            <button type="button" class="btn btn-primary outline-none font-italic mr-2"><span>Quick Start</span></button>
          </div>
        </div>
      </div>

      <router-view />
      
    </div>
</template>
    
<script>
export default {
  name: 'DeveloperComponent',
  data() {
    return {
      selectedOption: 'home', // Lựa chọn mặc định
      icons: {
        home: require('@/assets/images/2198303-512.png'),
        datastreams: require('@/assets/images/big-data-9.svg'),
        dashboard: require('@/assets/images/extension-svgrepo-com.svg'),
        notifications: require('@/assets/images/alarm-bell-3.svg')
      },
      selectedIcon: '' ,
      project_id: 'TMPL63ujrsBY6',
      project_name: 'Smart Greenhouse',
      auth_token: 'S1Rq0-alEd67OWfGhaEXB9B3aJnvek3Y',
      copySuccess: false,
      guideLink: true,
    };
  },
  methods: {
    updateSettingType() {
      // Cập nhật src của img theo lựa chọn trong thẻ select
      this.selectedIcon = this.icons[this.selectedOption];
      // Hiển thị quickstart với home và save với select còn lại
      if(this.selectedOption == 'home'){
        this.guideLink = true;
      } else{
        this.guideLink = false;
      }
      // Chuyển router
      this.$router.push(`/developer/${this.selectedOption}`);
    },
    copyToClipboard() {
      const el = document.createElement('textarea');
      el.value = this.code;
      document.body.appendChild(el);
      el.select();
      document('copy');
      document.body.removeChild(el);
      this.copySuccess = true;

      // Ẩn thông báo sau 3 giây
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    },
  },
  mounted() {
    // Chạy Home khi tải
    this.updateSettingType();
  }
};
</script>

    