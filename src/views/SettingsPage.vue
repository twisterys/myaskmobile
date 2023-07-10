<script setup >
import {IonPage,IonContent} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomButton from "@/components/CustomButton.vue";
</script>

<template>
<ion-page>
  <ion-content :fullscreen="true">
    <main>
      <page-header text="Settings"/>
      <page-divider text="Mes informations"/>
      <div class="info">
        <span>Nom : </span>
        <span>{{null}}</span>
      </div>
      <div class="info">
        <span>Numéro CIN : </span>
        <span>{{null}}</span>
      </div>
      <div class="info">
        <span>Email :</span>
        <span>{{null}}</span>
      </div>
      <div class="info">
        <span>Date de Naissance :</span>
        <span>{{null}}</span>
      </div>
      <div class="info">
        <span>Adresse :</span>
        <span>{{null}}</span>
      </div>
      <div class="info">
        <span>Date de création du compte :</span>
        <span>{{null}}</span>
      </div>
      <CustomButton>Supprimer mon compte</CustomButton>
    </main>
  </ion-content>
</ion-page>
</template>

<style scoped>
.info {
  margin-top: 1rem;
}
button{
  margin-top: 2rem;
}
</style>