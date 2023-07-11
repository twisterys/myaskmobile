<script setup >
import {IonPage,IonContent,IonAlert} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import CustomButton from "@/components/CustomButton.vue";
import IconLogout from "@/components/icons/IconLogout.vue";
import {
  alertController,
} from "@ionic/vue";
import {useRouter} from "vue-router";
import axios from "axios";
const router = useRouter();

const logout = () => {
  localStorage.clear();
  router.go();
}
const alertButtons = [
  {
    text: 'Annuler',
    role: 'cancel',
  },
  {
    text: 'Oui',
    role: 'confirm',
    handler: () => {
      console.log('aleeeerrt')
      axios.get('/remove').then(response=>presentAlert('votre demande est envoyer')
    ).catch(errors=>console.log(errors))
    },
  },
];
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
      <page-header text="Settings" :icon="true">
        <icon-logout @click="logout" style="width: 35px; color: #dc3545"/>
      </page-header>
    

      <page-divider text="Mon compte" />
      <div class="info">
        <span>Date de création du compte :</span>
        <span>{{null}}</span>
      </div>
      <a id="delete-button">Supprimer mon compte</a>
      <ion-alert
          trigger="delete-button"
          header="Attention!"
          sub-header="votre compte sera définitivement supprimé"
          message="êtes-vous sûr de vouloir supprimer votre compte ?"
          :buttons="alertButtons"
      ></ion-alert>
    </main>
  </ion-content>
</ion-page>
</template>

<style scoped>
.info {
  margin-top: 1rem;
}
#delete-button {
  color: var(--gray-color-300);
  text-align: end;
  width: 100%;
  display: block;
  margin: 2rem 0;
  font-size: 0.8rem;
}
</style>