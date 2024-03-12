<template>
  <l-map ref="map" v-bind="mapOptions" v-on="listeners">
    <l-marker
      @click="handleClick(marker)"
      v-for="(marker, index) in props.markerConfig"
      :key="index"
      :lat-lng="marker.latlng">
      <l-icon>
        <BaseMarker
          :label-position="marker.labelPosition"
          :name="marker.name"></BaseMarker>
      </l-icon>
    </l-marker>
    <template #[slotName]="slotProps" v-for="(_, slotName) in slots">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>

    <Toolbar :items="props.toolbar" :map="mapInstance" direction="horizontal">
    </Toolbar>
  </l-map>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
  getCurrentInstance,
  useSlots,
  computed,
} from "@vue/composition-api";
import L from "leaflet";
import { LMap, LMarker, LIcon } from "vue2-leaflet";
import "leaflet.chinatmsproviders";
import "leaflet/dist/leaflet.css";
import * as Esri from "esri-leaflet";
import { addL7Layer } from "./utils/l7";
import BaseMarker from "./components/BaseMarker.vue";
import Toolbar from "./components/Toolbar/index.vue";
import { mapConfig, layersConfig } from "./mapConfig.js";
import { merge } from "lodash-es";

// 属性、事件透传
const instance = getCurrentInstance();
const attrs = ref({});
const listeners = ref({});
const slots = ref({});
attrs.value = instance.setupContext.attrs;
listeners.value = instance.setupContext.listeners;
slots.value = useSlots();

const map = ref(null);
const defaultOptions = {
  attributionControl: false,
  zoomControl: false,
  center: [39.53264411091661, 115.59471130371095],
  zoom: 6,
};
const mapOptions = computed(() => ({
  ...attrs.value,
  options: merge(defaultOptions, attrs.value.options || {}),
}));
L.esri = Esri; //将esri挂到L上
const props = defineProps({
  baseMap: {
    type: [String, Function],
    default: "",
  },
  markerConfig: {
    type: Array,
    default() {
      return [];
    },
  },
  toolbar: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["click-marker"]);
function handleClick(marker) {
  console.log("click marker");
  emit("click-marker", marker.name);
}
const mapInstance = computed(() => map.value?.mapObject);

function setBaseMap(baseMap) {
  let addBaseMap = undefined;
  if (typeof baseMap === "string") {
    addBaseMap = layersConfig[baseMap];
  } else if (typeof baseMap === "function") {
    addBaseMap = baseMap;
  }

  if (!addBaseMap) {
    console.warn(
      `目前仅支持[${Object.keys(layersConfig).join(",")}]的预设基础图层`
    );
    return;
  }

  if (!mapInstance.value) {
    throw new Error("地图实例不存在");
  }
  clearLayers(mapInstance.value);
  addBaseMap(mapInstance.value, L);
  // console.log(mapInstance.value)
}

function clearLayers(mapInstance) {
  for (let i in mapInstance._layers) {
    mapInstance._layers[i].remove();
  }
}
watch(
  () => props.baseMap,
  (newVal, oldVal) => {
    setBaseMap(newVal);
  }
);

onMounted(() => {
  mapInstance.value.addL7Layer = addL7Layer.bind(mapInstance.value);
  setBaseMap(props.baseMap);
});

onUnmounted(() => {
  // mapInstance.value?.remove();
});
</script>
<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
