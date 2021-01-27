export function swap(arr, i, j){
  let tmp = arr[i];
  arr[j] = arr[i];
  arr[i] = tmp;
}
