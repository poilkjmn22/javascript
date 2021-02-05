import { nTimes, round } from '../../utils/util.js';

import { sort as sortInsert } from './insert.js';
import { sort as sortHeapify } from './heapify.js';
import { sort as sortQuick } from './quicksort.js';
import { sort as sortBucket } from './bucketsort.js';
import { sort as sortMerge } from './mergesort.js';

let sortSample = [];
for (const n of nTimes(2 << 16)) {
  sortSample.push(round(Math.random(), 3));
}
console.log(`data sample size: ${sortSample.length}`);

let sortBucketSample = Array.from(sortSample);
console.time('sortBucket');
sortBucket(sortBucketSample);
console.timeEnd('sortBucket');

// let sortInsertSample = Array.from(sortSample);
// console.time('sortInsert');
// sortInsert(sortInsertSample);
// console.timeEnd('sortInsert');

let sortHeapifySample = Array.from(sortSample);
console.time('sortHeapify');
sortHeapify(sortHeapifySample);
console.timeEnd('sortHeapify');

// let sortQuickSample = Array.from(sortSample);
// console.time('sortQuick');
// sortQuick(sortQuickSample);
// console.timeEnd('sortQuick');

let sortMergeSample = Array.from(sortSample);
console.time('sortMerge');
sortMerge(sortMergeSample);
console.timeEnd('sortMerge');
