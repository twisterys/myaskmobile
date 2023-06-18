<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomMap from "@/components/CustomMap.vue";
import CarCard from "@/components/CarCard.vue";

const sinistre = {
  id: "S20230498",
  cars:[
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
  ],
  date: "2023-06-12",
  status: "Traité",
  photos: [{},{},{},{}],
  position:{
    latitude:"33.5514544",
    longitude:"-7.5879902"
  },
}
</script>

<template>
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
      <CustomMap :latitude="sinistre.position.latitude" :longitude="sinistre.position.longitude" />
      <PageDivider text="Informations du véhicule" />
      <CarCard v-for="car in sinistre.cars" :car="car" :key="car.id" />
    </main>
</template>

<style scoped>
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
</style>