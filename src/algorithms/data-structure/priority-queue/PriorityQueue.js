// 使用最大堆实现
import MaxHeap from "../heap/MaxHeap";
export default class PriorityQueue {
  constructor(arr = [], key) {
    this.heap = new MaxHeap(arr, key);
  }
  enqueue(item) {
    this.heap.insert(item);
  }
  dequeue() {
    return this.heap.extract();
  }
  isEmpty() {
    return this.heap.H.length <= 0;
  }
}
