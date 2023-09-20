<script setup>
import {onBeforeMount, ref} from "vue";
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import CustomTextArea from "@/components/CustomTextArea.vue";
import ImageInput from "@/components/ImageInput.vue";
import {alertController, IonPage} from "@ionic/vue";
import router from "@/router";
import CustomButton from "@/components/CustomButton"
import axios from "axios";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";



const cars = ref([]);
const car = ref();
const tiers = ref('');
const description = ref('');

function sendSinitre(){

  axios.post('sinistre_add', {
    car_id : car.value,
    tiers : tiers.value,
    description : description.value
  })
      .then(response=>{
        presentAlert("Votre déclaration est envoyé","Réussie!");
      }).then(router.back)
      .catch(err=>{
        const errors = err.response.data.errors
        const header ="Attention!";
        const msg ='Merci de vérifier les informations saisies';
        // for (const error in errors) {
        //   msg = errors[error][0]
        // }
        presentAlert(msg,header);
      })

}
async function presentAlert(msg) {
  const alert = await alertController.create({
    header: "Réussie",
    message: msg,
    buttons: ["OK"],
  });
  await alert.present().then(router.back);
}
onBeforeMount(()=>{
  axios.get('cars_show').then(response=>{
   cars.value = response.data.cars;
   car.value = response.data.cars[0].id;
  })
})

const photos = ref([]);
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <ToBackPageHeader text="Nouveau sinistre"/>
        <p class="phrase">Remplissez vos informations dans les champs suivant</p>
        <div class="car">
          <p>Véhicule :</p>
          <select :value="car" class="aks-select" @change="$event=> car = $event.target.value ">
            <option  v-for="car in cars" :key="car.id" :value="car.id"> {{ car.mat3 }} {{
                car.mat2
              }}
              {{ car.mat1 }}
            </option>
          </select>
        </div>
        <CustomTextArea label="Information Tiers :" v-model="tiers" placeholder="Information tiers..." w-full/>
        <CustomTextArea label="Description :" v-model="description" placeholder="Votre description..." w-full/>
        <div class="photos">
          <p>Photos d’accident:</p>
          <image-input :photos="photos" name="Justif 1" input-id="image1"/>
          <image-input :photos="photos" name="Justif 2" input-id="image3"/>
          <image-input :photos="photos" name="Justif 3" input-id="image3"/>
          <image-input :photos="photos" name="Justif 4" input-id="image3"/>
        </div>
        <div class="center">
          <CustomButton @click="sendSinitre" rounded >
            Envoyer la déclaration
          </CustomButton>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
main>*+* {
  margin: 1rem 0;
}
.phrase {
  color: var(--gray-color-300);
}
.center {
  width: 100%;
  text-align: center;
}

.aks-select {
  margin-top: .5rem;
  border-radius: var(--global-border-radius);
  direction: rtl;
  text-align: end;
}

option {
  display: flex;
  flex-direction: row;
  justify-content: start;
  direction: rtl;
  text-align: end;
}

.car {
}
.photos {
  >*+*{
    margin-top: .7rem;
  }
}
</style>