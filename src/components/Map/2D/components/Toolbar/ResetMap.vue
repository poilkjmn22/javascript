<template>
  <div class="reset-map-wrapper" @click="resetMap">复位</div>
</template>
<script setup>
import { getCurrentInstance , inject, provide} from "@vue/composition-api";
const self = getCurrentInstance();

console.log(provide)
const props = defineProps({
  center: {
    type: Array,
    default() {
      return [39.53264411091661, 115.59471130371095];
    },
  },
  zoom: {
    type: Number,
    default: 6,
  },
});

function resetMap() {
  const map = self.attrs.map;
  if (map.mapService) {
    map.setZoomAndCenter(
      map.mapService.config?.zoom,
      map.mapService.config?.center
    );
  } else if (map.setView) {
    map.setView(
      map.options?.center || props.center,
      map.options?.zoom || props.zoom
    );
  }
}
</script>
<style lang="scss" scoped></style>
