<script setup>

import IconProfileCircle from "@/components/icons/IconProfileCircle.vue";
import AskInput from "@/components/CustomInput.vue";
import IconKey from "@/components/icons/IconKey.vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconBack from "@/components/icons/IconBack.vue";
import AskButton from "@/components/CustomButton.vue";
import IconPersonalInfo from "@/components/icons/IconPersonalInfo.vue";
import {ref} from "vue";
import {alertController, IonContent, IonPage} from "@ionic/vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomInput from "@/components/CustomInput.vue";
import {DatePicker} from "v-calendar";
import axios from "axios";
import router from "@/router";

const user = ref({
  name:'',
  last_name:'',
  birthday:'',
  address:'',
  cin:'',
  password:'',
  email:'',
})

const registerHandler = () => {
  axios.post('register',user.value)
      .then(response=>{
        presentAlert("Votre compte a été créé avec succès","Réussie!");
      })
      .catch(err=>{
        const errors = err.response.data.errors
        const header ="Attention!";
        let msg ='';
        for (const error in errors) {
          msg = errors[error][0]
        }
        presentAlert(msg,header);
      })
  console.log(user.value)
}
const registerErrors = ref([]);

async function presentAlert(msg,header) {
  const alert = await alertController.create({
    header: header,
    message: msg,
    buttons: ["OK"],
  });
  await alert.present().then(router.back);
}
</script>

<template>
  <ion-page>
    <ion-content>
      <section class="register">
        <div class="logo-register">
          <img src="../assets/whiteLogo.png" alt="logo">
        </div>
        <form @submit.prevent="registerHandler">
          <div class="form-header">
            <h1>Inscription</h1>
            <p>Remplissez vos informations dans les champs suivant</p>
          </div>
          <div v-if="registerErrors.length>0" class="errors">
            <p v-for="(error,i) in registerErrors" :key="i">{{ error }}</p>
          </div>
          <div class="form-body">
            <div class="row">
              <AskInput placeholder="Votre prénom" label="Prénom" v-model="user.name" name="prénom"
                        input-id="prénom-input" rounded w-full left>
                <IconProfileCircle/>
              </AskInput>
              <AskInput placeholder="Votre nom" label="Nom" v-model="user.last_name" name="Nom" input-id="nom-input"
                        rounded w-full left>
                <IconProfileCircle/>
              </AskInput>
            </div>
            <AskInput placeholder="Votre numéro CIN" label="Numéro CIN" v-model="user.cin" name="cin"
                      input-id="cin-input"
                      rounded w-full left>
              <IconPersonalInfo/>
            </AskInput>
            <DatePicker locale="fr" color="sky-blue" v-model="user.birthday">
              <template #default="{ inputValue, inputEvents }">
                <CustomInput label="Date de Naissance" placeholder="DD/MM/YYYY" :model-value="inputValue"
                             v-on="inputEvents" rounded w-full left>
                  <IconCalendar/>
                </CustomInput>
              </template>
            </DatePicker>
            <AskInput placeholder="Votre adresse" label="Adresse" v-model="user.address" name="adresse"
                      input-id="adresse-input"
                      rounded w-full>
            </AskInput>
            <AskInput placeholder="email@example" label="Email" v-model="user.email" name="email"
                      input-id="email-input" rounded w-full left>
              <IconProfileCircle/>
            </AskInput>
            <AskInput placeholder="******" label="Mot de passe" v-model="user.password" name="password" input-id="password-input"
                      type="password" rounded w-full left>
              <IconKey/>
            </AskInput>
            <AskButton type="submit" w-full>
              Inscription
            </AskButton>
            <RouterLink to="/login" class="toLogin">
              <IconBack class="back"/>
              Retourner à la page de connexion
            </RouterLink>
          </div>
        </form>
      </section>

    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  padding-top: 10vh;
}

.register {
  background-color: var(--blue-color-400);
  color: var(--white-color);
  width: 100%;
  padding: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: .7rem;
  align-items: center;
  transition: all ease-in-out 200ms;
  height: 100vh;

  .logo-register {
    display: none;
  }

  .footer {
    font-size: 1rem;
  }

  .logo-register {
    display: block;
  }

  .footer {
    display: none;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    background-color: white;
    width: 100%;
    color: var(--black-color);
    padding: 2.5rem 1rem 1rem 1rem;
    border-radius: 2rem 2rem 0 0;
    overflow-y: scroll;
    flex: 1;
    .row {
      display: flex;
      flex-wrap: nowrap;
      gap: .5rem;
      margin: 0;

      > * {
        padding: 0;
      }

      @media screen and (min-height: 840px) {
        flex-direction: column;
        gap: 1rem;
      }
    }

    .form-header {
      text-align: center;

      h1 {
        color: var(--blue-color-400);
        font-size: 2rem;
      }

      p {
        color: var(--gray-color-300);
        font-size: .8rem;
      }

      margin-bottom: 1rem;
    }

    .toLogin {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: var(--blue-color-400);
      margin-bottom: 1rem;

      .back {
        width: 20px;
      }
    }
  }

}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  button {
    margin-top: .5rem;
  }
}

div.center {
  text-align: center;
  margin-top: .5rem;

  * {
    color: var(--blue-color-400);
  }
}
</style>