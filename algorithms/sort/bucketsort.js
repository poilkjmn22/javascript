//桶排序必须要满足两个条件：
//1.输入数据一定要均匀分布在一个给定范围内
//2.桶必须有序

import LinkedList from '../../data-structures/linked-list/LinkedList.js';
import { isFunction } from '../../utils/util.js';

let num = 1;

function defaultHash(d) {
	return Math.floor(d * num);
}

function defaultNumBuckets(numElements) {
	num = numElements;
	return numElements;
}

function extract(buckets, arr) {
	let idx = 0;
	let low = 0;
	for(let i = 0; i < num; i++) {
		if(!(buckets[i] instanceof LinkedList)) {
			continue;
		}

		low = idx;
		let curr = buckets[i].head;
		arr[idx] = curr.value;
		idx += 1;
		curr = curr.next;

		//对链表插入排序
		while(curr) {
			let j = idx - 1;
			while(j >= low && arr[j] > curr.value) {
				arr[j + 1] = arr[j];
				j -= 1;
			}
			arr[j + 1] = curr.value;
			curr = curr.next;
			idx += 1;
		}
	}
}

export function sort(arr, hash, numBuckets) {
	if(!isFunction(hash)) {
		hash = defaultHash
	}
	if(!isFunction(numBuckets)) {
		numBuckets = defaultNumBuckets;
	}
	numBuckets(arr.length);
	let buckets = [];
	for(let i = 0; i < arr.length; i++) {
		let k = hash(arr[i]);
		if(!(buckets[k] instanceof LinkedList)) {
			buckets[k] = new LinkedList();
		}
		buckets[k].append(arr[i]);
	}
	extract(buckets, arr);
	return arr;
}
