<script setup >
import {IonPage,IonContent} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
<ion-page>
  <ion-content :fullscreen="true">
    <main>
      <page-header text="Settings" />
    </main>
  </ion-content>
</ion-page>
</template>

<style scoped>

</style>