<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CarCard from "@/components/CarCard.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";
import {IonContent, IonPage} from "@ionic/vue";
import axios from "axios";
import {computed, onActivated, onBeforeMount, onBeforeUpdate, onMounted, ref} from "vue";

const props = defineProps({
  id: Number
})

const insurance = ref([]);
const date = ref('');

onMounted(() => {
      axios.get(`insurance_show/${props.id}`).then(response => {
        insurance.value= response.data.insurance;
        date.value =new Intl.DateTimeFormat('fr-CA', {
          "year": "numeric",
          month: "2-digit",
          day: "2-digit"
        }).format(new Date(response.data.insurance.start_from).setMonth(new Date(response.data.insurance.start_from).getMonth()+response.data.insurance.duration))
      });

    }
)

onBeforeUpdate(() => {
  axios.get(`insurance_show/${props.id}`).then(response => {
    insurance.value= response.data.insurance;
    date.value =new Intl.DateTimeFormat('fr-CA', {
      "year": "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(response.data.insurance.start_from).setMonth(new Date(response.data.insurance.start_from).getMonth()+response.data.insurance.duration))
  });

}) ;

</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" >
      <main>
        <ToBackPageHeader :text="insurance.police"/>
        <PageDivider text="Informations des véhicules"/>
        <CarCard v-for="car in insurance.cars" :key="car.id" :car="car"/>
        <PageDivider text="Information d’assurance"/>
        <div class="info">
          <span>Numéro de police :</span>
          <span>{{insurance.police}}</span>
        </div>
        <div class="info">
          <span>Date d'effet : </span>
          <span>{{insurance.start_from}}</span>
        </div>
        <div v-if="insurance.status !=='validated'" class="info">
          <span>Date de renouvellement : </span>
          <span>{{date}}</span>
        </div>
        <div  class="couverture">
          <span>Type de couverture : </span>
          <div class="types">
            {{insurance.couverture}}
          </div>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
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
.info {
  color: var(--black-color);

  span:not(:first-child) {
    color: var(--gray-color-300);
  }
}
</style>