<script setup>
import IconBack from "@/components/icons/IconBack.vue";
defineProps({
  text:String
})
</script>

<template>
  <div>
    <IconBack class="back-icon"  @click="$router.go(-1)" />
    <h1>{{text}}</h1>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: .5rem;
  width: 100%;
  color: var(--black-color);
  margin-bottom: 1rem;
}
.back-icon {
  width: 2rem;
}

h1 {
  font-size: 1.7rem;
  font-weight: 600;
}
</style>