<script setup>
import {link} from "ionicons/icons";

const props = defineProps({
  sinistre: Object
})
let color, background;
if (props.sinistre.status.toLowerCase() === "reviewed") {
  color = '#139A5F';
  background = '#A1D7BF';
} else if (props.sinistre.status.toLowerCase() === "inreview") {
  color = '#ECC94B';
  background = '#F6E4A58C';
}
</script>

<template>
  <RouterLink :to="'/sinistre/'+sinistre.id">
    <div class="ask-card">
      <div class="header">
        <h3 class="title">{{ sinistre.id_number }}</h3>
        <div class="status">
          <span></span>
          <span v-if="sinistre.status==='reviewed'" >Traité</span>
          <span v-if="sinistre.status==='inreview'" >En cours</span>
        </div>
      </div>
      <div class="body">
        <div class="info">
          <span>Véhicule : </span>
          <span>{{ sinistre.car.mark }}</span>
        </div>
        <div class="info">
          {{
            new Intl.DateTimeFormat('fr-CA', {
              "year": "numeric",
              month: "2-digit",
              day: "2-digit"
            }).format(new Date(sinistre.created_at))
          }}
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

  .status{
    border-radius: var(--full-border-radius);
    color: v-bind(color);
    background-color: v-bind(background);
    padding: .3rem .5rem;
    font-size: .8rem;

    span:first-child  {
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