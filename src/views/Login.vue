<template>
  <ion-page>
    <IonContent :fullscreen="true" >
      <div class="overlay" v-if="showLoader" >
        <ion-spinner name="bubbles"></ion-spinner>
      </div>
      <Eclipse class="eclipse"/>
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div id="content" >
        <section class="login">
          <form @submit.prevent="login()">
            <div class="form-header">
              <h1>S’identifier</h1>
              <p>Remplissez vos informations de connexion</p>
            </div>
            <div v-if="loginErrors>0" class="errors">
              <p v-for="(error,i) in loginErrors" :key="i">{{ error }}</p>
            </div>
            <div class="form-body">
              <AskInput placeholder="email@example" label="Email" v-model="user.email" name="identifient"
                        input-id="identifient-input" rounded w-full left>
                <IconProfileCircle/>
              </AskInput>
              <AskInput placeholder="******" label="Mot de passe" v-model="user.password" name="password" input-id="password-input"
                        type="password" rounded w-full left>
                <IconKey/>
              </AskInput>
              <AskButton w-full>
                connexion
              </AskButton>

            </div>
          </form>
        </section>
        <section class="register">
          <div class="drag-hook"></div>
          <p  class="footer"> <RouterLink to="/register"><a style="color: white !important;">Créer un compte ?</a> </RouterLink></p>
        </section>
      </div>
    </IonContent>
  </ion-page>
</template>
<script>
import {
  alertController,
} from "@ionic/vue";

import {defineComponent, onMounted, ref} from "vue";
import AskButton from "@/components/CustomButton.vue";
import AskInput from "@/components/CustomInput.vue";
import Eclipse from "@/components/icons/CustomEclipse.vue";
import IconProfileCircle from "@/components/icons/IconProfileCircle.vue";
import IconKey from "@/components/icons/IconKey.vue";
import {IonPage,IonContent,IonSpinner} from "@ionic/vue";
import axios from "axios";

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      password_hidden: true,
      showSpin: false,
      user: {
        email: "",
        password: "",
      },
      showLoader:false
    };
  },
  methods: {
    async presentAlert(msg,header ='Attention',buttons=['OK']) {
      const alert = await alertController.create({
        header: header,
        message: msg,
        buttons:buttons,
      });
      await alert.present();
    },
    async  emailVerificationAlert(userId,btn_text){
      const alert1 = await alertController.create({
        header: "Veuillez vérifier votre email",
        message: "Un lien de confirmation est envoyé à votre adresse email veuillez vérifier votre boîte email",
        buttons:[
          {
            text: btn_text,
            handler: () => {
              this.showLoader = true;
              axios.post('email/verification/resend',{id:userId}).then(response=>{
                this.showLoader = false;
                this.presentAlert(response.data.message)
              }).catch(err=>{
                this.showLoader = false;
                this.presentAlert(err.response.data.message);
              })
            },
          },
          {
            text: 'ok',
          },
        ],
      });
      await alert1.present();
    },

    login() {

      // if (!window.navigator.onLine) {
      //   this.presentAlert("Veuillez vérifier votre connexion internet");
      //   return;
      // }
      if (this.user.email === "" || this.user.password === "") {
        this.presentAlert("Email et mot de passe sont obligatoire");
        return;
      }

      (this.showSpin = true),
          this.$store
              .dispatch("auth/login", this.user)
              .then(() => {
                this.showSpin = false;
                this.$router.push({ name: "Home" });
              })
              .catch((err) => {
                if (
                    Number(err.response.status) === 422 ||
                    Number(err.response.status) === 401 ||
                    Number(err.response.status) === 404
                ) {
                  this.presentAlert(err.response.data.message);
                  this.showSpin = false;
                }else if(Number(err.response.status) === 403){
                  this.emailVerificationAlert(err.response.data.data.id,'Renvoyer');
                }
                else {

                  this.presentAlert("Erreur de connexion internet . code"+ err.response.status);
                  this.showSpin = false;

                }
              });
    },
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AskButton,
    Eclipse,
    AskInput,
    // IconBack,
    // IconCalendar,
    IconProfileCircle,
    IconKey,
    IonPage,
    IonContent
  },
});
</script>
<style lang="scss" scoped>
.eclipse {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 35vh;
}

.logo {
  width: 19vh;
  height: 19vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(16%);
  background-color: white;
  box-shadow: var(--global-shadow);
  border-radius: 50%;

  img {
    width: 90%;
  }
}
section {
  display: flex;
  padding-top:10vh ;
}
.overlay {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
  >*{
    color: white;
    width:50px;
    height:50px;
  }
}
.login {
  margin-top: 30vh;
  width: 100%;

  form {
    width: 100%;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    > * + * {
      margin-top: 1rem;
    }

    .form-header {
      text-align: center;

      h1 {
        color: var(--blue-color-400) !important;
        font-size: 2rem;
      }

      p {
        color: var(--gray-color-300);
        font-size: .8rem;
      }

      margin-bottom: 1rem;
      @media screen and (min-height: 740px) {
        margin-top: 2vh;
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
  *{
    color: var(--blue-color-400);
  }
}


.register {
  background-color: var(--blue-color-400);
  color: var(--white-color);
  width: 100%;
  border-radius: 3rem 3rem 0 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: .7rem;
  align-items: center;
  transition: all ease-in-out 200ms;
  .logo-register {
    display: none;
  }
  form {
    display: none;
  }
  .drag-hook {
    min-height: .4rem;
    position: sticky;
    top: 0;
    width: 3rem;
    background-color: var(--white-color);
    border-radius: 100px;
    z-index: 2;
    pointer-events: all;
  }
  .drag-hook.second {
    display: none;
  }
  .footer {
    font-size: 1rem;
    text-color : white ;
  }
  &.opened {
    border-radius: 0;
    transform: revert;
    padding: 1rem 0 0 0;
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
      padding: 0 1rem 1rem 1rem;
      border-radius: 2rem 2rem 0 0;
      overflow-y: scroll;
      flex: 1;
      height: fit-content;
      .row {
        display: flex;
        flex-wrap: nowrap;
        gap: .5rem;
        margin: 0;
        >*{
          padding: 0 ;
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
    .hook-container {
      position: sticky;
      top: 0;
      padding: 1rem;
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: white;
    }
    .drag-hook {
      display: none;
    }
    .drag-hook.second {
      background-color: var(--gray-color-200);
      display: block;
      margin-bottom: .5rem;
      position: static;
    }
  }
}
#content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
</style>
