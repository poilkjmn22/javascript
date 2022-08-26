import BinarySearchTree from "../../algorithms/data-structure/binary-search-tree/BinarySearchTree";
import { isArray } from "../../utils/util";
function linearSearch(arr, value) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      index = i;
      break;
    }
  }
  return index;
}

function binarySearch(arr, value) {
  let index = -1;
  let left = 0;
  let right = arr.length - 1;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (value < arr[mid]) {
      right = mid - 1;
    } else if (value > arr[mid]) {
      left = mid + 1;
    } else {
      index = mid;
      break;
    }
  }
  return index;
}

function binarySearchTree(arr, value) {
  let bst = arr;
  if (isArray(arr)) {
    bst = new BinarySearchTree(arr);
  }
  return bst.find(value);
}

export { linearSearch, binarySearch, binarySearchTree };
