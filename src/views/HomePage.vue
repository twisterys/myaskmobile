<script setup>
import PageHeader from "@/components/PageHeader.vue";
import IconNotification from "@/components/icons/IconNotification.vue";
import PageDivider from "@/components/PageDivider.vue";
import InsuranceCard from "@/components/InsuranceCard.vue";
import SinistreCard from "@/components/SinistreCard.vue";
import {IonPage,IonContent,IonHeader,IonFooter} from "@ionic/vue";

const insurances = [{
  id: "AK2023R00019",
  couvertures: ["RC", "Tierce"],
  date: "2024-03-12",
  status: "Valide"
}]
const sinistres = [{id: "S20230447", car: "Dacia", date: "2023-01-02", status: "En cours"}, {
  id: "S20230498",
  car: "Dacia",
  date: "2023-06-12",
  status: "Traité"
}]
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" >
    <main>
    <PageHeader text="Accueil" :icon="true">
          <IconNotification style="width: 40px"/>
        </PageHeader>
        <PageDivider text="Contrat d’assurance"/>
        <InsuranceCard v-for="insurance in insurances" :key="insurance.id" :insurance="insurance"/>
        <PageDivider text="Mes derniers sinistres"/>
        <SinistreCard v-for="sinistre in sinistres" :key="sinistre.id" :sinistre="sinistre"/>
    </main>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>