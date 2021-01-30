import { sort as sortInsert } from './sort/insert.js';
import { sort as sortHeapify } from './sort/heapify.js';
import { sort as sortQuick } from './sort/quicksort.js';

console.log(sortInsert([5, 4, 3, 2, 1]));
console.log(sortInsert([15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14]));
console.log(sortInsert('g'));


//
console.log(sortHeapify([8, 11, 9, 2, 10, 16]));
console.log(sortHeapify([15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14]));
console.log(sortHeapify(10));


console.log(sortQuick([15, 9, 8, 1, 4, 11, 7, 12, 13, 6, 5, 3, 16, 2, 10, 14]));
console.log(sortQuick([7,6,5,4,3,2,1]));
console.log(sortQuick('quicksort'));
