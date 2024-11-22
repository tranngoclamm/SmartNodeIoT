// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router
import store from './store/store';

createApp(App)
  .use(router) // Sử dụng router
  .use(store)
  .mount('#app');
