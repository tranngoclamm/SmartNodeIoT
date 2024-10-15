<template>
    <div class="wrapper">
      <SidebarComponent />
      <div class="main-panel">
        <NavbarComponent />
        <div class="content">
          <router-view />
        </div>
        <FooterComponent />
      </div>
    </div>
  </template>
  
  <script>
  import SidebarComponent from './SidebarComponent.vue';
  import NavbarComponent from './NavbarComponent.vue';
  import FooterComponent from './FooterComponent.vue';
  import '@/assets/css/bootstrap.css';
  import '@/assets/css/nucleo-icons.css';
  import '@/assets/css/main.css';

  export default {
    name: 'MainLayout',
    components: {
      SidebarComponent,
      NavbarComponent,
      FooterComponent,
    },
  };
  </script>
  