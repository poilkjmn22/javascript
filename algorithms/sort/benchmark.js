import { nTimes, decimal } from '../../utils/util.js';

import { sort as sortInsert } from './insert.js';
import { sort as sortHeapify } from './heapify.js';
import { sort as sortQuick } from './quicksort.js';
import { sort as sortBucket } from './bucketsort.js';

let sortSample = [];
for (const n of nTimes(2 << 16)) {
  sortSample.push(decimal(Math.random(), 3));
}
console.log(`size: ${sortSample.length}`);

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
