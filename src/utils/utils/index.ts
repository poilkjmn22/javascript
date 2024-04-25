type TargetContext = '_self' | '_parent' | '_blank' | '_top';
import {Ref, isRef} from 'vue';
import {round, memoize, cloneDeep} from 'lodash-es';
import {rgb, hex} from '@/utils/reg';

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

export function walkTreeData(treeData: any[], cb: Function, opts = {childrenProp: 'children', topLevel: 1}) {
  const {childrenProp, topLevel } = opts;
  function walk(nodes: any, parent: any, level = 0) {
    if (!nodes) {
      return
    }
    let i = 0;
    for(const n of nodes) {
      walk(n[childrenProp], n, level + 1)
      cb(n, parent, level, i++)
    }
  }
  walk(treeData, null, topLevel)
}

export function walkTreeDataBfs(
  treeData: any[],
  cb: Function,
  opts = { childrenProp: 'children', topLevel: 1 }
) {
  const { childrenProp, topLevel } = opts;
  treeData.forEach((t, i) => {  t.level = topLevel; t.i = i });
  const queue = [...treeData]
  let tmp: any = undefined;
  const parentMap = new Map();
  while ((tmp = queue.shift())) {
    cb(tmp, parentMap.get(tmp), tmp.level, tmp.i);
    if (tmp[childrenProp]) {
      tmp[childrenProp].forEach((t, i) => {
        t.level = tmp.level + 1;
        // t.parent = tmp;
        parentMap.set(t, tmp);
        t.i = i;
      })
      queue.push(...tmp[childrenProp])
    }
  }
}

export function filterTreeData(
  treeData: any[],
  cb: Function,
  opts = { childrenProp: 'children', topLevel: 1 }
) {
  const { childrenProp, topLevel } = opts;
  treeData.forEach((t, i) => {  t.level = topLevel; t.i = i });
  const queue = [...treeData]
  let tmp: any = undefined;
  const res: any[] = [];
  const parentMap = new Map();
  while ((tmp = queue.shift())) {
    if(cb(tmp,parentMap.get(tmp),tmp.level, tmp.i) === true) {
      res.push(tmp);
    };
    if (tmp[childrenProp]) {
      tmp[childrenProp].forEach((t, i) => {
        t.level = tmp.level + 1;
        parentMap.set(t, tmp);
        t.i = i;
      })
      queue.push(...tmp[childrenProp])
    }
  }
  return res;
}
export function filterTreeDataToTree(
  treeData: any[],
  cb: Function,
  opts = { childrenProp: 'children', topLevel: 1 }
) {
  const { childrenProp, topLevel } = opts;
  const res = {children: cloneDeep( treeData )};
  function walk(nodes: any, parent: any, level = 0) {
    if (!nodes) {
      return
    }
    let i = 0;
    for(const n of nodes) {
      walk(n[childrenProp], n, level + 1)
      n[childrenProp] = n[childrenProp]?.filter(c => c.hasFilter || cb(c) === true)
      n.hasFilter = n[childrenProp]?.length > 0;
    }
  }
  walk(res.children, res, topLevel)
  return res.children.filter(c => c.hasFilter || cb(c) === true);
}

export function findTreeData(treeData: any[], cb: Function, opts = {childrenProp: 'children', topLevel: 1}) {
  const {childrenProp, topLevel } = opts;
  let res: any = undefined;
  let flag = false;
  function walk(nodes: any, parent: any, level = 0) {
    if (!nodes) {
      return
    }
    let i = 0;
    for(const n of nodes) {
      if(cb(n, parent, level, i++) === true && flag === false) {
        flag = true;
        res = n;
      }
      walk(n[childrenProp], n, level + 1)
    }
  }
  walk(treeData, null, topLevel)
  return res;
}

export function findTreeDataBfs(
  treeData: any[],
  cb: Function,
  opts = { childrenProp: 'children', topLevel: 1 }
) {
  const { childrenProp, topLevel } = opts;
  treeData.forEach((t, i) => {  t.level = topLevel; t.i = i });
  const queue = [...treeData]
  let tmp: any = undefined;
  let res: any = undefined;
  const parentMap = new Map();
  while ((tmp = queue.shift())) {
    if(cb(tmp, parentMap.get(tmp), tmp.level, tmp.i) === true) {
      res = tmp;
      break;
    };
    if (tmp[childrenProp]) {
      tmp[childrenProp].forEach((t, i) => {
        t.level = tmp.level + 1;
        parentMap.set(t, tmp);
        t.i = i;
      })
      queue.push(...tmp[childrenProp])
    }
  }
  return res;
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

// DOM
export function findParentByClass(el: any, className: string) {
 let t:any = el?.parentNode;
 while (t) {
   if (t.classList?.contains(className)) {
     break;
   }
   t = t.parentNode;
 }
 return t;
}

export function observeEle(target: any, cb: Function, config = {attributes: true}) {
  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      cb(target, mutation)
    }
  }
  const observer = new MutationObserver(callback);
  observer.observe(target, config);
}

// DOM end

export function convertBoolean(obj: any, keys: string[], emptyVal = true) {
  const tmp = {};
  for(const k of keys) {
    tmp[k] = k in obj ? ( obj[k] == 1 ? true : false ) : emptyVal;
  }
  return {...obj, ...tmp}
}

export const EmptyVals = [null, undefined, NaN];
export function convertEmpty(obj: any, emptyVals = EmptyVals, emptyVal = '--') {
  const tmp = {};
  for(const k in obj) {
    tmp[k] = emptyVals.includes(obj[k])? emptyVal: obj[k];
  }
  return { ...tmp}
}

export function colorRgb(data: string) {
    // 16进制颜色值的正则 
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写 
    let color = data.toLowerCase();
    if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff 
        if (color.length === 4) {
            let colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB 
        let colorChange: number[] = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgb(" + colorChange.join(",") + ",1)";
    } else { return color; }
}

export function getColorFormat(data: string) {
  if (hex.test(data)) {
    return 'hex'
  } else if (rgb.test(data)) {
    return 'rgb'
  }
  return '';
}

// export async function memoizeImport(src: string) {
  // const cache = new Map();
  // const key = src;
  // if (!cache.has(key)) {
    // const module = await import(src);
    // cache.set(key, module)
  // }
  // return cache.get(key);
// }

export function getArr(arr: any[], idx: number) {
  return arr[idx % arr.length];
}

// 对数组进行版本更新，有一些旧值需要保留
export function updateArrVersion(oldArr: any[], newArr: any[], key: string) {
  const oldMap = new Map(oldArr.map(a => [a[key], a]))
  const newMap = new Map(newArr.map(a => [a[key], a]))
  for(const [k, v] of newMap) {
    const o = oldMap.get(k);
    if (o) {
      newMap.set(k, o);
    }
  }
  return [ ...newMap.values() ];
}
