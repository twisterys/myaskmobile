<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomMap from "@/components/CustomMap.vue";
import CarCard from "@/components/CarCard.vue";
import {IonContent, IonPage} from "@ionic/vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
const props = defineProps({
  id:String
})

const  sinistre = ref("");
onBeforeMount(() => {
      axios.get(`sinistre_show/${props.id}`).then(response=> {
        if (response.data.sinistre){
          sinistre.value = response.data.sinistre
        }
      })
    }
)
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <ToBackPageHeader :text="sinistre.id_number"/>
        <PageDivider text="Décision"/>
        <p v-if="sinistre.status ==='inreview'">En cours de traitement</p>
        <p v-else>vous pouvez trouver la décision d'assurance dans votre mail</p>
        <PageDivider text="Informations de sinistre"/>
        <div class="photos">
          <p>Photos d’accident :</p>
          <img  src="../assets/CameraPlaceHolder.png" alt="">
          <img  src="../assets/CameraPlaceHolder.png" alt="">
          <img  src="../assets/CameraPlaceHolder.png" alt="">
          <img  src="../assets/CameraPlaceHolder.png" alt="">
        </div>
        <CustomMap :latitude="sinistre.pos_x" :longitude="sinistre.pos_y"/>
        <PageDivider text="Informations du véhicule"/>
        <CarCard v-if="sinistre.car" :car="sinistre.car"/>
<!--        <PageDivider text="Information d’assurance"/>-->
<!--        <div class="info">-->
<!--          <span>Numéro de police : </span>-->
<!--          <span>{{sinistre.insurance.id_number}}</span>-->
<!--        </div>-->
<!--        <div class="info">-->
<!--          <span>Type de couverture :</span>-->
<!--          <div class="couvertures">-->
<!--            <CustomCheckBox :checked="true" :disable="true" v-for="couverture in sinistre.insurance.couvertures" :key="couverture" :label="couverture"  />-->
<!--          </div>-->
<!--        </div>-->
<!--        <PageDivider text="Rapport d'expertise" />-->

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