import { random } from '../../utils/util.js';

import { search as linearSearch} from './linear-search.js';
import { search as binarySearch } from './binary-search.js';

let searchSample = [];
const SAMPLE_SIZE = 2 << 16;
const sampleTarget = random(0, SAMPLE_SIZE);
for (let n =0; n < SAMPLE_SIZE; n++) {
  searchSample.push(n);
}
console.log(`data sample size: ${SAMPLE_SIZE}`);
// console.log(searchSample);
console.log(`target sample: ${sampleTarget}`);

console.time('linearSearch');
console.log(linearSearch(searchSample, sampleTarget));
console.timeEnd('linearSearch');

console.time('binarySearch');
console.log(binarySearch(searchSample, sampleTarget));
console.timeEnd('binarySearch');

