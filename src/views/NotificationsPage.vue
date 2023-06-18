<script setup >
import {IonPage,IonContent} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
<ion-page>
  <ion-content :fullscreen="true">
    <main>
      <page-header text="Notifications" />
      <div class="not">
        Vous n'avez aucune notification pour le moment
      </div>
    </main>
  </ion-content>
</ion-page>
</template>

<style scoped>
.not{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: var(--gray-color-300);
  font-size: 1.2rem;
  margin-top: 1.5rem;
}
</style>