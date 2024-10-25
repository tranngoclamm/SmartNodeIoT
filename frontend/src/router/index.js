// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '@/components/Authentication/LoginComponent.vue';
import RegisterComponent from '@/components/Authentication/RegisterComponent.vue';
import MainLayout from '@/components/MainLayout/MainLayout.vue';
import DashboardComponent from '@/components/MainLayout/MainContent/DashboardComponent.vue';
import GoogleMap from '@/components/MainLayout/MainContent/GoogleMap.vue';
import UserComponent from '@/components/MainLayout/MainContent/UserComponent.vue';
import DeveloperComponent from '@/components/MainLayout/MainContent/DeveloperComponent.vue';
import DeveloperHomeComponent from '@/components/MainLayout/MainContent/DeveloperContent/HomeContent.vue';
import DeveloperDatastreamComponent from '@/components/MainLayout/MainContent/DeveloperContent/DatastreamContent.vue';
import DeveloperNotificationComponent from '@/components/MainLayout/MainContent/DeveloperContent/NotificationContent.vue';
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
    path: '/developer/home',
    component: MainLayout,
    children: [
      {
        path: '',
        component: DeveloperComponent,
        children: [
          {
            path: '',
            component: DeveloperHomeComponent,
          }
        ]
      },
    ],
  },
  {
    path: '/developer/datastreams',
    component: MainLayout,
    children: [
      {
        path: '',
        component: DeveloperComponent,
        children: [
          {
            path: '',
            component: DeveloperDatastreamComponent,
          }
        ]
      },
    ],
  },
  {
    path: '/developer/notifications',
    component: MainLayout,
    children: [
      {
        path: '',
        component: DeveloperComponent,
        children: [
          {
            path: '',
            component: DeveloperNotificationComponent,
          }
        ]
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
