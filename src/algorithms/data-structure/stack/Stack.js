// 用一维数组实现栈
// S[0]不存放元素
export default class Stack {
  constructor(max) {
    this.S = [];
    this.top = 0;
    this.MAX = max || Number.MAX_SAFE_INTEGER;
  }
  isEmpty() {
    return this.top === 0;
  }
  isFull() {
    return this.top >= this.MAX;
  }
  push(x) {
    if (this.isFull()) {
      throw new Error("栈已满");
    }
    this.top += 1;
    this.S[this.top] = x;
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("栈已空");
    }
    this.top -= 1;
    return this.S[this.top + 1];
  }
  size() {
    return this.top;
  }
}
