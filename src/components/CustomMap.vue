<script setup>
import {onMounted, ref} from "vue";
import {Geolocation} from "@capacitor/geolocation";
import mapBlueIcon from "../../public/assets/mapIcons/blue.svg";
import CustomButton from "@/components/CustomButton.vue";
import axios from "axios";
defineProps({
  modelValue:Object
})
const emits = defineEmits(['update:modelValue']);
let platform;
let map2;
let defaultLayers;
const currentPosition = ref('');
const spinner = ref(true);
const getCoordinates = async () => {
  const coord = await Geolocation.getCurrentPosition();
  currentPosition.value = coord.coords;
};
const initializeMap = async () =>{
  await axios.get('hereToken').then(response=>{
    return  response.data;
  }).then(token=>{
    platform = new H.service.Platform({'apikey':token})
    defaultLayers = platform.createDefaultLayers();
    map2 = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map, {
          center: {lat: 0, lng: 13},
          zoom: 5,
        });
    const behavior =  new H.mapevents.Behavior(new H.mapevents.MapEvents(map2));
  }).then(()=>{
    getCoordinates().then(
        ()=>map2.setCenter({lat: currentPosition.value.latitude,lng: currentPosition.value.longitude}));
    setMyPosition()
  })
  map2.addEventListener('tap', function (evt) {
    map2.removeObjects(map2.getObjects ())
    const coord = map2.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    addMarker(map2,coord);
    emits('update:modelValue',coord)
  });
}
onMounted( ()=>{
 setTimeout(()=>{
   initializeMap().then( () => spinner.value = false);
 },2000)

})

const addMarker = (map2,coord) =>{
  const marker = new H.map.Marker(new H.geo.Point(coord.lat,coord.lng ),{
    icon: new H.map.Icon(mapBlueIcon)
  });
  map2.addObject(marker)
}
const setMyPosition = ()=>{
  getCoordinates().then(()=>{
    map2.removeObjects(map2.getObjects ());
    addMarker(map2,{lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    emits('update:modelValue',{lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    map2.setCenter({lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    map2.setZoom(15)
  })
}

</script>

<template>
  <div id="mapContainer">
    <div v-if="spinner" class="spinner">
    </div>
  </div>
  <div class="buttons">
    <CustomButton @click="setMyPosition" >Ma position actuelle</CustomButton>
  </div>
</template>

<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 350px;
  border-radius: var(--global-border-radius);
  border: none;
  overflow: hidden;
}
.spinner {
  width: 100%;
  height: 100%;
  background-color: var(--gray-color-100);
  position: relative;
}
.spinner::after {
  background-image: linear-gradient(
          90deg,
          rgba(#fff, 0) 0,
          rgba(#fff, 0.2) 20%,
          rgba(#fff, 0.5) 60%,
          rgba(#fff, 0)
  );
  transform: translateX(-100%);
  animation: shimmer 2s infinite;
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.buttons {
  display: flex;
  justify-content: end;
  padding: 1rem .5rem;
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

</style>