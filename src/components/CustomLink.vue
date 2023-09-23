<script setup>

</script>

<template>
<a v-bind="$attrs" >
  <slot></slot>
</a>
</template>

<style scoped>
a {
  padding: var(--button-padding);
  border-radius: var(--global-border-radius);
  border: none;
  display: block;
  background-color: var(--blue-color-400);
  color: var(--white-color);
  text-transform: capitalize;
}
a:active{
  background-color: var(--blue-color-300);
}
a[w-full]{
  width: 100%;
}
a[rounded]{
  border-radius: var(--full-border-radius);
}
</style>