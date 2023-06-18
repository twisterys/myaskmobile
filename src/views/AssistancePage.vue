<script setup>
import {IonContent, IonPage} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import {onMounted, ref} from "vue";
import CustomMap from "@/components/CustomMap.vue";
import CustomButton from "@/components/CustomButton.vue";
import IconPhone from "@/components/icons/IconPhone.vue";

const getLatitude = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLatitude.value = position.coords.latitude;
      currentLongitude.value = position.coords.longitude;
    });
  }
}
const currentLongitude = ref();
const currentLatitude = ref();
onMounted(getLatitude)
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <PageHeader text="Assistance"/>
        <PageDivider text="Garage map"/>
        <CustomMap :latitude="currentLatitude" :longitude="currentLongitude"/>
        <PageDivider text="Répertoire d'assistance"></PageDivider>
        <div class="rep">
          <CustomButton rounded w-full>
            <template #default>
              <div class="space">
                <div class="row">
                  <div class="icon">
                    <IconPhone/>
                  </div>
                  Police
                </div>
                190
              </div>
            </template>
          </CustomButton>
          <CustomButton rounded w-full>
            <template #default>
              <div class="space">
                <div class="row">
                  <div class="icon">
                    <IconPhone/>
                  </div>
                  Protection civile
                </div>
                190
              </div>
            </template>
          </CustomButton>
          <CustomButton rounded w-full>
            <template #default>
              <div class="space">
                <div class="row">
                  <div class="icon">
                    <IconPhone/>
                  </div>
                  Gendarmerie royale
                </div>
                170
              </div>
            </template>
          </CustomButton>
          <CustomButton rounded w-full>
            <template #default>
              <div class="space">
                <div class="row">
                  <div class="icon">
                    <IconPhone/>
                  </div>
                  Autoroutes
                </div>
                5050
              </div>
            </template>
          </CustomButton>
        </div>
      </main>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.icon {
  width: 20px;

}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.space {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
}
.rep>* {
  margin-top: 1rem;
}
</style>