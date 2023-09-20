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
import axios from "axios";


const cars = ref([]);
const couvertures = ref([]);
const carBrand = ref("");
const carModel = ref("");
const carHP = ref("");
const circulationDate = ref("");
const alphabet = ref("");
const city = ref("");
const carPlateNumber = ref("");
const alphabets = ref(["أ", "ب", "د", 'ج', "ي", "و"]);
const typeCouverture = ["Def et Recrs", "Incendie", "Tierce", "Bris de glaces", "Vol", "Collision", "Perte finance", "Assistance"];
const duration = ref(3);

async function presentAlert(msg, header) {
  const alert = await alertController.create({
    header: header,
    message: msg,
    buttons: ["OK"],
  });
  await alert.present()
}

function check_date(date) {
  return date;
}

function empty_check(attr) {
  if (attr === "" || attr === null || attr === undefined)
    return true;
  else
    return false;
}

const addHandler = (e) => {
  if (empty_check(carBrand.value) || empty_check(carModel.value) || empty_check(carHP.value) || empty_check(circulationDate.value) ||
      empty_check(carPlateNumber.value) || empty_check(alphabets.value) || empty_check(city.value)) {
    presentAlert('Merci de remplir toutes les informations du véhicule')

  } else {
    cars.value.push({
      mark: carBrand.value,
      model: carModel.value,
      horsePower: carHP.value,
      circulation: check_date(circulationDate.value),
      matricule: {
        mat1: carPlateNumber.value,
        mat2: alphabet.value,
        mat3: city.value
      }
    });
    [carModel, carBrand, carHP, circulationDate, alphabet, city, carPlateNumber].forEach(co => co.value = "")
  }
};
const send_request = function () {
  axios.post('insurance_add', {
    duration: duration.value,
    cars: cars.value,
    types: couvertures.value
  })
      .then(response => {
        console.log(response);
        presentAlert("Votre demande de devis est envoyé", "Réussie!");
      })
      .catch(err => {
        const errors = err.response.data.errors
        const header = "Attention!";
        let msg = '';
        for (const error in errors) {
          msg = errors[error][0]
        }
        presentAlert(msg, header);
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
          <CustomInput v-model="carBrand" input-id="marque-input" label="Marque" placeholder="Véhicule marque.." rounded
                       w-full/>
          <CustomInput v-model="carModel" input-id="modele-input" label="Modele" placeholder="Véhicule modele.." rounded
                       w-full/>
          <div class="input">
            <DatePicker v-model="circulationDate" color="sky-blue" locale="fr">
              <template #default="{ inputValue, inputEvents }">
                <CustomInput :model-value="inputValue" label="Mise en circulation" left
                             placeholder="DD/MM/YYYY" rounded w-full v-on="inputEvents">
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
          <CustomInput v-model="carHP" input-id="hp-input" label="Puissance fiscale" placeholder="Puissance fiscale.."
                       rounded
                       type="number" w-full/>
          <div class="matricule">
            <p>Matricule :</p>
            <div class="inputs">
              <CustomInput v-model="carPlateNumber" :hide-label="true" placeholder="198732" rounded type="number"
                           w-full/>
              <select :value="alphabet" class="aks-select" @change="$event=> alphabet = $event.target.value ">
                <option disabled value="">Alphabet</option>
                <option v-for="alphabet in alphabets" :key="alphabet" :value="alphabet">{{ alphabet }}</option>
              </select>
              <select :value="city" class="aks-select" @change="$event=> city = $event.target.value ">
                <option disabled value="">Ville</option>
                <option v-for="i in 87" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>
          </div>
          <div class="end">
            <CustomButton rounded @click="addHandler">
              Ajouter un véhicule
            </CustomButton>
          </div>
        </div>
        <PageDivider text="Information d’assurance"/>
        <div class="couverture">
          <p>Type de couverture:</p>
          <div class="checkboxs">
            <CustomCheckBox :checked="true" :disable="true" label="Responsabilité civile *"
                            name="couverture" value=""/>
            <CustomCheckBox v-for="couverture in typeCouverture" :key="couverture" v-model="couvertures" :label="couverture"
                            :model="couverture" name="couverture" type="radio"/>
          </div>
        </div>
        <div class="duration">
          <p>Durée d'assurance :</p>
          <div class="checkboxs">
            <input id="one" v-model="duration" class="ask-radio" name="duration" type="radio" value="3"/>
            <label for="one">3mois</label>
            <input id="two" v-model="duration" class="ask-radio" name="duration" type="radio" value="6"/>
            <label for="one">6mois</label>
            <input id="two" v-model="duration" class="ask-radio" name="duration" type="radio" value="12"/>
            <label for="two">12mois</label>
          </div>
        </div>
        <div class="footer">
          <CustomButton w-full @click="send_request">
            Demander un devis
          </CustomButton>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
.phrase {
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
  box-shadow: var(--global-shadow);
  width: fit-content;
  border-radius: var(--full-border-radius);

  * {
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
        top: calc(50% - 2px);
        left: calc(50% - 2px);
        border: 2px solid white;
        border-radius: var(--full-border-radius);
      }
    }
  }
}

.duration {
  margin-top: 1rem;
}

.footer {
  margin: 2rem 0 0 0;
  text-align: center;
}
</style>
