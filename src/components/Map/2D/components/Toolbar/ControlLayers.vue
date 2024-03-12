<template>
  <div class="control-layers">
    <el-popover trigger="hover">
      <span class="el-dropdown-link" slot="reference">
        <svg-icon icon-class="menu-projRun"> </svg-icon>
      </span>
      <div class="checkbox-list">
        <el-checkbox-group v-model="checkList" @change="handleChangeLayers">
          <el-dropdown-item v-for="(item, i) in layers" :key="i">
            <el-checkbox :label="item.key">
              {{ item.name || `图层${item.key}` }}
            </el-checkbox>
          </el-dropdown-item>
        </el-checkbox-group>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
import {
  ref,
  onMounted,
  nextTick,
  getCurrentInstance,
  watch,
} from "@vue/composition-api";
const self = getCurrentInstance();

let checkList = ref([]);

let layers = ref([]);
function bindControlLayers(map) {
  if (!map) {
    throw new Error("map实例不存在");
  }
  function addL7Layer(layer) {
    !layers.value.find((v) => v.key === `l7-${layer.id}`) &&
      layers.value.push({
        name: layer.name,
        visiable: layer.visible,
        key: `l7-${layer.id}`,
        _layer: { layer },
      });
  }
  function addExistLayers() {
    for (const key in map._layers) {
      const layer = map._layers[key];
      if (layer.getScene) {
        // l7图层
        for (const v of layer.getScene().getLayers()) {
          addL7Layer(v);
        }
        continue;
      }
      if (!layers.value.find((v) => v.key === key)) {
        layers.value.push({
          name: layer.options?.name,
          visiable: true,
          key,
          _layer: { layer },
        });
      }
    }
  }
  addExistLayers();
  map.on("layeradd", (e) => {
    const _layers = e.target._layers;
    console.log("layeradd", _layers);
    const layer = e.layer;
    const name = layer.options?.name || layer.name;
    if (!name) {
      return;
    }
    if (e.isL7Layer) {
      addL7Layer(layer);
      return;
    }
    for (const key in _layers) {
      if (_layers[key].getScene) {
        // l7图层
        continue;
      }
      if (layer === _layers[key] && !layers.value.find((v) => v.key === key)) {
        layers.value.push({
          name,
          visiable: true,
          key,
          _layer: { layer },
        });
      }
    }
  });
  map.on("layerremove", (e) => {
    const layer = e.layer;
    // const index = layers.value.findIndex((v) => v._layer.layer === layer);
    // if (index >= 0) {
    // layers.value.splice(index, 1);
    // }
  });
}
onMounted(() => {
  nextTick(() => {
    bindControlLayers(self.attrs.map);
  });
});

function handleChangeLayers(val) {
  const map = self.attrs.map;
  if (!map) {
    throw new Error("地图实例不存在");
  }

  const removedLayers = layers.value
    .filter((l) => !val.includes(l.key))
    .map((l) => l._layer.layer);
  const addedLayers = layers.value
    .filter((l) => val.includes(l.key))
    .map((l) => l._layer.layer);
  for (const layer of removedLayers) {
    if (typeof layer.hide === "function") {
      layer.hide();
    } else if (map.hasLayer(layer)) {
      map.removeLayer(layer);
    }
  }
  for (const layer of addedLayers) {
    if (typeof layer.show === "function") {
      layer.show();
    } else if (!map.hasLayer(layer)) {
      map.addLayer(layer);
    }
  }
}
watch(
  () => layers.value,
  (newVal, oldVal) => {
    checkList.value = newVal.map((n) => n.key);
  }
);
</script>
<style scoped lang="scss">
.control-layers {
}
</style>
