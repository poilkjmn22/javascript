<template>
  <a-space class="perf-index" :class="levelClassName">
    <svg-icon :icon-class="iconFontType" :color="iconColor" :size="16" />
    <span class="perf-text">{{ perfText }}</span>
  </a-space>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { num } from '@/utils/reg';
  import { round } from 'lodash-es';
  import { isEqualFloat , niceNumber } from '@/utils/index';
  import { useVars } from '@/hooks/themes';

  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  });

  const enum PerfLevel {
    A,
    B,
    C,
  }
  const MetricRange = {
    LCP: [0, 2500, 4000],
    FID: [0, 100, 300],
    CLS: [0, 0.1, 0.25],
    FCP: [0, 2000, 4000],
    TTFB: [0, 800, 1800],
    TBT: [0, 200, 600],
  };

  let perfValue = computed(() => {
    const v = props.value.match(num);
    return v && v[0];
  });

  let levelClassName = computed(() => {
    const range = MetricRange[props.name];
    let v = perfValue.value;
    let res = undefined;
    if (!range || !v) {
      return res;
    }
    v = parseFloat(v);
    if (isEqualFloat(v, 0)) {
      res = PerfLevel[0];
    }
    range.forEach((r, i) => {
      if (v > r) {
        res = PerfLevel[i];
      }
    });
    return res;
  });

  let perfText = computed(() => {
    const v = perfValue.value;
    if (v === null || v === undefined) {
      return '';
    }
    if (props.name === 'CLS') {
      return round(Number(v), 2);
    }
    return niceNumber(v);
  });

  const iconFontTypeList = {
    [PerfLevel[0]]: 'circle',
    [PerfLevel[1]]: 'square',
    [PerfLevel[2]]: 'triangle',
  };
  const { vars } = useVars(['--red-6', '--yellow-6', '--green-6']);
  const varsColor = {
      [PerfLevel[0]]: vars['--green-6'],
      [PerfLevel[1]]: vars['--yellow-6'],
      [PerfLevel[2]]: vars['--red-6'],
  }
  const iconFontType = computed(
    () => iconFontTypeList[levelClassName.value]
  );
  const iconColor = computed(
    () => varsColor[levelClassName.value]
  );
</script>
<style lang="less" scoped>
  .perf-index {
    font-weight: bold;
    &.A {
      color: rgb(var(--green-6));
    }
    &.B {
      color: rgb(var(--yellow-6));
    }
    &.C {
      color: rgb(var(--red-6));
    }
  }
</style>
