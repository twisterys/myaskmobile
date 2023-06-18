<template>
  <ion-app>
    <ion-router-outlet />
    <AskNavbar v-if="$route.path!=='/login' && $route.path!=='/addinsurance' && $route.path!=='/addsinistre' " />
  </ion-app>

</template>

<script setup >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AskNavbar from "@/components/AskNavbar.vue";
</script>
