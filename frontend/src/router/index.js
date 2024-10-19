// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/Authentication/LoginComponent.vue';
import RegisterComponent from '@/components/Authentication/RegisterComponent.vue';
import MainLayout from '@/components/MainLayout/MainLayout.vue';
import DashboardComponent from '@/components/MainLayout/MainContent/DashboardComponent.vue';
import GoogleMap from '@/components/MainLayout/MainContent/GoogleMap.vue';
import UserComponent from '@/components/MainLayout/MainContent/UserComponent.vue';
import UserProfileComponent from '@/components/MainLayout/MainContent/UserProfile.vue';
import TableList from '@/components/MainLayout/MainContent/TableList.vue';

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
    path: '/user-1',
    component: MainLayout,
    children: [
      {
        path: '',
        component: TableList,
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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
