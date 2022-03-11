import {
  flattenDeep as _flattenDeep,
  flattenDepth as _flattenDepth,
} from 'lodash-es';
function flatten(arr, depth) {
  let res = [];
  let path = [];
  function innerWalk(arr) {
    if (
      Object.prototype.toString.call(arr) !== '[object Array]' ||
      (depth && path.length > depth)
    ) {
      return res.push(arr);
    }
    for (let a of arr) {
      path.push(a);
      innerWalk(a);
      path.pop();
    }
  }
  innerWalk(arr);
  return res;
}

console.dir(flatten([1, [2, 3, [4, 5]], [6, 7]]));
console.dir(_flattenDeep([1, [2, 3, [4, 5]], [6, 7]]));
console.dir(flatten([1, [2, [3, [4]], 5]], 2));
console.dir(_flattenDepth([1, [2, [3, [4]], 5]], 2));
