<script setup>
import PageHeader from "@/components/PageHeader.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import router from "@/router";
import InsuranceCard from "@/components/InsuranceCard.vue";
import {computed, ref} from "vue";
const insurances =[
  {
    id: "AK2023R00019",
    couvertures: ["RC", "Tierce"],
    date: "2024-03-12",
    status: "Valide"
  },
  {
    id: "AK2033R00019",
    couvertures: ["Tous risques"],
    date: "2023-03-12",
    status: "Expiré"
  }
  ,
  {
    id: "D2023T004532",
    couvertures: ["Tous risques"],
    date: "2023-03-12",
    status: "En cours"
  }
];
const filterBy = ref('tous')
function  filter(e) {
  document.querySelectorAll('.filter').forEach(o=>o.classList.remove('active'))
  e.target.classList.add('active');
  filterBy.value = e.target.innerHTML.trim();

}
const filteredData = computed(
    ()=>{
      if (filterBy.value.toLowerCase()==='tous'){
        return insurances;
      }else {
        return insurances.filter(a=>a.status.trim().toLowerCase() === filterBy.value.toLowerCase())
      }
    }
)
</script>

<template>
  <main>
    <PageHeader text="Mes assurances" :icon="true">
      <icon-add class="icon" @click="router.push('/addinsurance')" />
    </PageHeader>
    <div class="filter-bar">
      <div @click="filter" class="filter active">
        Tous
      </div>
      <div @click="filter" class="filter">
        Valide
      </div>
      <div @click="filter" class="filter">
        Expiré
      </div>
      <div @click="filter" class="filter">
        En cours
      </div>
    </div>
    <InsuranceCard v-for="(insurance) in filteredData" :key="insurance.id" :insurance="insurance" />
  </main>
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