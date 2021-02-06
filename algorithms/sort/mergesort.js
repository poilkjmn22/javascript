import { isArray, swap } from '../../utils/util.js';
//归并排序

function mergeLeftRight(arr, result, left, mid, right) {
	let i = left;
	let j = mid + 1;
	let k = left;
	while(k <= right) {
		if(i > mid || (arr[i] > arr[j] && j <= right)) {
			result[k] = arr[j];
			j += 1;
		} else {
			result[k] = arr[i];
			i += 1;
		}
		k += 1;
	}
	return result;
}

function mergesort(arr, result, left, right) {
	if((right - left) === 1) {
		if(result[left] > result[right]) {
			swap(result, left, right);
		}
		return;
	} else if((right - left) === 0) {
		return;
	}
	const mid = (left + right) >> 1;
	mergesort(result, arr, left, mid);
	mergesort(result, arr, mid + 1, right);

	mergeLeftRight(arr, result, left, mid, right);
}

export function sort(arr) {
	if(!isArray(arr)) {
		return console.warn(`${arr} is not an array`);
	}
	let result = Array.from(arr);
	mergesort(arr, result, 0, arr.length - 1);
	return result;
}
