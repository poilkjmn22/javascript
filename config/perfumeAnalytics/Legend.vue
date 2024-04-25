<template>
  <a-space class="legend-list" size="large">
    <div class="label"><slot name="label">{{title}}</slot></div>
    <a-space class="content" layout="horizontal">
      <a-space
        v-for="(item, idx) in list"
        :key="`legendItem${idx}`"
        class="legend-list-item"
        layout="horizontal"
      >
        <svg-icon
          :color="item.iconColor"
          :icon-class="item.iconType"
          :size="16"
        />
        <span class="legend-text">{{ item.text }}</span>
      </a-space>
    </a-space>
  </a-space>
</template>
<script setup>
  defineProps({
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  });
</script>
<style lang="less" scoped>
  .legend-list {
    display: inline-flex;
    color: rgb(var(--gray-10));
  }
</style>
