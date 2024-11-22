<template>
    <div data-color="black" data-image="@/assets/images/sidebar-4.jpg" class="sidebar" v-if="isSidebar" :style="{backgroundImage: `url(${require('@/assets/images/sidebar-4.jpg')})` }">
        <div class="sidebar-wrapper">
          <div class="logo">
            <a href="#" class="simple-text" >
              <router-link to="/user-profile" style="color: white !important;">
                <img class="logo-img" :src="user.avatar || 'https://res.cloudinary.com/dlawgdb8h/image/upload/v1730344959/avatars/kn6xdlvb6hivqkhka000.jpg'" alt="">
                {{user.fullName}}
              </router-link>
            </a>
          </div>
          <ul class="nav">
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 0}">
              <router-link to="/dashboard" class="nav-link" @click="setActive(0)">
                <i class="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
              </router-link>
            </li>
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 1}">
              <router-link to="/developer/home" class="nav-link" @click="setActive(1)">
                <i class="nc-icon nc-settings-90"></i>
                <p>Developer Zone</p>
              </router-link>
            </li>
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 2}">
              <router-link to="/user" class="nav-link" @click="setActive(2)">
                <i class="nc-icon nc-single-02"></i>
                <p>Users</p>
              </router-link>
            </li>
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 3}">
              <router-link to="/map" class="nav-link" @click="setActive(3)">
                <i class="nc-icon nc-pin-3"></i>
                <p>Maps</p>
              </router-link>
            </li>
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 4}">
              <router-link to="/history" class="nav-link" @click="setActive(4)">
                <i class="nc-icon nc-paper-2"></i>
                <p>History</p>
              </router-link>
            </li>
            <li :class="{'router-link-exact-active nav-item active': activeIndex === 5}">
              <router-link to="/setting" class="nav-link" @click="setActive(5)">
                <i class="nc-icon nc-settings-gear-64"></i>
                <p>Settings</p>
              </router-link>
            </li>
            <div class="d-flex w-100 align-items-center justify-content-center">
              <a @click.prevent="toggleSidebar" href="" class="nav-link close-btn">
                <i class="nc-icon nc-simple-remove"></i>
              </a>
            </div>
            <div class="d-flex w-100 align-items-center justify-content-center">
              <a @click.prevent="logOut" href="" class="nav-link logout-btn">
                <p class="logout-btn">Logout</p>
              </a>
            </div>
          </ul>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarComponent',
    data() {
      return {
        isDropdownOpen: false,
        activeIndex: null,
        user:{},
      };
    },
    computed: {
      isSidebar() {
        return this.$store.getters.isSidebarOpen;
      },
    },
    methods: {
      setActiveByRoute() {
        const routePath = this.$route.path;

        // Kiểm tra đường dẫn và gán activeIndex
        if (routePath === '/dashboard') {
          this.activeIndex = 0;
        } else if (routePath.includes('/developer')) {
          this.activeIndex = 1;
        } else if (routePath === '/user') {
          this.activeIndex = 2;
        } else if (routePath === '/map') {
          this.activeIndex = 3;
        } else if (routePath === '/history') {
          this.activeIndex = 4;
        } else if (routePath === '/setting') {
          this.activeIndex = 5;
        }
      },
      logOut(){
        localStorage.removeItem('token');
        this.$router.push("/login"); 
      },
      setActive(index) {
        this.activeIndex = index; // Khi click vào phần tử, set activeIndex
        if (window.innerWidth < 992) {
          this.toggleSidebar();
        }
      },
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
      toggleSidebar(){
        this.$store.dispatch('toggleSidebar');
      }
    },
    mounted() {
      this.setActiveByRoute(); // Đặt activeIndex khi component được mount
      this.user = JSON.parse(localStorage.getItem("user"));
    },
    watch: {
    // Khi route thay đổi, kiểm tra lại để cập nhật activeIndex
    '$route.path'() {
      this.setActiveByRoute();
    },
  },
  };
  </script>
  