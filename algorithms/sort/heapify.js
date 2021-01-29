import { swap,isArray } from './util.js';

function findMaxIndex(arr, a, b, c, max) {
	let maxIdx = a;
	if(b <= max && arr[maxIdx] < arr[b]) {
		maxIdx = b;
	}
	if(c <= max && arr[maxIdx] < arr[c]) {
		maxIdx = c;
	}
	return maxIdx;
}

function heapify(arr, idxParent, idxMax) {
	let idxLeft = idxParent * 2 + 1;
	let idxRight = idxParent * 2 + 2;
	let idxLargest = findMaxIndex(arr, idxParent, idxLeft, idxRight, idxMax);

	if(idxLargest !== idxParent) {
		swap(arr, idxLargest, idxParent);
		heapify(arr, idxLargest, idxMax);
	}
}

export function buildHeap(arr) {
	for(let i = (arr.length >> 1 - 1); i >= 0; i--) {
		heapify(arr, i, arr.length - 1);
	}
	return arr;
}

export function sort(arr) {
	if (!isArray(arr)) {
    console.warn(`${arr} is not an array`);
    return arr;
  }
	buildHeap(arr);
	for(let i = (arr.length - 1); i > 0; i--) {
		swap(arr, 0, i);
		heapify(arr, 0, i - 1);
	}
	return arr;
}
