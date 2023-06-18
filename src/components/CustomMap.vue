<script setup>
defineProps({
  latitude: String,
  longitude: String
})
</script>

<template>
  <div style="width: 100%">
    <iframe width="100%" height="250vw"
            :src="`https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${latitude},${longitude}+&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`">
    </iframe>
  </div>
</template>

<style lang="scss" scoped>
div {
  border-radius: var(--global-border-radius);
  border: none;
  overflow: hidden;
  iframe {
    border: none;
  }
}
</style>