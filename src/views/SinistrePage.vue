<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomMap from "@/components/CustomMap.vue";
import CarCard from "@/components/CarCard.vue";
import {IonContent, IonPage} from "@ionic/vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";
import {onBeforeMount, onMounted, ref} from "vue";
import axios from "axios";
import ReportCard from "@/components/ReportCard.vue";
const props = defineProps({
  id:String
})
const justifications = ref([])
const  sinistre = ref("");

onMounted(() => {
      axios.get(`sinistre_show/${props.id}`).then(response=> {
        if (response.data.sinistre){
          sinistre.value = response.data.sinistre
          return response.data.sinistre;
        }
      }).then(response =>{
        axios.get(`justification/${response.justif1}`).then(picture=> {
          justifications.value.push(picture.data)
        })
        axios.get(`justification/${response.justif2}`).then(picture=> {
          justifications.value.push(picture.data)
        })
        axios.get(`justification/${response.justif3}`).then(picture=> {
          justifications.value.push(picture.data)
        })
        axios.get(`justification/${response.justif4}`).then(picture=> {
          justifications.value.push(picture.data)
        })
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
         <div class="photos-container">
           <div class="img" v-for="(justif,i) in justifications" :key="i+'piicture'">
             <img :src="justif" alt="">
           </div>
         </div>
        </div>
        <div class="map">
          <p>Localisation :</p>
        </div>
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
        <PageDivider text="Rapport d'expertise" />
        <ReportCard v-for="(report,i) in sinistre.reports" :key="report.id" :number="i" :report="report"></ReportCard>
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
  gap: 1rem;
  .img{
    border-radius: var(--global-border-radius);
    box-shadow: var(--global-shadow);
    overflow: clip;
    img{
      min-width: 100%;
      min-height: 100%;
    }
  }
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
.map {
  *{
    margin: .5rem 0;
  }
}
</style>