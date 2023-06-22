<script setup>
import ToBackPageHeader from "@/components/ToBackPageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import {ref} from "vue";
import CustomInput from "@/components/CustomInput.vue";
import {DatePicker} from "v-calendar";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import CustomButton from "@/components/CustomButton.vue";
import CarCard from "@/components/CarCard.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";
import {alertController, IonContent, IonPage} from "@ionic/vue";
import AskNavbar from "@/components/AskNavbar";
import axios from "axios";
import router from "@/router";

const cars = ref([]);
const carBrand = ref("");
const carModel = ref("");
const carHP = ref("");
const circulationDate = ref("");
const alphabet = ref("");
const city = ref("");
const carPlateNumber= ref("");
const alphabets = ref(["أ", "ب", "د", 'ج', "ي", "و"]);
const typeCouverture = ["Def et Recrs","Incendie","Tierce","Bris de glaces","Vol","Collision","Perte finance","Assistance"];
const duration = ref(3);

async function presentAlert(msg,header) {
  const alert = await alertController.create({
    header: header,
    message: msg,
    buttons: ["OK"],
  });
  await alert.present()
}

function check_date(date) {
  return date ;
}

function empty_check(attr)
{
   if(attr==="" || attr === null || attr === undefined)
      return true ;
   else
     return false;
}

const addHandler = (e) => {
  if(empty_check(carBrand.value)  || empty_check(carModel.value) || empty_check(carHP.value) || empty_check(circulationDate.value) ||
      empty_check(carPlateNumber.value) || empty_check(alphabets.value) || empty_check(city.value))
  {
    presentAlert('Merci de remplir toutes les informations du véhicule')

  } else {
    cars.value.push({
      mark: carBrand.value,
      model: carModel.value,
      horsePower: carHP.value,
      circulation : check_date(circulationDate.value),
      matricule: {
        mat1: carPlateNumber.value,
        mat2: alphabet.value,
        mat3: city.value
      }
    });
    [carModel,carBrand,carHP,circulationDate,alphabet,city,carPlateNumber].forEach(co=>co.value="")
  }
};
const send_request = function () {
  axios.post('insurance_add', {
    duration : duration.value,
    cars : cars.value
  })
      .then(response=>{
        presentAlert("Votre demande de devis est envoyé","Réussie!");
      }).then(router.back)
      .catch(err=>{
        const errors = err.response.data.errors
        const header ="Attention!";
        let msg ='';
        for (const error in errors) {
          msg = errors[error][0]
        }
        presentAlert(msg,header);
      })
}

  function moveToday() {
    circulationDate.value = new Date();
  }
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <ToBackPageHeader text="Nouvelle demande"/>
        <p class="phrase">Remplissez vos informations dans les champs suivant</p>
        <PageDivider text="Informations du véhicule"/>
        <CarCard v-for="(car) in cars" :key="car.matricule.number" :car="car" style="pointer-events: none"/>
        <div class="car-inputs">
          <CustomInput label="Marque" placeholder="Véhicule marque.." v-model="carBrand" input-id="marque-input" rounded
                       w-full/>
          <CustomInput label="Modele" placeholder="Véhicule modele.." v-model="carModel" input-id="modele-input" rounded
                       w-full/>
          <div class="input">
            <DatePicker locale="fr" color="sky-blue" v-model="circulationDate">
              <template #default="{ inputValue, inputEvents }">
                <CustomInput label="Mise en circulation" placeholder="DD/MM/YYYY" :model-value="inputValue"
                             v-on="inputEvents" rounded w-full left>
                  <IconCalendar/>
                </CustomInput>
              </template>
              <template #footer>
                <div class="calenderButton">
                  <CustomButton @click="moveToday">Aujourd'hui</CustomButton>
                </div>
              </template>
            </DatePicker>
          </div>
          <CustomInput type="number" label="Puissance fiscale" placeholder="Puissance fiscale.." v-model="carHP"
                       input-id="hp-input"
                       rounded w-full/>
          <div class="matricule">
            <p>Matricule :</p>
            <div class="inputs">
              <CustomInput type="number" :hide-label="true" v-model="carPlateNumber" placeholder="198732" rounded
                           w-full/>
              <select :value="alphabet" @change="$event=> alphabet = $event.target.value " class="aks-select">
                <option value="" disabled>Alphabet</option>
                <option v-for="alphabet in alphabets" :key="alphabet" :value="alphabet">{{ alphabet }}</option>
              </select>
              <select :value="city" class="aks-select" @change="$event=> city = $event.target.value ">
                <option value="" disabled>Ville</option>
                <option v-for="i in 87" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>
          </div>
          <div class="end">
            <CustomButton @click="addHandler" rounded>
              Ajouter un véhicule
            </CustomButton>
          </div>
        </div>
        <PageDivider text="Information d’assurance"/>
        <div class="couverture">
          <p>Type de couverture:</p>
          <div class="checkboxs">
            <CustomCheckBox :disable="true" :checked="true" value="Responsabilité civile"
                            label="Responsabilité civile *" name="couverture"/>
            <CustomCheckBox type="radio" v-for="couverture in typeCouverture" :key="couverture" :value="couverture"
                            :label="couverture" name="couverture"/>
          </div>
        </div>
        <div class="duration">
          <p>Durée d'assurance :</p>
          <div class="checkboxs">
            <input type="radio" id="one" value="3" v-model="duration" class="ask-radio" name="duration"/>
            <label for="one">3mois</label>
            <input type="radio" id="two" value="6" v-model="duration" class="ask-radio" name="duration"/>
            <label for="one">6mois</label>
            <input type="radio" id="two" value="12" v-model="duration" class="ask-radio" name="duration"/>
            <label for="two">12mois</label>


          </div>
        </div>
        <div class="footer">
          <AskButton  @click="send_request" w-full>
            Demander un devis
          </AskButton>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped >
.phrase  {
  color: var(--gray-color-300);
  margin-top: 1rem;
}

.car-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: .5rem 0;
}

.calenderButton {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
}

div.matricule .inputs {
  display: flex;
  margin-top: .5rem;
  gap: .5rem;
}

.end {
  display: flex;
  justify-content: end;
}
.checkboxs {
  margin-top: .7rem;
  display: flex;
  gap: .5rem;
  flex-wrap: wrap;
}
.ask-radio {
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
    display: block;
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
.duration {
  margin-top: 1rem;

























































}
.footer {
  margin: 2rem 0 1rem 0;
  text-align: center;
}
</style>
