<script setup>
defineProps({
  car:Object
})
</script>

<template>
<RouterLink :to="'car/' + car.id">
  <div class="ask-card">
    <div class="header">
      <h3 class="title">{{car.marque}}</h3>
    </div>
    <div class="body">
      <div class="info">
        <span>Modele: </span>
        <span>{{car.modele}}</span>
      </div>
      <div class="info">
        <span>Mise en circulation: </span>
        <span>{{car.circulation_date}}</span>
      </div>
    </div>
    <div class="footer">
      <span>{{ car.matricule.number }}</span>
      <span>{{ car.matricule.alphabet }}</span>
      <span>{{ car.matricule.city }}</span>
    </div>
  </div>
</RouterLink>
</template>

<style scoped>
.ask-card {
  padding: .8rem;
  box-shadow: var(--global-shadow);
  border-radius: var(--global-border-radius);
  margin-top: 1rem;
}
h3 {
  color: var(--blue-color-400);
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;
}
.body {
  margin-top: .7rem;

  .info {
    color: var(--black-color);

    span:not(:first-child) {
      color: var(--gray-color-300);
    }
  }

  * + * {
    margin-top: .7rem;
  }
}
.footer {
  margin-top: .7rem;
  display: flex;
  gap: .5rem;
  color: var(--gray-color-300);
  width: 100%;
  justify-content: center;
}
</style>