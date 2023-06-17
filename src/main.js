import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';

import { IonicVue } from '@ionic/vue';

/* Fontawesome */
import store from './store/index'
import './assets/main.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';


axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);


const app = createApp(App)
  .use(IonicVue)
  .use(store)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});