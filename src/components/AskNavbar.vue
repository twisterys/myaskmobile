<script setup>
import IconHome from "@/components/icons/IconHome.vue";
import IconInsurance from "@/components/icons/IconInsurance.vue";
import IconWarning from "@/components/icons/IconWarning.vue";
import IconCar from "@/components/icons/IconCar.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
</script>

<template>
  <nav>
    <RouterLink class="nav-link" to="/home">
      <IconHome/>
    </RouterLink>
    <RouterLink class="nav-link" to="/insurances">
      <IconInsurance/>
    </RouterLink>
    <RouterLink class="nav-link" to="/sinisres">
      <IconWarning/>
    </RouterLink>
    <RouterLink class="nav-link" to="/assistance">
      <IconCar/>
    </RouterLink>
    <RouterLink class="nav-link" to="/settings">
      <icon-settings/>
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: var(--full-border-radius);
  width: 90%;
  background-color: var(--blue-color-400);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 1rem;
  z-index: 99;
}

.nav-link {
  width: 2.7rem;
  height: 2.7rem;
  color: var(--white-color);
  padding: .6rem;
  border-radius: 50%;
  &:active , &:focus , &:hover ,&:focus-visible {
    color: var(--white-color);
  }
}
.router-link-active {
  background-color: rgba(#fff, 0.2);
}
</style>