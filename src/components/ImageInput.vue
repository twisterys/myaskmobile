<script setup>
import {ref} from "vue";
import CustomButton from "@/components/CustomButton.vue";

defineProps({
  inputId: String
})
const filename = ref("Aucune image");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const changeHandler = (e) => {
  if (e.target.files[0] && e.target.files[0].type.startsWith('image/')) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      e.target.previousSibling.children[0].src = event.target.result;
    });
    reader.readAsDataURL(e.target.files[0]);
    filename.value = e.target.files[0].name;
  } else {
    e.target.previousSibling.children[0].src = new URL(`../assets/CameraPlaceHolder.png`, import.meta.url);
    filename.value = "Aucune image";
  }
}
const clearImage = (e) => {
  const img = e.target.parentElement.previousSibling.children[0].children[0].children[0];
  const input =e.target.parentElement.previousSibling.children[0].children[1]
  img.src = new URL(`../assets/CameraPlaceHolder.png`, import.meta.url);
  input.value = '';
  filename.value = "Aucune image";
}
</script>

<template>
  <div   class="input-card">
    <div class="preview">
      <label @click="$event.target.children[1].click()" :for="'#'+inputId">
        <figure>
          <img src="../assets/CameraPlaceHolder.png" alt="">
        </figure>
        <input :id="inputId"  @change="changeHandler($event)"  type="file" accept="image/" capture="user" hidden >
      </label>
    </div>
    <div class="footer">
      <p> {{ filename }}</p>
      <CustomButton @click="clearImage"
                    STYLE="background-color: white !important; color: var(--blue-color-400) !important">Supprimer
      </CustomButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-card {
  border-radius: var(--global-border-radius);
  overflow: clip;
  box-shadow: var(--global-shadow);
  margin: 1.5rem 0;

}

input {
  width: 100%;
  height: 300px;
  appearance: none;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
label figure {
  pointer-events: none;
  width: 100%;
  min-height: 200px;
  overflow: clip;

  img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
}
.footer {
  color: white;
  background-color: var(--blue-color-400);
  padding: .5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  flex-grow: 0;
  width: 100%;

  p {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>