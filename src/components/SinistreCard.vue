<script setup>
const props = defineProps({
  sinistre: Object
})
let color, background;
if (props.sinistre.status.toLowerCase() === "traité") {
  color = '#139A5F';
  background = '#A1D7BF';
} else if (props.sinistre.status.toLowerCase() === "en cours") {
  color = '#ECC94B';
  background = '#F6E4A58C';
}
</script>

<template>
  <div class="card">
    <div class="header">
      <h3 class="title">{{ sinistre.id }}</h3>
      <div class="status">
        <span></span> {{ sinistre.status }}
      </div>
    </div>
    <div class="body">
      <div class="info">
        <span>Véhicule : </span>
        <span>{{ sinistre.car }}</span>
      </div>
      <div class="info">
        {{
          new Intl.DateTimeFormat('fr-CA', {
            "year": "numeric",
            month: "2-digit",
            day: "2-digit"
          }).format(new Date(sinistre.date))
        }}
      </div>
    </div>
  </div>
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