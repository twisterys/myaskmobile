import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';

/* Fontawesome */
import '@fortawesome/fontawesome-free/css/all.css';
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