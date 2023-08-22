<script>
import {defineComponent} from 'vue';
import {IonPage,IonContent} from "@ionic/vue";
import EmailVector from "@/components/icons/EmailVector.vue";
import CustomButton from "@/components/CustomButton.vue";

export default defineComponent({
  name: "EmailVerify",
  components :{
    CustomButton,
    EmailVector,
    IonPage,
    IonContent
  }
})
</script>

<template>
<ion-page>
  <ion-content :fullscreen="true">
    <div class="page">
      <div class="card">
        <div class="header">
          <email-vector style="width: 70%;" ></email-vector>
        </div>
        <div class="body">
          <h2>Veuillez vérifier votre email</h2>
          <p>Un email est envoyé à votre adresse email veuillez vérifier votre boîte email</p>
          <custom-button>Ré-envoyer l'email</custom-button>
        </div>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<style lang="scss" scoped>

.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.page::before {
  content: " ";
  display: block;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #003E7E;
  background-image:  radial-gradient(#ffffff 1.2000000000000002px, transparent 1.2000000000000002px), radial-gradient(#ffffff 1.2000000000000002px, #003E7E 1.2000000000000002px);
  background-size: 48px 48px;
  background-position: 0 0,24px 24px;
  z-index: -1;
}


.card {
  background-color: var(--white-color);
  border-radius: var(--global-border-radius);
  width: 90%;
  padding: 2rem 1rem;
}
.body {
  margin-top: 2rem;
  text-align: center;
  *:last-child{
    margin-top: 1rem;
  }
}
.header {
  text-align: center;
  color: var(--black-color);
}
</style>