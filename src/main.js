import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import {IonicVue} from '@ionic/vue';
import {defineCustomElements} from '@ionic/pwa-elements/loader';

/* Fontawesome */
import store from './store/index'
import './assets/main.css';
import 'v-calendar/style.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';


// axios.defaults.baseURL = 'https://zaid.tarmiz.ma/api';
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
axios.interceptors.response.use(
    response=>{
        return  response;
    },
    error=>{
        if (error.response.status === 401) {
            localStorage.clear();
            router.push("/");
        }
        return Promise.reject(error);
    }
)


const app = createApp(App)
    .use(IonicVue)
    .use(store)
    .use(router);

router.isReady().then(() => {
    app.mount('#app');
    defineCustomElements(window);
});