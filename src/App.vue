<template>
  <ion-app>
    <AskNavbar v-if="$route.path!=='/login'" />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AskNavbar from "@/components/AskNavbar.vue";
</script>
