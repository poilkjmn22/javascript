import { swap, isArray } from './util.js';

function getPivot(left, right){
  return (left + right) >> 1;
}

function partition(arr, left, right) {
	let pivot = getPivot(left, right); //中枢值这里取中位数
	let store = left;
	swap(arr, pivot, right); //中枢值交换到末尾
	for(let i = left; i < right; i++) {
		if(arr[i] <= arr[right]) {
			swap(arr, i, store);
			store += 1;
		}
	}
	swap(arr, store, right);
	return store;
}

function quicksort(arr, left, right) {
	if(left < right) {
		let pivot = partition(arr, left, right);
		quicksort(arr, 0, pivot - 1);
		quicksort(arr, pivot + 1, right);
	}
}

export function sort(arr) {
	if(!isArray(arr)) {
		console.warn(`${arr} is not an array`);
		return arr;
	}
	quicksort(arr, 0, arr.length - 1);
	return arr;
}
