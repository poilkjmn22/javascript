<template>
  <div class="locate-map-wrapper">
    <el-popover trigger="hover">
      <span class="el-dropdown-link" slot="reference">点位</span>
      <div class="">
        <ObjDetail :obj="info" :fields="infoFields" :col="1"> </ObjDetail>
        <el-form :model="form" inline>
          <el-form-item label="定位" prop="lnglat">
            <el-input v-model="form.lnglat" />
            <span
              ><svg-icon @click="handleLocateMap" icon-class="guide"> </svg-icon
            ></span>
          </el-form-item>
        </el-form>
      </div>
    </el-popover>
  </div>
</template>
<script setup>
import {
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
} from "@vue/composition-api";
import ObjDetail from "@/components/ObjDetail";

const self = getCurrentInstance();

let info = ref({});
let infoFields = ref([["latlng", "经纬度"]]);

let form = ref({
  lnglat: "",
});

function handleLocateMap() {
  const lnglatStr = form.value.lnglat;
  if (/\d+(\.\d+)?,\d+(\.\d+)?/.test(lnglatStr)) {
    const lnglat = lnglatStr.split(",").map(parseFloat);
    self.attrs.map.flyTo(lnglat);
  }
}
onMounted(() => {
  nextTick(() => {
    let mapProxy = self.attrs.map;
    if (mapProxy.mapService) {
      mapProxy = mapProxy.mapService.map;
    }
    mapProxy.on("click", (e) => {
      console.log(e)
      info.value = e;
    });
  });
});
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__content {
  display: inline-flex;
}
</style>
