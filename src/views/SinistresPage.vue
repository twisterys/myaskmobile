<script setup>

import PageHeader from "@/components/PageHeader.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import router from "@/router";
import {computed, ref} from "vue";
import SinistreCard from "@/components/SinistreCard.vue";
import {IonPage,IonContent} from "@ionic/vue";
const sinistres = [{id: "S20230447", car: "Dacia", date: "2023-01-02", status: "En cours"}, {
  id: "S20230498",
  car: "Dacia",
  date: "2023-06-12",
  status: "Traité"
}];
const filterBy = ref('tous')

function filter(e) {
  document.querySelectorAll('.filter').forEach(o => o.classList.remove('active'))
  e.target.classList.add('active');
  filterBy.value = e.target.innerHTML.trim();
}

const filteredData = computed(
    () => {
      if (filterBy.value.toLowerCase() === 'tous') {
        return sinistres;
      } else {
        return sinistres.filter(a => a.status.trim().toLowerCase() === filterBy.value.toLowerCase())
      }
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
        <div @click="filter" class="filter active">
          Tous
        </div>
        <div @click="filter" class="filter">
          Traité
        </div>
        <div @click="filter" class="filter">
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