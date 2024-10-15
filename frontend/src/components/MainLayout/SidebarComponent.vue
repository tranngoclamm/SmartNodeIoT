<template>
    <div data-color="black" data-image="@/assets/images/sidebar-4.jpg" class="sidebar" :style="{backgroundImage: `url(${require('@/assets/images/sidebar-4.jpg')})` }">
        <div class="sidebar-wrapper">
          <div class="logo">
            <a href="#" class="simple-text">
              <img class="logo-img" src="@/assets/images/avatar-mac-dinh-1.jpg" alt="">
              Nguyễn Văn Hoàng
            </a>
          </div>
          <ul class="nav">
            <li class="router-link-exact-active nav-item active">
              <a href="#/admin/overview" class="nav-link">
                <i class="nc-icon nc-chart-pie-35"></i>
                <p>Dashboard</p>
              </a>
            </li>
            <li class="">
              <a href="#/admin/user" class="nav-link">
                <i class="nc-icon nc-settings-90"></i>
                <p>Developer Zone</p>
              </a>
            </li>
            <li class="">
              <a href="#/admin/typography" class="nav-link">
                <i class="nc-icon nc-single-02"></i>
                <p>Users</p>
              </a>
            </li>
            <li class="">
              <a href="#/admin/maps" class="nav-link">
                <i class="nc-icon nc-pin-3"></i>
                <p>Maps</p>
              </a>
            </li>
            <li class="">
              <a href="#/admin/maps" class="nav-link">
                <i class="nc-icon nc-paper-2"></i>
                <p>History</p>
              </a>
            </li>
            <li class="">
              <a href="#/admin/maps" class="nav-link">
                <i class="nc-icon nc-settings-gear-64"></i>
                <p>Settings</p>
              </a>
            </li>
            <!-- <li class="">
              <a href="#/admin/notifications" class="nav-link">
                <i class="nc-icon nc-bell-55"></i>
                <p>Notifications</p>
              </a>
            </li> -->
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
      };
    },
    methods: {
      toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
      },
    },
  };
  </script>
  