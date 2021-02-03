export function swap(arr, i, j){
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export function isArray(arr){
  return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isFunction(value){
  return Object.prototype.toString.call(value) === '[object Function]';
}
