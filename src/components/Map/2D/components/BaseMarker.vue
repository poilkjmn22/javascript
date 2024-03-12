<template>
  <div class="anchor">
    <div :class="labelPosition + '-marker'">
      <span class="text">{{ name }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "张坊",
  },
  labelPosition: {
    type: String,
    default: "top",
  },
});
</script>
<style scoped lang="scss">
.anchor {
  position: relative;
  height: 0;
  width: 0;
  .top-marker {
    width: 92px;
    height: 99px;
    position: absolute;
    bottom: -10px;
    left: -46px;
    background: url("~@/assets/map/label-bg-2.png") no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      margin-top: 6px;
      color: #fff;
      text-shadow: 0px 0px 6px rgba(254, 231, 60, 0.39);
      font-family: Source Han Sans SC;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1.28px;
      cursor: pointer;
    }
  }
  .right-marker {
    width: 218px;
    height: 34px;
    position: absolute;
    top: -17px;
    left: -10px;
    background: url("~@/assets/map/label-bg-4.png") no-repeat;
    display: flex;
    align-items: center;
    padding-left: 73px;
    .text {
      color: #fff;
      text-shadow: 0px 0px 6px rgba(254, 231, 60, 0.39);
      font-family: Source Han Sans SC;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1.28px;
      cursor: pointer;
    }
  }
  .left-marker {
    width: 218px;
    height: 34px;
    position: absolute;
    top: -17px;
    right: -10px;
    background: url("~@/assets/map/label-bg-1.png") no-repeat;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 73px;
    .text {
      color: #fff;
      text-shadow: 0px 0px 6px rgba(254, 231, 60, 0.39);
      font-family: Source Han Sans SC;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 1.28px;
      cursor: pointer;
    }
  }
}
</style>
