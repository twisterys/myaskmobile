<script setup>
defineProps({
  text: String
})
</script>

<template>
  <div>
    <h2>{{ text }}</h2>
  </div>
</template>

<style lang="scss" scoped>
div {
  position: relative;
  width: 100%;
  margin: 1.5rem 0;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: var(--blue-color-400);
    left: 0;
  }
}

h2 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 1.5rem;
  position: relative;
  color: var(--blue-color-400);
  width: fit-content;

  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -.1rem;
    transform: translateY(-50%) translateX(-100%);
    width: 1.3rem;
    height: 2px;
    border-radius: 99px;
    background-color: var(--blue-color-400);
  }

  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    right: -.3rem;
    transform: translateY(-50%) translateX(100%);
    width: calc(100vw - 4rem - 100%);
    height: 2px;
    border-radius: 99px;
    background-color: var(--blue-color-400);
  }
}
</style>