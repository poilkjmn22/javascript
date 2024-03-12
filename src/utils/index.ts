type TargetContext = '_self' | '_parent' | '_blank' | '_top';
import {Ref, isRef} from 'vue';
import {round} from 'lodash-es';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

export default null;

export function getImageUrl(name: String) {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}

export function getRgbStr(c: String) {
  return `rgb(${c})`;
}

export function genId() {
  return Math.random().toString();
}

export function genFormModel(items: Ref<any[]> | any[], propKey = "prop") {
  const val = isRef(items) ? items.value : items;
  return val.reduce((res, it) => {
    it[propKey] && (res[it[propKey]] = it.fmDefaultValue || undefined);
    return res;
  }, {});
}

export function isEqualFloat(a: number,b: number, epsilon = Number.EPSILON) {
  return Math.abs( a - b ) <= epsilon;
}

export function niceNumber(num: string | number,precision = 2, units = ['ms', 's'], unitStep = [ 1000, 60 ]) {
  let n = Number(num);
  let curr = 0;
  while(n >= unitStep[curr]) {
    n = n / unitStep[curr++]
  }
  return `${round(n, precision)} ${units[curr]}`
}
