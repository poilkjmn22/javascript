import { initPerfume, start, end } from 'perfume.js';
import { genId } from '@/utils/index.ts';
import { debounce, sortBy, pick, merge, cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import * as frontStorage from '@/api/frontStorage.js';
import router from '@/router';
function genPaId() {
  return `${window.location.origin}-${genId()}`;
}
const Fs = {
  createBy: '',
  createTime: '',
  params: {},
  remark: '',
  storageKey: '',
  storageValue: '',
  updateBy: '',
  updateTime: '',
};
class FrontStorage {
  constructor(data) {
    for (const k in Fs) {
      this[k] = data[k] || Fs[k];
    }
  }
}

const defaultOptions = { maxResSize: 10 };

class PerfumeAnalytics {
  constructor(key = '', options = {}) {
    this.options = merge(cloneDeep(defaultOptions), options);
    this.logs = [];
    this.resourceTiming = [];
    this.key = key || genPaId();
    this.debounceReport = debounce(this.report, 3000);

    this.routeAnas = [];
  }
  track(metricName, data) {
    if (metricName !== 'resourceTiming') {
      this.logs.push({ metricName, data: JSON.stringify(data) });
    } else {
      const { duration: obj } = data;
      // console.log(obj, performance.now());
      const trackInfo = Object.assign(
        pick(obj, [
          'name',
          // 'transferSize',
          'encodedBodySize',
          // 'decodedBodySize',
          'duration',
          'initiatorType',
          'startTime',
        ]),
        {
          name: new URL(obj.name).pathname,
          routeName: document.title,
        }
      );
      const isExist = this.resourceTiming.find(
        (r) => r.name === trackInfo.name
      );
      if (isExist || /\/(dev|prod)-api\//.test(obj.name)) {
        return;
      }
      this.resourceTiming.push(trackInfo);
      this.resourceTiming.sort((a, b) => b.duration - a.duration);
      this.resourceTiming.splice(this.options.maxResSize);
    }
    // console.log(metricName, this.key);
    // console.dir(data);
    // console.log('!!!!!!!!');
    this.debounceReport();
    // if (this.logs.length === this.metricNames.length) {
    // console.table(this.logs);
    // }
  }
  async report() {
    if (router.currentRoute.value.path === '/login') {
      return;
    }
    try {
      const { data: detail } = await frontStorage.detail({
        storageKey: this.key,
      });
      const fs = new FrontStorage({
        storageKey: this.key,
        storageValue: JSON.stringify(
          this.logs.concat([
            {
              metricName: 'resourceTiming',
              data: JSON.stringify(this.resourceTiming),
            },
          ])
        ),
        remark: 'perfumeAnalytics',
      });
      if (detail) {
        fs.updateTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
        await frontStorage.update(fs);
      } else {
        fs.createTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
        fs.updateTime = fs.createTime;
        await frontStorage.add(fs);
        PerfumeAnalytics.clearTooMany();
      }
    } catch (e) {
      console.error(e);
    }
  }
  init() {
    const myAnalyticsTool = this;
    initPerfume({
      resourceTiming: true,
      analyticsTracker: (options) => {
        const {
          attribution,
          metricName,
          data,
          navigatorInformation,
          rating,
          navigationType,
        } = options;
        // myAnalyticsTool.track(metricName, data);
        switch (metricName) {
          case 'navigationTiming':
            if (data && data.timeToFirstByte) {
              myAnalyticsTool.track('navigationTiming', data);
            }
            break;
          case 'networkInformation':
            if (data && data.effectiveType) {
              myAnalyticsTool.track('networkInformation', data);
            }
            break;
          case 'storageEstimate':
            myAnalyticsTool.track('storageEstimate', data);
            break;
          case 'TTFB':
            myAnalyticsTool.track('timeToFirstByte', { duration: data });
            break;
          case 'RT':
            myAnalyticsTool.track('redirectTime', { duration: data });
            break;
          case 'FCP':
            myAnalyticsTool.track('firstContentfulPaint', { duration: data });
            break;
          case 'FID':
            myAnalyticsTool.track('firstInputDelay', { duration: data });
            break;
          case 'LCP':
            myAnalyticsTool.track('largestContentfulPaint', { duration: data });
            break;
          case 'CLS':
            myAnalyticsTool.track('cumulativeLayoutShift', { value: data });
            break;
          case 'INP':
            myAnalyticsTool.track('interactionToNextPaint', { value: data });
            break;
          case 'TBT':
            myAnalyticsTool.track('totalBlockingTime', { duration: data });
            break;
          case 'elPageTitle':
            myAnalyticsTool.track('elementTimingPageTitle', { duration: data });
            break;
          case 'userJourneyStep':
            myAnalyticsTool.track('userJourneyStep', {
              duration: data,
              stepName: attribution.step_name,
              vitals_score: rating,
            });
            break;
          default:
            myAnalyticsTool.track(metricName, { duration: data });
            break;
        }
      },
    });

  }
  buildRouteMetricName(route, prefix = 'RT-') {
    const title = route?.matched?.map((m) => m.meta?.title).filter((t) => !!t);
    if (!title || title.length <= 0) {
      // return undefined;
      return '首页';
    }
    return `${prefix}${title.join('/')}`;
  }
  beforeRoute(route) {
    const name = this.buildRouteMetricName(route);
    if (!name) {
      return;
    }
    const rai = this.routeAnas.findIndex((r) => r.name === name);
    const ra = { name, duration: 0, type: 'routeEnter' };
    if (rai < 0) {
      this.routeAnas.push(ra);
      start(name);
    }
  }
  afterRoute(route) {
    const name = this.buildRouteMetricName(route);
    if (!name) {
      return;
    }
    const ra = this.logs.find((r) => r.metricName === name);
    !ra && end(name);
  }
  static mark(name, exec) {
    start(name);
    exec();
    end(name);
  }
  static async clearTooMany() {
    const MaxCount = 100;
    const { rows, total } = await frontStorage.list({
      remark: 'perfumeAnalytics',
      pageSize: MaxCount,
    });
    const list = sortBy(rows, (d) => dayjs(d.createTime).valueOf() * -1);
    if (total > MaxCount) {
      // console.log(list);
      // for (let i = 0; i < ( MaxCount / 2 ); i++) {
      frontStorage.del({ storageKey: list[list.length - 1].storageKey });
      // }
    }
  }
}

export default PerfumeAnalytics;
