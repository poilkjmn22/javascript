<template>
  <div class="building">
    <QueryForm :searchItems="searchItems" :model="model"> </QueryForm>
    <div class="table-rel">
      <Legend :list="perfIndexLegend"> </Legend>
    </div>
    <QueryTable
      ref="queryTableRef"
      :queryMethod="getPageList"
      :queryParams="queryParams"
      :columns="columns"
    >
      <template #operate="{ record }">
        <a-space>
          <a-button @click="handleView(record)">更多</a-button>
          <a-button @click="handleDelete(record)">删除</a-button>
        </a-space>
      </template>
      <template #perfIndex="{ record, column }">
        <PerfIndex :name="column.title" :value="record[column.dataIndex]" />
      </template>
    </QueryTable>
    <RouteAna
      :visible.sync="viewRouteAna"
      :info="routeAnaInfo"
      @update:visible="viewRouteAna = false"
    ></RouteAna>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import * as frontStorage from '@/api/frontStorage.js';
  import dayjs from 'dayjs';
  import { sortBy, reduce } from 'lodash-es';
  import { genFormModel } from '@/utils/index';
  import RouteAna from './RouteAna.vue';
  import QueryForm from '@/components/Basic/queryForm.vue';
  import QueryTable from '@/components/Basic/queryTable.vue';
  import { useQueryParams } from '@/hooks';
  import PerfIndex from './PerfIndex.vue';
  import Legend from './Legend.vue';
  import { useVars } from '@/hooks/themes';

  const searchItems = [
    {
      field: 'time',
      label: '分析时间：',
      componentType: 'rangePicker',
    },
    {
      label: '查询',
      componentType: 'button',
      type: 'primary',
      onClick: () => {
        onSearch();
      },
    },
    {
      label: '重置',
      componentType: 'button',
      onClick: () => {
        onReset();
      },
    },
  ];
  const model = ref(genFormModel(searchItems));
  const { queryParams, onSearch, onReset } = useQueryParams(model, (v) => {
    if (v.time?.length === 2) {
      v.startdate = dayjs(v.time[0]).format('YYYY-MM-DD 00:00:00');
      v.enddate = dayjs(v.time[1]).format('YYYY-MM-DD 00:00:00');
      delete v.time;
    }
    return v;
  });

  const getPageList = (params) => {
    return new Promise((r) => {
      frontStorage
        .list(Object.assign(params, { remark: 'perfumeAnalytics' }))
        .then(({ code, rows, total }) => {
          const crows = sortBy(
            rows,
            (d) => dayjs(d.createTime).valueOf() * -1
          ).map((r) => {
            try {
              const v = JSON.parse(r.storageValue);
              const row = v.reduce(
                (memo, d) => {
                  d.metricName !== 'resourceTiming' &&
                    (memo[d.metricName] = d.data); // resourceTiming量太大
                  return memo;
                },
                { ...r }
              );
              return row;
            } catch (e) {
              console.error(e);
            }
            return r;
          });
          // console.log(crows);
          r({
            code,
            rows: crows,
            total,
          });
        });
    });
  };

  // 列
  const columns = [
    {
      dataIndex: 'storageKey',
      title: '网站',
      ellipsis: true,
      tooltip: true,
      width: 80,
    },
    {
      dataIndex: 'largestContentfulPaint',
      title: 'LCP',
    },
    {
      dataIndex: 'firstInputDelay',
      title: 'FID',
    },
    {
      dataIndex: 'cumulativeLayoutShift',
      title: 'CLS',
    },
    {
      dataIndex: 'firstContentfulPaint',
      title: 'FCP',
    },
    {
      dataIndex: 'timeToFirstByte',
      title: 'TTFB',
    },
    {
      dataIndex: 'totalBlockingTime',
      title: 'TBT',
    },
    // {
    // dataIndex: 'navigationTiming',
    // title: 'NT',
    // ellipsis: true,
    // tooltip: true,
    // width: 80,
    // },
    // {
    // dataIndex: 'dataConsumption',
    // title: 'DC',
    // ellipsis: true,
    // tooltip: true,
    // width: 80,
    // },
    // {
    // dataIndex: 'interactionToNextPaint',
    // title: 'ITNP',
    // },
    // {
    // dataIndex: 'networkInformation',
    // title: 'NI',
    // ellipsis: true,
    // tooltip: true,
    // width: 80,
    // },
    {
      dataIndex: 'createTime',
      title: '分析时间',
    },
    {
      title: '操作',
      slotName: 'operate',
    },
  ].map((c) =>
    Object.assign(
      c,
      !['网站', '分析时间', '操作'].includes(c.title)
        ? { slotName: 'perfIndex' }
        : {}
    )
  );

  const { varsColor } = useVars(['--red-6', '--yellow-6', '--green-6']);
  const perfIndexLegend = computed(() => {
    return [
      { text: '0-49', iconType: 'triangle' },
      { text: '50-89', iconType: 'square' },
      { text: '90-100', iconType: 'circle' },
    ].map((d, i) => Object.assign(d, { iconColor: varsColor.value[i] }));
  });

  let viewRouteAna = ref(false);
  let routeAnaInfo = ref(null);
  function handleView(row) {
    console.log('view', row);
    viewRouteAna.value = true;
    routeAnaInfo.value = JSON.parse(row.storageValue);
  }
  async function handleDelete(row) {
    await frontStorage.del({ storageKey: row.storageKey });
    Message.success('删除成功');
    onSearch();
  }
</script>
<style lang="less" scoped>
  .building {
    padding: 18px;
  }
  .table-rel {
    text-align: right;
    margin: var(--spacing-8) 0;
  }
</style>
