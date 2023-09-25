<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {Geolocation} from "@capacitor/geolocation";
import mapBlueIcon from "../../public/assets/mapIcons/blue.svg";
import CustomButton from "@/components/CustomButton.vue";
const props = defineProps({
  modelValue:Object
})
const emits = defineEmits(['update:modelValue']);
let platform;
let map;
let defaultLayers;
const currentPosition = ref('');
const getCoordinates = async () => {
  const coord = await Geolocation.getCurrentPosition();
  currentPosition.value = coord.coords;
};
getCoordinates().then(()=>{
  setMyPosition();
})
const initializeMap = () =>{
  platform =new H.service.Platform({'apikey': '6X7czpbs85TYs6wlWd8nLrflSsKgRO98PZ7TMu5C8K0'})
  defaultLayers = platform.createDefaultLayers();
  map = new H.Map(document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map, {
        center: {lat: 0, lng: 13},
        zoom: 3,
      });
  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  map.addEventListener('tap', function (evt) {
    map.removeObjects(map.getObjects ())
    const coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);
    addMarker(map,coord);
    emits('update:modelValue',coord)
  });
  window.addEventListener('resize', () => map.getViewPort().resize());
}
onMounted( e=>{
 initializeMap();
})
const addMarker = (map,coord) =>{
  const marker = new H.map.Marker(new H.geo.Point(coord.lat,coord.lng ),{
    icon: new H.map.Icon(mapBlueIcon)
  });
  map.addObject(marker)
}
const setMyPosition = ()=>{
  getCoordinates().then(()=>{
    map.removeObjects(map.getObjects ());
    addMarker(map,{lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    emits('update:modelValue',{lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    map.setCenter({lat: currentPosition.value.latitude,lng: currentPosition.value.longitude});
    map.setZoom(20)
  })
}
</script>

<template>
  <div id="mapContainer"></div>
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
.buttons {
  display: flex;
  justify-content: end;
  padding: 1rem .5rem;
}
</style>