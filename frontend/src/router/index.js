// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/Authentication/LoginComponent.vue';
import RegisterComponent from '@/components/Authentication/RegisterComponent.vue';
import MainLayout from '@/components/MainLayout/MainLayout.vue';
import DashboardComponent from '@/components/MainLayout/MainContent/DashboardComponent.vue';
import GoogleMap from '@/components/MainLayout/MainContent/GoogleMap.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterComponent
  },
  {
    path: '/dashboard',
    component: MainLayout,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '/map',
    component: MainLayout,
    children: [
      {
        path: '',
        component: GoogleMap,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
