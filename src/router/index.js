import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import Login from "../views/Login";
import store from "@/store";
import InsurancesPage from "@/views/InsurancesPage.vue";
import InsurancePage from "@/views/InsurancePage.vue";
import AddInsurancePage from "@/views/AddInsurancePage.vue";
import SinistresPage from "@/views/SinistresPage.vue";
import SinistrePage from "@/views/SinistrePage.vue";
import AddSinistrePage from "@/views/AddSinistrePage.vue";
import AssistancePage from "@/views/AssistancePage.vue";
import NotificationsPage from "@/views/NotificationsPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import SettingsPage from "@/views/SettingsPage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/logout",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: '/',
    redirect: '/login',
    meta:{
      hideNavBar: true
    },
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({ name: "Home" });
      }
      next();
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      hideNavBar: true
    },
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({ name: "Home" });
      }
      next();
    },
  },
  {
    path: "/insurances",
    name:  "Insurances",
    component: InsurancesPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/insurance/:id",
    name:  "Insurance",
    component: InsurancePage,
    props:true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/addinsurance",
    name:'Nouveau assurance',
    component: AddInsurancePage,
    meta:{
      hideNavBar: true
    },
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/sinistres",
    name:'Sinistres',
    component: SinistresPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/sinistre/:id",
    name:'Sinistre',
    component: SinistrePage,
    props:true,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/addSinistre/",
    name:'Nouvelle sinistre',
    component: AddSinistrePage,
    meta:{
      hideNavBar: true
    },
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/assistance",
    name:'Assistance routier',
    component: AssistancePage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/notifications",
    name:'Notifications',
    component: NotificationsPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
  {
    path: "/register",
    name:'Registration',
    component: RegisterPage,
    meta:{
      hideNavBar: true
    },
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/authenticated"]) {
        return next({ name: "Home" });
      }
      next();
    },
  },
  {
    path: "/settings",
    name:'Settings',
    component: SettingsPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/authenticated"]) {
        return next({ name: "Login" });
      }
      next();
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router