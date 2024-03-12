<template>
  <a-space class="legend-list" size="large">
    <a-space
      v-for="(item, idx) in list"
      :key="`legendItem${idx}`"
      class="legend-list-item"
      >
        <icon-font :fill="item.iconColor"  :type="`icon-${item.iconType}`" :size="16" />
        <span class="legend-text">{{ item.text }}</span>
      
    </a-space>
  </a-space>
</template>
<script lang="ts" setup>
  defineProps({
    list: {
      type: Array,
      default: () => [],
    },
  });
</script>
<style lang="less" scoped>
.legend-list {
  display: inline-flex;
  color: rgb(var(--gray-10));
}
</style>
