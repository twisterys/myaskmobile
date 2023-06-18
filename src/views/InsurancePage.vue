<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CarCard from "@/components/CarCard.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";
import {IonContent, IonPage} from "@ionic/vue";


const insurance = {
  id: "AK2023R00019",
  couvertures: ["Responsabilité civile", "RC", "Tierce"],
  date: "2024-03-12",
  renewDate: "2023-03-12",
  status: "Valide",
  cars: [
    {
      id:"1",
      marque:"Renault",
      modele:"Kango",
      horsePower:"59",
      circulation_date:"02/03/2010",
      matricule:{
        number:"198732",
        alphabet:"د",
        city:"06"
      }
    }
  ]
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" >
      <main>
        <ToBackPageHeader :text="insurance.id"/>
        <PageDivider text="Informations des véhicules"/>
        <CarCard v-for="car in insurance.cars" :key="car.id" :car="car"/>
        <PageDivider text="Information d’assurance"/>
        <div class="info">
          <span>Numéro de police :</span>
          <span></span>
        </div>
        <div class="info">
          <span>Date d'effet : </span>
          <span>{{insurance.date}}</span>
        </div>
        <div v-if="insurance.status.trim().toLowerCase()!=='en cours'" class="info">
          <span>Date de renouvellement : </span>
          <span>{{ insurance.date }}</span>
        </div>
        <div class="couverture">
          <span>Type de couverture : </span>
          <div class="types">
            <CustomCheckBox v-for="(couverture,i) in insurance.couvertures" :key="couverture + i" :label="couverture"
                            :model-value="couverture.trim().toLowerCase()" name="couverture" :disable="true"
                            :checked="true"/>
          </div>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.info , .couverture {
  margin-top: 1rem;
}
.couverture .types {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
</style>