export function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
export function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}

export function isFunction(value) {
  return Object.prototype.toString.call(value) === "[object Function]";
}

export function deepClone(data) {
  if (isArray(data)) {
    return data.map(deepClone);
  } else if (isObject(data)) {
    return Object.keys(data).reduce(function (o, k) {
      o[k] = deepClone(data[k]);
      return o;
    }, {});
  } else {
    return data;
  }
}

export function getKey(data, key) {
  if (isString(key) && key) {
    return data[key];
  } else if (isFunction(key)) {
    return key(data);
  } else {
    return data;
  }
}

export function keyBy(arr, iteratee) {
  let _identity = iteratee;
  if (isString(iteratee)) {
    _identity = (d) => d[iteratee];
  }
  if (!isArray(arr)) {
    throw new Error("参数错误：arr应为数组");
  }
  if (!isFunction(_identity)) {
    throw new Error("参数错误：iteratee应为函数");
  }
  return arr.reduce((res, d) => {
    res[_identity(d)] = d;
    return res;
  }, {});
}

export function omit(obj, props) {
  let omits = [];
  if (isString(props)) {
    omits.push(props);
  } else if (isArray(props)) {
    omits = props;
  }
  const res = {};
  for (const k in obj) {
    if (!omits.includes(k)) {
      res[k] = obj[k];
    }
  }
  return res;
}

export function* nTimesRec(n) {
  if (n > 0) {
    yield* nTimesRec(n - 1);
    yield n - 1;
  }
}

export function* nTimes(n) {
  while (n--) {
    yield;
  }
}

export function round(d, n = 2) {
  const k = Math.pow(10, n);
  return Math.round(d * k) / k;
}

export function random(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

export function insertStrAt(source, idx, str) {
  return source.substring(0, idx) + str + source.substring(idx);
}

export function replaceStrAt(source, idx, str) {
  return source.substring(0, idx) + str + source.substring(idx + str.length);
}

export function range(from, to) {
  let start = from;
  let end = to;
  if (!to) {
    start = 0;
    end = from;
  }
  const res = [];
  for (let i = start; i < end; i++) {
    res.push(i);
  }
  return res;
}
