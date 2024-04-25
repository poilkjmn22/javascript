<template>
  <div class="building">
    <QueryForm :searchItems="searchItems" :model="model"> </QueryForm>
    <div class="table-rel">
      <Legend :list="perfIndexLegend" title="评分"
        ><template #label>
          <a-space
            direction="horizontal"
            style="cursor: pointer"
            @click="openPerfStand = true"
            ><span>性能评分</span><icon-info-circle
          /></a-space> </template
      ></Legend>
    </div>
    <QueryTable
      ref="queryTableRef"
      :queryMethod="getPageList"
      :queryParams="queryParams"
      :columns="columns"
    >
      <template #site="{ record }">
        {{getSite(record.storageKey)}}
      </template>
      <template #operate="{ record }">
        <a-space>
          <a-button @click="handleView(record)" type="text">更多</a-button>
          <a-button @click="handleDelete(record)" type="text" status="danger"
            >删除</a-button
          >
        </a-space>
      </template>
      <template #perfIndex="{ record, column }">
        <PerfIndex
          :name="column.metricName"
          :value="record[column.dataIndex]"
        />
      </template>
    </QueryTable>
    <RouteAna
      v-model:visible="viewRouteAna"
      :info="routeAnaInfo"
      @update:visible="viewRouteAna = false"
    ></RouteAna>

    <a-modal v-model:visible="openPerfStand" width="50vw">
      <PerfStand> </PerfStand>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, watch, h } from 'vue';
  import { Message, Tooltip, Space } from '@arco-design/web-vue';
  import { IconInfoCircle } from '@arco-design/web-vue/es/icon';
  import * as frontStorage from '@/api/frontStorage.js';
  import dayjs from 'dayjs';
  import { sortBy, reduce } from 'lodash-es';
  import { genFormModel } from '@/utils/index';
  import RouteAna from './RouteAna.vue';
  import QueryForm from '@/components/basic/queryForm.vue';
  import QueryTable from '@/components/basic/queryTable.vue';
  import { useQueryParams } from '@/hooks';
  import PerfIndex from './PerfIndex.vue';
  import Legend from './Legend.vue';
  import PerfStand from './PerfStand.vue';
  import { useVars, getRgbStr } from '@/hooks/themes';
  import { urlNoExtra } from '@/utils/reg';

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
          console.log(crows);
          r({
            code,
            rows: crows,
            total,
          });
        });
    });
  };

  function getSite(urlFull) {
    const match = urlFull?.match(urlNoExtra);
    return  match ? match[0] : urlFull;
  }
  // 列
  function renderTooltip(title, content) {
    return h(Tooltip, { content, position: 'rt' }, [
      h(Space, { direction: 'horizontal' }, [
        h('span', { innerHTML: title }),
        h(IconInfoCircle, { size: 16 }),
      ]),
    ]);
  }
  const columns = [
    {
      dataIndex: 'none',
      slotName: 'site',
      title: '网站',
      ellipsis: true,
      tooltip: true,
      width: 220,
    },
    {
      dataIndex: 'largestContentfulPaint',
      title: () =>
        renderTooltip(
          'LCP',
          '最大内容绘制时间，发生在浏览器的视窗完全加载时。视区之外的其他内容可能仍在加载中，但LCP是当用户感到页面是可见时。【服务端渲染可显著提高LCP评级】'
        ),
      metricName: 'LCP',
    },
    {
      dataIndex: 'firstInputDelay',
      title: () =>
        renderTooltip(
          'FID',
          'First Input Delay 是「首次输入延迟时间」，计算使用者第一次与网页互动（例如点击连结或按钮、打开式下拉选单、在文字对话框输入文字等) 时的延迟时间。这项指标代表了网页的互动与回应程度：在使用者尝试与网页互动时，网页是否能马上回应。'
        ),
      metricName: 'FID',
    },
    {
      dataIndex: 'cumulativeLayoutShift',
      title: () =>
        renderTooltip(
          'CLS',
          '累积布局偏移，是衡量网页的跳跃性或视觉稳定性的指标。如果应用程序在页面加载期间插入的页面元素影响到其他内容的位置，就会影响CLS指标。CLS是加载过程中移动的页面的比例。'
        ),
      metricName: 'CLS',
    },
    {
      dataIndex: 'firstContentfulPaint',
      title: () =>
        renderTooltip(
          'FCP',
          '首个内容绘制时间，浏览器开始渲染内容所花费的时间。FCP指标将显著影响用户对性能的感知。在FCP之前，用户只能看到一个空白的屏幕。'
        ),
      metricName: 'FCP',
    },
    {
      dataIndex: 'timeToFirstByte',
      title: () =>
        renderTooltip(
          'TTFB',
          'TTFB 是 Time To First Byte的缩写，是指从访客打开网站页面到网页内容开始呈现之间的等待时间。TTFB时间由三个部分组成：1. 浏览器发送HTTP请求所花费的时间 2. 服务器处理请求所花费的时间 3. 服务器将响应的第一个字节发送回浏览器所花费的时间'
        ),
      metricName: 'TTFB',
    },
    {
      dataIndex: 'totalBlockingTime',
      title: () =>
        renderTooltip(
          'TBT',
          '总阻塞时间，是FCP和TTI之间发生的所有阻塞任务的总时长。阻塞任务是任何超过50ms的任务，肉眼所见会让人感觉卡住了。TBT通常通过运行更少的js代码或减少DOM的操作次数而得到改进，代码分割可能很有效。'
        ),
      metricName: 'TBT',
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
      dataIndex: 'none',
      slotName: 'operate',
    },
  ].map((c) =>
    Object.assign(
      c,
      !['site', 'createTime', 'none', 'undefined'].includes(c.dataIndex)
        ? { slotName: 'perfIndex' }
        : {}
    )
  );

  const { vars } = useVars(['--red-6', '--yellow-6', '--green-6']);
  const varsColor = Object.values(vars.value);
  const perfIndexLegend = computed(() => {
    return [
      { text: '0-49', iconType: 'triangle' },
      { text: '50-89', iconType: 'square' },
      { text: '90-100', iconType: 'circle' },
    ].map((d, i) => Object.assign(d, { iconColor: getRgbStr(varsColor[i]) }));
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

  let openPerfStand = ref(false);
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
