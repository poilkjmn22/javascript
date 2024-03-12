<template>
  <div class="map-container-wrapper">
    <div class="map-container" ref="mapContainer"></div>
    <Toolbar :items="props.toolbar" :map="scene" direction="horizontal">
    </Toolbar>
  </div>
</template>
<script setup>
import { ref, onMounted } from "@vue/composition-api";
import { Mapbox } from "@antv/l7-maps";
import { Scene, PolygonLayer, LineLayer } from "@antv/l7";
import Toolbar from "./components/Toolbar/index.vue";
import "./utils/l7";

const mapContainer = ref(null);

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {
        pitch: 0,
        style: "blank",
        center: [3.438, 40.16797],
        zoom: 0.51329,
      };
    },
  },
  baseMap: {
    type: [String, Function],
    default: "offlineMapbox",
  },
  toolbar: {
    type: String,
    default: "",
  },
});

const basemapPresets = {
  offlineMapbox: addOfflineMapbox,
  // ...more
};

function setBaseMap(baseMap, scene) {
  let addBaseMap = undefined;
  if (typeof baseMap === "string") {
    addBaseMap = basemapPresets[baseMap];
  } else if (typeof baseMap === "function") {
    addBaseMap = baseMap;
  } else {
    return;
  }

  if (!addBaseMap) {
    console.warn(
      `目前仅支持[${Object.keys(basemapPresets).join(",")}]的预设基础图层`
    );
    return;
  }

  if (!scene) {
    throw new Error("l7 scene不存在");
  }
  addBaseMap(scene);
}

const emit = defineEmits(["load"]);

const scene = ref(null);
onMounted(() => {
  scene.value = new Scene({
    id: mapContainer.value,
    map: new Mapbox(props.options),
  });
  scene.value.on("load", () => {
    emit("load", scene.value);
    setBaseMap(props.baseMap, scene.value);
  });
});

async function addOfflineMapbox(scene) {
  const [world, population] = await Promise.all([
    fetch(
      "https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json"
    ).then((d) => d.json()),
    fetch(
      "https://gw.alipayobjects.com/os/basement_prod/f3c467a4-9ae0-4f08-bb5f-11f9c869b2cb.json"
    ).then((d) => d.json()),
  ]);
  const popobj = {};
  population.forEach((element) => {
    popobj[element.Code] =
      element["Population, female (% of total) (% of total)"];
  });
  // 数据绑定
  world.features = world.features.map((fe) => {
    fe.properties.female = popobj[fe.id] * 1 || 0;
    return fe;
  });
  const colors = [
    "#0A3663",
    "#1558AC",
    "#3771D9",
    "#4D89E5",
    "#64A5D3",
    "#72BED6",
    "#83CED6",
    "#A6E1E0",
    "#B8EFE2",
    "#D7F9F0",
  ];
  const layer = new PolygonLayer({ name: "国家填充" })
    .source(world)
    .scale("female", {
      type: "quantile",
    })
    .color("female", colors)
    .shape("fill")
    .style({
      opacity: 0.9,
    });

  const layer2 = new LineLayer({
    zIndex: 2,
    name: "国界线",
  })
    .source(world)
    .color("#fff")
    .size(0.3)
    .style({
      opacity: 1,
    });

  scene.addLayer(layer);
  scene.addLayer(layer2);
}
</script>
<style lang="scss" scoped>
.map-container-wrapper {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
    justify-content: center;
    display: flex;
    position: relative;
  }
}
</style>
