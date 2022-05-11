// 使用由一维数组构成的环形缓冲区实现
export default class Queue {
  constructor(max) {
    this.Q = [];
    this.head = 0;
    this.tail = 0;
    this.MAX = max + 1 || Number.MAX_SAFE_INTEGER;
  }
  isEmpty() {
    return this.head === this.tail;
  }
  isFull() {
    return this.head === (this.tail + 1) % this.MAX;
  }
  enqueue(x) {
    if (this.isFull()) {
      throw new Error("队列已满");
    }
    this.Q[this.tail] = x;
    this.tail += 1;
    if (this.tail === this.MAX) {
      this.tail = 0;
    }
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("队列已空");
    }
    const x = this.Q[this.head];
    this.head += 1;
    if (this.head === this.MAX) {
      this.head = 0;
    }
    return x;
  }
}
