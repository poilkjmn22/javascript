<template>
  <div class="toolbar-list-wrapper" :style="{ ...posStyle }" v-if="toolbarList.length > 0">
    <div :class="{[ props.direction ]: true}" class="toolbar-list">
      <div
        class="toolbar-list-item"
        :title="item.title"
        v-for="(item, i) in toolbarList"
        :key="i"
      >
        <component :is="item.component" v-bind="$attrs"></component>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "@vue/composition-api";
import ResetMap from "./ResetMap";
import ControlLayers from "./ControlLayers";
import LocateMap from "./LocateMap";

const props = defineProps({
  position: {
    type: String,
    default: "right top",
  },
  margin: {
    type: [Number, Array],
    default: () => [20, 20, 20, 20],
  },
  items: {
    type: String, // 'home,controlLayers,...'
    default: "",
  },
  direction: {
    type: String, // 'home,controlLayers,...'
    default: "horizontal", // enum: horizontal,vertical
  },
});
const posList = ["top", "right", "bottom", "left"];

const posStyle = computed(() => {
  const obj = {};
  const pos = (props.position || "top right").split(" ");
  for (const p of pos) {
    const idx = posList.findIndex((d) => d === p);
    obj[p] = `${props.margin[idx]}px`;
  }
  return obj;
});

const toolbarPresets = ref([
  {
    name: "resetMap",
    title: "地图复位",
    component: ResetMap,
  },
{
    name: "controlLayers",
    title: "图层管理",
    component: ControlLayers,
  },
{
    name: "locateMap",
    title: "打点定位",
    component: LocateMap,
  }
]);

const toolbarList = computed(() => {
  if (!props.items) {
    return [];
  }
  const nameList = props.items
    .split(",")
    .map((s) => String.prototype.trim.call(s));
  return toolbarPresets.value.filter((v) => nameList.includes(v.name));
});
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/common/color-dark";
@import "~@/assets/styles/mixin";

$size: 30px;
$mainPadding: 10px;
$itemGap: 6px;
.toolbar-list-wrapper {
  position: absolute;
  width: auto;
  height: auto;
  z-index: 999;
  cursor: auto;
}
.toolbar-list {
  padding: $mainPadding;
  border: 1px solid $white-4;
  border-radius: 6px;
  background: $bg-white-1;
  color: $white-1;
  font-size: 14px;
  display: flex;
  &.horizontal {
    flex-direction: row;
    .toolbar-list-item + .toolbar-list-item {
      margin-left: $itemGap;
    }
  }
  &.vertical {
    flex-direction: column;
    .toolbar-list-item + .toolbar-list-item {
      margin-top: $itemGap;
    }
  }
}
.toolbar-list-item {
  width: $size;
  height: $size;
  overflow: hidden;
  @extend .center-xy;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    border-color: $blue-4;
    transition: border-color 0.3s ease;
  }
}
</style>
