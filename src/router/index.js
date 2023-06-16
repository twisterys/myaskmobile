import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import Login from "../views/Login";
import store from "@/store";

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
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router