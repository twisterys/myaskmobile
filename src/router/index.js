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

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
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
  },
  {
    path: "/insurance/:id",
    name:  "Insurance",
    component: InsurancePage,
  },
  {
    path: "/addinsurance",
    name:'Nouveau assurance',
    component: AddInsurancePage
  },
  {
    path: "/sinistres",
    name:'Sinistres',
    component: SinistresPage
  },
  {
    path: "/sinistre/:id",
    name:'Sinistre',
    component: SinistrePage
  },
  {
    path: "/addSinistre/",
    name:'Nouvelle sinistre',
    component: AddSinistrePage
  },
  {
    path: "/assistance",
    name:'Assistance routier',
    component: AssistancePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router