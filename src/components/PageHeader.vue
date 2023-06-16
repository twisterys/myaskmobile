<script setup>
defineProps({
  text:String,
  icon:Boolean
})
</script>

<template>
<div>
  <h1>{{text}}</h1>
  <slot v-if="icon"></slot>
</div>
</template>

<style scoped>
div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--black-color);
  margin-bottom: 1rem ;
}
h1 {
  font-size: 1.7rem;
  font-weight: 600;
}
</style>