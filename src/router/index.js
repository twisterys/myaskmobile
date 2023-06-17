import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue';
import Login from "../views/Login";
import store from "@/store";
import InsurancesPage from "@/views/InsurancesPage.vue";
import InsurancePage from "@/views/InsurancePage.vue";
import AddInsurancePage from "@/views/AddInsurancePage.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
    beforeEnter: (to, from, next) => {
      // if (!store.getters["auth/authenticated"]) {
      //   return next({ name: "Login" });
      // }
      next();
    },
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
    beforeEnter: (to, from, next) => {
      // if (!store.getters["auth/authenticated"]) {
      //   return next({ name: "Login" });
      // }
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
  },
  {
    path: "/insurances",
    name:  "Insurances",
    component: InsurancesPage,
    beforeEnter: (to, from, next) => {
      // if (!store.getters["auth/authenticated"]) {
      //   return next({ name: "Login" });
      // }
      next();
    },
  },
  {
    path: "/insurances/:id",
    name:  "Insurance",
    component: InsurancePage,
    beforeEnter: (to, from, next) => {
      // if (!store.getters["auth/authenticated"]) {
      //   return next({ name: "Login" });
      // }
      next();
    },
  },
  {
    path: "/addinsurance",
    name:'Nouveau assurance',
    component: AddInsurancePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router