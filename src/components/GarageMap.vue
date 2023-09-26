<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {Geolocation} from "@capacitor/geolocation";
import mapBlueIcon from "../../public/assets/mapIcons/blue.svg";
import mapGreenIcon from "../../public/assets/mapIcons/Vector.svg";
import axios from "axios";
const props =defineProps({
  modelValue:Object,
  data:Array
})
const emits = defineEmits(['update:modelValue']);
let platform;
let map;
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
    map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map, {
          center: {lat: 0, lng: 13},
          zoom: 5,
        });
    const behavior =  new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }).then(()=>getCoordinates().then(()=>map.setCenter({lat: currentPosition.value.latitude,lng: currentPosition.value.longitude})))
}
onMounted( ()=>{
  setTimeout(()=>{
    initializeMap().then( () => spinner.value = false).then(()=>{
      axios.get('garages').then(response=>{
        response.data.data.forEach(marker=>{
          if (marker.type === 'conventionné'){
            addMarker(map,marker.coords,mapBlueIcon)
          }else {
            addMarker(map,marker.coords,mapGreenIcon)
          }
        })
      })}
    );
  },2000)
})
const addMarker = (map,coord,icon) =>{
  const marker = new H.map.Marker(new H.geo.Point(coord.lat,coord.lng ),{
    icon: new H.map.Icon(icon)
  });
  map.addObject(marker)
}

</script>

<template>
  <div id="mapContainer">
    <div v-if="spinner" class="spinner">
    </div>
  </div>
  <div class="mapKeys">
    <div class="key">
      <div class="color1"></div>
      <p>Garages agréés</p>
    </div>
    <div class="key">
      <div class="color2"></div>
      <p>Garages conventionnés</p>
    </div>
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
.key {
  display: flex;
  gap: .5rem;
  align-items: center;
  margin: .5rem 0;
  p {
    text-transform: capitalize;
  }
}
.color1 {
  background-color: #0BD561;
  width: 1rem;
  height: 1rem;
  border-radius: .2rem;
}
.color2 {
  background-color: #003E7E;
  width: 1rem;
  height: 1rem;
  border-radius: .2rem;
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