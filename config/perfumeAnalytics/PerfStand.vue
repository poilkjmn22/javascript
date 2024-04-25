<template>
  <a-table :columns="columns" :data="data" :pagination="false" />
</template>

<script setup>
  import { reactive } from 'vue';
  const columns = [
    {
      title: 'Web Vitals',
      dataIndex: 'webVital',
    },
    {
      title: '0-49',
      dataIndex: 'poor',
    },
    {
      title: '50-89',
      dataIndex: 'improvement',
    },
    {
      title: '90-100',
      dataIndex: 'good',
    },
  ];
  const data = reactive([
    {
      key: '1',
      webVital: 'Time to First Byte (TTFB)',
      good: '0-800',
      improvement: '801-1800',
      poor: 'Over 1800',
    },
    {
      key: '2',
      webVital: 'Redirect Time (RT)',
      good: '0-100',
      improvement: '101-200',
      poor: 'Over 200',
    },
    {
      key: '3',
      webVital: 'First Contentful Paint (FCP)',
      good: '0-2000',
      improvement: '2001-4000',
      poor: 'Over 4000',
    },
    {
      key: '4',
      webVital: 'Largest Contentful Paint (LCP)',
      good: '0-2500',
      improvement: '2501-4000',
      poor: 'Over 4000',
    },
    {
      key: '5',
      webVital: 'First Input Delay (FID)',
      good: '0-100',
      improvement: '101-300',
      poor: 'Over 300',
    },
    {
      key: '6',
      webVital: 'Cumulative Layout Shift (CLS)',
      good: '0-0.1',
      improvement: '0.11-0.25',
      poor: 'Over 0.25',
    },
    {
      key: '7',
      webVital: 'Interaction to Next Paint (INP)',
      good: '0-200',
      improvement: '201-500',
      poor: 'Over 500',
    },
    {
      key: '8',
      webVital: 'Total Blocking Time (TBT)',
      good: '0-200',
      improvement: '201-600',
      poor: 'Over 600',
    },
    {
      key: '9',
      webVital: 'Navigation Total Blocking Time (NTBT)',
      good: '0-200',
      improvement: '201-600',
      poor: 'Over 600',
    },
  ]);
</script>
<style lang="less" scoped></style>
