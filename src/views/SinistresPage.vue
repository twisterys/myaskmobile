<script setup>

import PageHeader from "@/components/PageHeader.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import router from "@/router";
import {computed, onBeforeMount, ref} from "vue";
import SinistreCard from "@/components/SinistreCard.vue";
import {IonPage,IonContent} from "@ionic/vue";
import axios from "axios";
const sinistres = ref([]);
const filterBy = ref('all')

function filter(e) {
  document.querySelectorAll('.filter').forEach(o => o.classList.remove('active'))
  e.target.classList.add('active');
  filterBy.value = e.target.dataset.filter.trim();
}

const filteredData = computed(
    () => {
      if (filterBy.value.toLowerCase() === 'all') {
        return sinistres.value;
      } else {
        return sinistres.value.filter(a => a.status.trim().toLowerCase() === filterBy.value.toLowerCase())
      }
    }
)
onBeforeMount(() => {
      axios.get('sinistres').then(response=> {
        console.log(response.data.sinistres)
        if (response.data.sinitres.length>0){
          sinistres.value = response.data.sinitres
        }
      })
    }
)
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
      <PageHeader text="Mes sinistres" :icon="true">
        <icon-add class="icon" @click="router.push('/addsinistre')"/>
      </PageHeader>
      <div class="filter-bar">
        <div @click="filter" data-filter="all" class="filter active">
          Tous
        </div>
        <div @click="filter" data-filter="reviewed" class="filter">
          Traité
        </div>
        <div @click="filter" data-filter="inreview" class="filter">
          En cours
        </div>
      </div>
      <SinistreCard v-for="sinistre in filteredData" :key="sinistre.id" :sinistre="sinistre"/>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.icon {
  width: 33px;
  height: 33px;
  color: var(--blue-color-400);
  background-color: rgba(#99B2CBFF, 0.3);
  padding: .2rem;
  border-radius: var(--full-border-radius);
  cursor: pointer;
}

.filter-bar {
  display: flex;
  gap: 1rem;
  padding: 1rem .5rem;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .filter {
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