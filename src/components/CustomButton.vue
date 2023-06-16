<script setup>

</script>

<template>
<button v-bind="$attrs" >
  <slot></slot>
</button>
</template>

<style scoped>
button {
  padding: var(--button-padding);
  border-radius: var(--global-border-radius);
  border: none;
  background-color: var(--blue-color-400);
  color: var(--white-color);
  text-transform: capitalize;
}
button:active{
  background-color: var(--blue-color-300);
}
button[w-full]{
  width: 100%;
}
button[rounded]{
  border-radius: var(--full-border-radius);
}
</style>