<script setup>
const props = defineProps({
  insurance: Object
})
let color, background;
if (props.insurance.status.toLowerCase() === "valide") {
  color = '#139A5F';
  background = '#A1D7BF';
} else if (props.insurance.status.toLowerCase() === "en cours") {
  color = '#ECC94B';
  background = '#F6E4A58C';
} else {
  color = '#EB5757';
  background = '#EB575733';
}
const link = '/insurances/'+props.insurance.id
</script>

<template>
  <RouterLink :to="link">
    <div class="card">
      <div class="header">
        <h3 class="title">{{ insurance.id }}</h3>
        <div class="status">
          <span></span> {{ insurance.status }}
        </div>
      </div>
      <div class="body">
        <div class="info">
          <span>Type de couverture : </span>
          <span v-for="(couverture,i) in insurance.couvertures" :key="'couverture'+i">{{ couverture }},</span>
        </div>
        <div class="info">
          <span v-if="insurance.status !== 'en cours' " >Date de renouvellement : </span>
          <span v-else>Date de demande : </span>
          <span>{{
              new Intl.DateTimeFormat('fr-CA', {
                "year": "numeric",
                month: "2-digit",
                day: "2-digit"
              }).format(new Date(insurance.date))
            }}</span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  padding: .8rem;
  box-shadow: var(--global-shadow);
  border-radius: var(--global-border-radius);
  margin-top: 1rem;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h3 {
    color: var(--blue-color-400);
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .status {
    border-radius: var(--full-border-radius);
    color: v-bind(color);
    background-color: v-bind(background);
    padding: .3rem .5rem;
    font-size: .8rem;

    span {
      display: inline-block;
      width: 9px;
      height: 9px;
      border-radius: var(--full-border-radius);
      background-color: v-bind(color);
      margin-right: .2rem;
    }
  }
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
</style>