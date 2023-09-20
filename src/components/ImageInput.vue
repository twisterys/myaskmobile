<script setup>
import {ref} from "vue";
import CustomButton from "@/components/CustomButton.vue";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

const props = defineProps({
  inputId: String,
  name:String,
  photos:Object
})

const clearImage = (e) => {
  mypicture.value = {};
  bloblink.value = {}
}

const bloblink = ref({});
const mypicture = ref({});
const blobToBase64 = async (blob)=> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const takePhoto = async (type) => {
  const photo = Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  })
  const response = await fetch(photo.webPath);
  const blob = await response.blob();
  const picture = await blobToBase64(blob);
  bloblink.value = { link: (await photo).webPath.toString(), type: type };
  mypicture.value = picture;
  const path = (await photo).webPath.toString();
  // eslint-disable-next-line vue/no-mutating-props
  props.photos.push( {photo,path,type})
}
</script>

<template>
  <div   class="input-card">
    <div class="preview">
      <figure @click="takePhoto(name)" >
        <img v-show="!bloblink.link" src="../assets/CameraPlaceHolder.png" alt="">
        <img v-show="bloblink.link" :src="bloblink.link" alt="">
      </figure>
    </div>
    <div class="footer">
      <p> {{name}}</p>
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
figure {
  width: 100%;
  min-height: 200px;
  overflow: clip;
  background-color: #ECECEC;
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