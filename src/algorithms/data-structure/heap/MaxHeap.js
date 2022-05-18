import { getKey } from "../../../utils/util";
// 使用由一维数组构成的完全（近似）二叉树实现
function parent(i) {
  return Math.floor((i - 1) / 2);
}
function left(i) {
  return i * 2 + 1;
}
function right(i) {
  return i * 2 + 2;
}

function swap(A, a, b) {
  const tmp = A[a];
  A[a] = A[b];
  A[b] = tmp;
}

export default class MaxHeap {
  constructor(arr = [], key) {
    this.key = key;
    this.buildHeap(arr);
  }
  heapify(A, i) {
    const l = left(i);
    const r = right(i);
    let large = i;
    if (l <= A.length - 1 && this._getKey(A[l]) > this._getKey(A[i])) {
      large = l;
    }
    if (r <= A.length - 1 && this._getKey(A[r]) > this._getKey(A[large])) {
      large = r;
    }
    if (large !== i) {
      swap(A, i, large);
      this.heapify(A, large);
    }
  }
  _getKey(data) {
    return getKey(data, this.key);
  }
  buildHeap(arr) {
    this.H = arr;
    for (let i = Math.floor((this.H.length - 1) / 2); i >= 0; i--) {
      this.heapify(this.H, i);
    }
  }
  insert(item) {
    this.H.push(-Infinity);
    this.increaseKey(this.H.length - 1, item);
  }
  increaseKey(i, item) {
    if (
      this.H[i] !== -Infinity &&
      this._getKey(item) < this._getKey(this.H[i])
    ) {
      throw "新键值小于当前键值";
    }
    this.H[i] = item;
    while (i > 0 && this._getKey(item) > this._getKey(this.H[parent(i)])) {
      const p = parent(i);
      swap(this.H, i, p);
      i = p;
    }
  }
  extract() {
    const max = this.H[0];
    this.H[0] = this.H[this.H.length - 1];
    this.H.pop();
    this.heapify(this.H, 0);
    return max;
  }
}
