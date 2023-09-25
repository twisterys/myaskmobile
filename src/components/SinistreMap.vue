
<template>
  <div id="map">
    <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
    <CustomButton  >Ma position actuelle</CustomButton>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import {Geolocation} from "@capacitor/geolocation";

export default {
  name: "HereMap",
  components: {CustomButton},
  props: {
    center: Object
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "6X7czpbs85TYs6wlWd8nLrflSsKgRO98PZ7TMu5C8K0"
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap()
  },
  methods: {
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      const maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      const map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());
      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    }
  }
};
</script>

<style scoped>
#map {
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