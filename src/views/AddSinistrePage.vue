<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import CustomTextArea from "@/components/CustomTextArea.vue";
import ImageInput from "@/components/ImageInput.vue";
import {alertController, IonPage} from "@ionic/vue";
import CustomButton from "@/components/CustomButton"
import axios from "axios";
import PageDivider from "@/components/PageDivider.vue";
import CustomMap from "@/components/CustomMap.vue";



const cars = ref([]);
const car = ref();
const tiers = ref('');
const description = ref('');
const coordinates = ref('');
const photos = ref([]);

function sendSinitre(){
  if (car.value !=null && tiers.value !== '' && description.value !== '' && photos.value.length ===4 && coordinates.value !== '' ){
    axios.post('sinistre_add', {
      car_id : car.value,
      tiers : tiers.value,
      description : description.value,
      pictures:photos.value,
      pos_x:coordinates.value.lat,
      pos_y:coordinates.value.lng
    }).then(response=>{
      presentAlert("Votre déclaration est envoyé","Réussie!");
    })
    .then(router.back)
    .catch(err=>{
      const errors = err.response.data.errors
      const header ="Attention!";
      const msg ='Merci de vérifier les informations saisies';
      // for (const error in errors) {
      //   msg = errors[error][0]
      // }
      presentAlert(msg,header);
    })
  }else {
    presentAlert('Merci de vérifier les informations saisies !','Attention!');
  }
}

async function presentAlert(msg) {
  const alert = await alertController.create({
    header: "Réussie",
    message: msg,
    buttons: ["OK"],
  });
  await alert.present();
}
onBeforeMount(()=>{
  axios.get('cars_show').then(response=>{
   cars.value = response.data.cars;
   car.value = response.data.cars[0].id;
  })
})
</script>
<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <ToBackPageHeader text="Nouveau sinistre"/>
        <p class="phrase">Remplissez vos informations dans les champs suivant</p>
        <div class="car">
          <page-divider text="Véhicule" ></page-divider>
          <select :value="car" class="aks-select" @change="$event=> car = $event.target.value ">
            <option  v-for="car in cars" :key="car.id" :value="car.id"> {{ car.mat3 }} {{
                car.mat2
              }}
              {{ car.mat1 }}
            </option>
          </select>
        </div>
        <page-divider text="Informations" ></page-divider>
        <CustomTextArea label="Information Tiers :" v-model="tiers" placeholder="Information tiers..." w-full/>
        <CustomTextArea label="Description :" v-model="description" placeholder="Votre description..." w-full/>
        <div class="photos">
          <page-divider text="Photos d’accident" ></page-divider>
          <image-input v-for="i in 4" :key="i" :photos="photos" :name="'Justif '+(+i)" :input-id="'Justif'+(+i)"/>
        </div>
        <page-divider text="Localisation" ></page-divider>
        <custom-map v-model="coordinates" ></custom-map>
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