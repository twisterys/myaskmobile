<script setup>
defineProps({
  inputId: String,
  label: String,
  name:String,
  placeholder:String,
  modelValue: {
    type: String,
  },
})
defineEmits(['update:modelValue']);
</script>
<template>
  <div class="input">
    <label :for="'#'+inputId" class="input-label">{{ label }}</label>
    <input :id="inputId" class="input-text"  :name="name"  :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" v-bind="$attrs" >
    <div class="input-icon">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: .3rem;
  width: fit-content;
  position: relative;
  &[w-full]  {
      width: 100%;
  }
  &[rounded] input {
    border-radius: var(--full-border-radius);
  }
  input {
    padding: var(--input-padding);
    border: var(--border-size) var(--border-type) var(--border-color) ;
    border-radius: var(--global-border-radius);
    width: 100%;
    &::placeholder{
      color: var(--border-color);
    }
  }
  .input-icon {
    position: absolute;
    width: 1.8rem;
    color: var(--border-color);
    top: calc(50% - .2rem);
    right: .5rem;
  }
  &[left]{
    .input-icon {
      left: .5rem;
    }
    input {
      padding-left: 3rem;
    }
  }
}
</style>