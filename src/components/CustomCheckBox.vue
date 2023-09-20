<script setup>
import {onMounted, ref, watch} from "vue";

const props =defineProps({
  label: String,
  modelValue:Object,
  name:String,
  disable:Boolean,
  checked:Boolean,
  model:String
})
defineEmits(['update:modelValue'])
const spanChecked= ref(props.checked);
const clickHandler = e => {
  if (!props.disable){
    e.target.firstChild.checked = !e.target.firstChild.checked;
    spanChecked.value = e.target.firstChild.checked;
    if (!spanChecked.value){
      // eslint-disable-next-line vue/no-mutating-props
     props.modelValue.splice(props.modelValue.indexOf(e.target.firstChild.value),1);
    }else {
      // eslint-disable-next-line vue/no-mutating-props
      props.modelValue.push(e.target.firstChild.value)
    }
  }
}
</script>

<template>
  <div @click="clickHandler" class="ask-checkbox">
    <input  @change=" !disable ? $emit('input', $event.target.checked ) :''"  :value="model"   :checked="checked"  type="checkbox"   :name="name"  >
    <span :class="spanChecked? 'active':null" ></span>
    <p>{{ label }}</p>
  </div>
</template>

<style lang="scss" scoped>
.ask-checkbox {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .3rem 1rem;
  box-shadow:var(--global-shadow) ;
  width: fit-content;
  border-radius: var(--full-border-radius);
  *{
    pointer-events: none;
  }
  span {
    background-color: var(--gray-color-200);
    border-radius: var(--full-border-radius);
    width: 14px;
    height: 14px;
    position: relative;
    &.active {
      background-color: var(--blue-color-400);
      &::after {
        content: "";
        position: absolute;
        top:calc(50% - 2px);
        left: calc(50% - 2px);
        border: 2px solid white ;
        border-radius: var(--full-border-radius);
      }
    }
  }
}

input {
  display: none;
}
</style>