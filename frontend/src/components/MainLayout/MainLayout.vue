<template>
    <div class="wrapper">
      <SidebarComponent />
      <div class="main-panel" :class="{'overflow-hidden': isScrollLocked}">
        <NavbarComponent />
        <router-view />
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
    computed: {
      isScrollLocked() {
        return this.$store.getters.isScrollLocked;
      },
    },
    components: {
      SidebarComponent,
      NavbarComponent,
      FooterComponent,
    },
  };
  </script>
  
<style scoped>
  .overflow-hidden {
    overflow: hidden;
  }
</style>