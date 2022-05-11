// 使用最大堆实现
import MaxHeap from "../heap/MaxHeap";
export default class PriorityQueue {
  constructor(arr = []) {
    this.heap = new MaxHeap(arr);
  }
  enqueue(item) {}
}
