<script setup>
const props = defineProps({
  insurance: Object
})
let color, background;
if (props.insurance.status.toLowerCase() === "validated") {
  color = '#139A5F';
  background = '#A1D7BF';
} else if (props.insurance.status.toLowerCase() === "inreview") {
  color = '#ECC94B';
  background = '#F6E4A58C';
} else {
  color = '#EB5757';
  background = '#EB575733';
}
const link = '/insurance/'+props.insurance.id
</script>

<template>
  <RouterLink :to="link">
    <div class="ask-card">
      <div class="header">
        <h3 class="title">{{ insurance.police }}</h3>
        <div class="status">
          <span></span>
          <span v-if="insurance.status === 'validated' " >Valide</span>
          <span v-if="insurance.status === 'inreview' ">En cours</span>
          <span v-if="insurance.status==='expired'">expire</span>
        </div>
      </div>
      <div class="body">
        <div class="info">
          <span>Type de couverture : </span>
          <span v-for="(couverture,i) in insurance.couvertures" :key="'couverture'+i">{{ couverture }},</span>
        </div>
        <div class="info">
          <span v-if="insurance.status === 'validated' " >Date de renouvellement : </span>
          <span v-if="insurance.status === 'inreview' ">Date de demande : </span>
          <span v-if="insurance.status==='expired'">Date d'expiration : </span>
          <span v-if="insurance.start_from" >{{
            insurance.status !== 'expired'?
              new Intl.DateTimeFormat('fr-CA', {
                "year": "numeric",
                month: "2-digit",
                day: "2-digit"
              }).format(new Date(insurance.start_from).setMonth(new Date(insurance.start_from).getMonth()+insurance.duration)):new Intl.DateTimeFormat('fr-CA', {
                  "year": "numeric",
                  month: "2-digit",
                  day: "2-digit"
                }).format(new Date(insurance.start_from))
            }}</span>
        </div>
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

    span:first-child {
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