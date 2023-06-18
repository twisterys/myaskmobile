<script setup>

defineProps({
  inputId: String,
  label: String,
  modelValue: String,
  placeholder:String
})
defineEmits(['update:modelValue'])

</script>

<template>
  <div class="text-field">
    <label class="label-area" :for="'#'+inputId">{{ label }}</label>
    <textarea rows="8" class="text-area" :id="inputId" :value="modelValue"
              @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.text-field {
  display: flex;
  flex-direction: column;
  gap: .3rem;
  width: fit-content;
  position: relative;

  &[w-full] {
    width: 100%;
  }

  &[rounded] textarea {
    border-radius: var(--full-border-radius);
  }

  textarea {
    padding: var(--input-padding);
    border: var(--border-size) var(--border-type) var(--border-color);
    border-radius: var(--global-border-radius);
    width: 100%;
    resize: vertical;

    &::placeholder {
      color: var(--border-color);
    }
  }
}
</style>