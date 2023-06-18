<script setup>
defineProps({
  car:Object
})
</script>

<template>
<RouterLink :to="'car/' + car.id">
  <div class="ask-card">
    <div class="header">
      <h3 class="title">{{car.mark}}</h3>
    </div>
    <div class="body">
      <div class="info">
        <span>Modele: </span>
        <span>{{car.model}}</span>
      </div>
      <div class="info">
        <span>Mise en circulation: </span>
        <span>{{new Intl.DateTimeFormat('fr-CA').format(new Date(car.circulation))}}</span>
      </div>
    </div>
    <div class="footer">
      <span>{{ car.mat1 }}</span>
      <span>{{ car.mat2 }}</span>
      <span>{{ car.mat3 }}</span>
    </div>
  </div>
</RouterLink>
</template>

<style lang="scss" scoped>
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