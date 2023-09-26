<script setup>
import {IonContent, IonPage} from "@ionic/vue";
import PageHeader from "@/components/PageHeader.vue";
import PageDivider from "@/components/PageDivider.vue";
import IconPhone from "@/components/icons/IconPhone.vue";
import CustomLink from "@/components/CustomLink.vue";
import GarageMap from "@/components/GarageMap.vue";
import {onBeforeMount, ref} from "vue";
import axios from "axios";
const garages = ref([]);
const map = ref(false)
onBeforeMount(()=>{
  axios.get('garages').then(response=>{
    garages.value = response.data
  }).then(()=>{
    map.value = true;
  })
})
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <main>
        <PageHeader text="Assistance"/>
        <PageDivider text="Garage map"/>
        <garage-map v-if="map" :data="garages" ></garage-map>
        <PageDivider text="Répertoire d'assistance"></PageDivider>
        <div class="rep">
          <CustomLink href="tel:190"  rounded w-full>
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
          </CustomLink>
          <CustomLink href="tel:190"  rounded w-full>
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
          </CustomLink>
          <CustomLink href="tel:170"  rounded w-full>
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
          </CustomLink>
          <CustomLink href="tel:5050" rounded w-full>
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
          </CustomLink>
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