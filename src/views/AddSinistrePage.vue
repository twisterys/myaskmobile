<script setup>
import {ref} from "vue";
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import CustomTextArea from "@/components/CustomTextArea.vue";
import ImageInput from "@/components/ImageInput.vue";
import {alertController, IonPage} from "@ionic/vue";
import router from "@/router";
import CustomButton from "@/components/CustomButton"



const cars = [{
  id: 1,
  matricule: {
    number: "198732",
    alphabet: "د",
    city: "06"
  }
}];
const car = ref(cars[0].id)
const tiers = ref('');
const description = ref('');
async function presentAlert(msg) {
  const alert = await alertController.create({
    header: "Réussie",
    message: msg,
    buttons: ["OK"],
  });
  await alert.present().then(router.back);
}
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
            <option v-for="car in cars" :key="car.id" :value="car.id"> {{ car.matricule.city }} {{
                car.matricule.alphabet
              }}
              {{ car.matricule.number }}
            </option>
          </select>
        </div>
        <CustomTextArea label="Information Tiers :" v-model="tiers" placeholder="Information tiers..." w-full/>
        <CustomTextArea label="Description :" v-model="description" placeholder="Votre description..." w-full/>
        <div class="photos">
          <p>Photos d’accident:</p>
          <image-input input-id="image1"/>
          <image-input input-id="image3"/>
          <image-input input-id="image3"/>
          <image-input input-id="image3"/>
        </div>
        <div class="center">
          <CustomButton @click="presentAlert('Votre déclaration est envoyer')" rounded >
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