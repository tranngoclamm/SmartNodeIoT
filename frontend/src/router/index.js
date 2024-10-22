// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/Authentication/LoginComponent.vue';
import RegisterComponent from '@/components/Authentication/RegisterComponent.vue';
import MainLayout from '@/components/MainLayout/MainLayout.vue';
import DashboardComponent from '@/components/MainLayout/MainContent/DashboardComponent.vue';
import GoogleMap from '@/components/MainLayout/MainContent/GoogleMap.vue';
import UserComponent from '@/components/MainLayout/MainContent/UserComponent.vue';
import UserProfileComponent from '@/components/MainLayout/MainContent/UserProfile.vue';
import HistoryComponent from '@/components/MainLayout/MainContent/HistoryComponent.vue';
import SettingComponent from '@/components/MainLayout/MainContent/SettingComponent.vue';

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
    path: '/user',
    component: MainLayout,
    children: [
      {
        path: '',
        component: UserComponent,
      },
    ],
  },
  {
    path: '/history',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HistoryComponent,
      },
    ],
  },
  {
    path: '/user-profile',
    component: MainLayout,
    children: [
      {
        path: '',
        component: UserProfileComponent,
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
  {
    path: '/setting',
    component: MainLayout,
    children: [
      {
        path: '',
        component: SettingComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
