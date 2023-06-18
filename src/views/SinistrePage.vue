<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomMap from "@/components/CustomMap.vue";
import CarCard from "@/components/CarCard.vue";
import {IonContent, IonPage} from "@ionic/vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";


const sinistre = {
  id: "S20230498",
  cars: [
    {
      id: "1",
      marque: "Renault",
      modele: "Kango",
      horsePower: "59",
      circulation_date:"02/03/2010",
      matricule:{
        number:"198732",
        alphabet:"د",
        city:"06"
      }
    }
  ],
  date: "2023-06-12",
  status: "Traité",
  photos: [{},{},{},{}],
  position:{
    latitude:"33.5514544",
    longitude:"-7.5879902"
  },
  insurance:{
    id: "AK2023R00019",
    couvertures: ["Def et Recrs","Tierce","Responsabilité civile"]
  },
  rapports: [
    {
      id:"1",
      date:"2023-05-21"
    },
    {
      id:"2",
      date:"2023-05-21"
    }
  ]
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <ToBackPageHeader :text="sinistre.id"/>
        <PageDivider text="Décision"/>
        <p v-if="sinistre.status.trim().toLowerCase()==='traité'">En cours de traitement</p>
        <p v-else>vous pouvez trouver la décision d'assurance dans votre mail</p>
        <PageDivider text="Informations de sinistre"/>
        <div class="photos">
          <p>Photos d’accident :</p>
          <div class="photos-container">
            <div v-for="(photo,i) in sinistre.photos" :key="i+ Math.random()*1000">
              <img src="../assets/CameraPlaceHolder.png" alt="">
            </div>
          </div>
        </div>
        <CustomMap :latitude="sinistre.position.latitude" :longitude="sinistre.position.longitude"/>
        <PageDivider text="Informations du véhicule"/>
        <CarCard v-for="car in sinistre.cars" :car="car" :key="car.id"/>
        <PageDivider text="Information d’assurance"/>
        <div class="info">
          <span>Numéro de police : </span>
          <span>{{sinistre.insurance.id}}</span>
        </div>
        <div class="info">
          <span>Type de couverture :</span>
          <div class="couvertures">
            <CustomCheckBox :checked="true" :disable="true" v-for="couverture in sinistre.insurance.couvertures" :key="couverture" :label="couverture"  />
          </div>
        </div>
        <PageDivider text="Rapport d'expertise" />

      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.photos {
 margin: 1rem 0;
}
.photos-container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: .5rem;
}
.info {
  margin-top: 1rem;
  color: var(--black-color);

  span:not(:first-child) {
    color: var(--gray-color-300);
  }
}
.couvertures {
  margin-top: .7rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: .5rem;
}
</style>