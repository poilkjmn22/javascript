<template>
  <a-modal
    :visible="visible"
    @cancel="handleClose"
    @close="handleClose"
    @open="handleOpen"
    width="80%"
  >
    <template #title>更多性能监控信息</template>
    <p v-if="!info || info.length <= 0"> 切换页面后查看图表 </p>
    <div class="modal-content">
      <!-- <Chart -->
      <!--   class="chart-box" -->
      <!--   :options="chartOptionsRoute" -->
      <!--   width="auto" -->
      <!--   height="500px" -->
      <!-- > -->
      <!-- </Chart> -->
      <Chart
        class="chart-box"
        :options="chartOptionsResource"
        width="auto"
        height="600px"
      >
      </Chart>
    </div>
  </a-modal>
</template>
<script setup>
  import { ref, computed } from 'vue';
  import { useBrand, useVars } from '@/hooks/themes';
  import { getRgbStr , niceNumber } from '@/utils/index';
  import { groupBy, minBy, maxBy } from 'lodash-es';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Array,
      default: () => [],
    },
  });

  function handleOpen() {
    // setChartOptionsRoute();
    setChartOptionsResource();
  }
  const { vars } = useVars(['--green-6', '--yellow-6', '--red-6']);
  const colorsVisualMap = Object.values(vars.value).map(getRgbStr);
  let chartOptionsRoute = ref(null);
  function setChartOptionsRoute() {
    const { varsColor: colors } = useBrand('primary');
    console.log(props.info);

    const routeInfo =
      props.info?.reduce((memo, d) => {
        const key = d.metricName;
        const data = JSON.parse(d.data);
        if (key.startsWith('RT-')) {
          memo.push([key.replace(/^RT\-/, ''), data.duration]);
        }
        return memo;
      }, []) || [];
    chartOptionsRoute.value = {
      title: {
        text: '路由首次加载耗时(ms)',
        show: true,
      },
      xAxis: {
        type: 'category',
        data: routeInfo.map((v) => v[0]),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        show: true,
      },
      visualMap: {
        show: true,
        dimension: 1,
        inRange: {
          color: colorsVisualMap,
        },
        min: 0,
        max: maxBy(routeInfo, '1')[1],
      },
      color: colors.value.slice(6),
      series: [
        {
          data: routeInfo.map((v) => v[1]),
          type: 'bar',
          barWidth: 12,
        },
      ],
    };
  }

  let chartOptionsResource = ref(null);
  function setChartOptionsResource() {
    const data = props.info.find((inf) => inf.metricName === 'resourceTiming');
    const resourceInfo = JSON.parse(data?.data) || [];
    // console.log(resourceInfo)
    const schema = [
      {
        name: 'encodedBodySize',
        title: '资源大小(b)',
        text: ['大', '小'],
        type: 'value',
      },
      {
        name: 'routeName',
        title: '完成时页面',
        type: 'category',
      },
      {
        name: 'initiatorType',
        title: '启动器类型',
        type: 'category',
      },
      {
        name: 'duration',
        title: '传输时长(ms)',
        text: ['慢', '快'],
        type: 'value',
      },
    ];
    function buildParallelAxis(schema, info) {
      return schema.map((s, i) => ({
        ...s,
        dim: i,
        name: s.title,
        dataIndex: i,
        min: 0,
        max: s.type === 'value' ? maxBy(info, s.name)[s.name] + 10 : undefined,
      }));
    }
    const parallelAxis = buildParallelAxis(schema, resourceInfo);

    const buildVisualMap = (info, schema, idx) => {
      const s = schema[idx];
      let pos = {};
      if (s.type !== 'value') {
        return undefined;
      }
      if (s.name === 'encodedBodySize') {
        pos = {
          left: 10,
          bottom: 20,
        };
      } else if (s.name === 'duration') {
        pos = {
          right: 10,
          bottom: 20,
        };
      }
      return Object.assign(
        {
          show: true,
          dimension: idx,
          inRange: {
            color: colorsVisualMap,
          },
          min: 0,
          max: maxBy(info, s.name)[s.name],
          text: s.text,
        },
        pos
      );
    };
    chartOptionsResource.value = {
      title: {
        text: '网络资源',
      },
      legend: {
        show: true,
        top: 20,
      },
      tooltip: {
        show: true,
        formatter: (params) => {
          const getNiceNum = (s, v) => {
            if (s.name === 'encodedBodySize') {
              return niceNumber(v, 2, ['b', 'kb', 'mb'], [1024, 1024, 1024]);
            } else if (s.name === 'duration') {
              return niceNumber(v, 2, ['ms', 's', 'min', 'h'], [1000, 60, 60, 60]);
            } else {
              return v;
            }
          };
          return `${params.marker}&nbsp;${params.data[params.data.length - 1]}<br />${schema
            .map((s, i) => `${s.title}：${getNiceNum(s, params.value[i])}`)
            .join('<br />')}`;
        },
      },
      toolbox: {
        feature: {
          dataView: {},
        },
      },
      parallel: {
        left: '5%',
        right: '13%',
        bottom: '10%',
        top: '20%',
        parallelAxisDefault: {
          type: 'value',
          nameLocation: 'end',
          nameGap: 20,
        },
      },
      parallelAxis,
      // color: colors,
      series: {
        type: 'parallel',
        data: resourceInfo.map((d) =>
          schema.map((sc) => d[sc.name]).concat([d.name])
        ),
        lineStyle: {
          width: 2,
        },
      },
      visualMap: schema
        .map((s, i) => buildVisualMap(resourceInfo, schema, i))
        .filter((s) => s !== undefined),
    };
  }

  const emit = defineEmits(['update:visible']);
  function handleClose() {
    emit('update:visible', false);
  }
</script>
<style lang="less" scoped>
  @import 'arcoStyle/theme/global.less';
  .modal-content {
    height: 640px;
    overflow: auto;
  }

  .chart-box {
    border: @border-1 @border-solid @color-border;
    padding: @spacing-8;
    &:not(:last-child) {
      margin-bottom: @spacing-10;
    }
  }
</style>
