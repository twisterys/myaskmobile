<script setup>
import PageHeader from "@/components/PageHeader.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import router from "@/router";
import InsuranceCard from "@/components/InsuranceCard.vue";
import {computed, onBeforeMount, ref} from "vue";
import {IonPage,IonContent} from "@ionic/vue";
import axios from "axios";


const insurances = ref([]);
const filterBy = ref('all')
function  filter(e) {
  document.querySelectorAll('.filter').forEach(o=>o.classList.remove('active'))
  e.target.classList.add('active');
  filterBy.value = e.target.dataset.filter.trim();

}
const filteredData = computed(
    ()=>{
      if (filterBy.value.toLowerCase()==='all'){
        return insurances.value;
      }else {
        return insurances.value.filter(a=>a.status.trim().toLowerCase() === filterBy.value.toLowerCase())
      }
    }
)
onBeforeMount(() => {
      axios.get('insurances').then(response=> {
        if (response.data.insurances.length>0){
          insurances.value=response.data.insurances;
        }
      })
    }
)
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
    <PageHeader text="Mes assurances" :icon="true">
          <icon-add class="icon" @click="router.push('/addinsurance')"/>
        </PageHeader>
        <div class="filter-bar">
          <div @click="filter" data-filter="all" class="filter active">
            Tous
          </div>
          <div @click="filter" data-filter="validated" class="filter">
            Valide
          </div>
          <div @click="filter" data-filter="expired" class="filter">
            Expiré
          </div>
          <div @click="filter" data-filter="inreview" class="filter">
            En cours
          </div>
        </div>
        <InsuranceCard v-for="(insurance) in filteredData" :key="insurance.id" :insurance="insurance"/>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.icon {
  width: 33px;
  height: 33px;
  color: var(--blue-color-400);
  background-color: rgba(#99B2CBFF,0.3);
  padding: .2rem;
  border-radius: var(--full-border-radius);
  cursor: pointer;
}
.filter-bar{
  display: flex;
  gap: 1rem;
  padding: 1rem .5rem ;
  overflow-x: scroll ;
  &::-webkit-scrollbar {
    display: none;
  }
  .filter{
    padding: .3rem 1rem;
    box-shadow: var(--global-shadow);
    border-radius: var(--full-border-radius);
    transition: all ease-in-out 300ms;
    text-wrap: avoid;
    white-space: nowrap;
    &.active {
      background-color: var(--blue-color-400);
      color: var(--white-color);
    }
  }
}
</style>