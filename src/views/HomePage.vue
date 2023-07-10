<script setup>
import PageHeader from "@/components/PageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import InsuranceCard from "@/components/InsuranceCard.vue";
import SinistreCard from "@/components/SinistreCard.vue";
import {IonContent, IonPage} from "@ionic/vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import IconLogout from "@/components/icons/IconLogout.vue";
import {useRouter} from "vue-router";
import IconNotification from "@/components/icons/IconNotification.vue";

const router = useRouter();
const insurances = ref([]);
const sinistres = ref([]);
onBeforeMount(() => {
      axios.get('insurances').then(response => {
        if (response.data.insurances.length > 0) {
          insurances.value.push(response.data.insurances.filter(o => o.status == 'validated')[0])
        }
      });
      axios.get('sinistres').then(response => {
        console.log(response.data.sinistres)
        if (response.data.sinitres.length > 0) {
          sinistres.value = (response.data.sinitres)
        }
      })
    }
)
const logout = () => {
  localStorage.clear();
  router.go();
}
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true" >
    <main>
    <PageHeader text="Accueil" :icon="true">
      <router-link to="/notifications"><icon-notification style="width: 35px;color:#222222"/></router-link>
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