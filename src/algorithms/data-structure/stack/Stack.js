// 用一维数组实现栈
// S[0]不存放元素
export default class Stack {
  constructor(max) {
    this.S = [];
    this._top = 0;
    this.MAX = max || Number.MAX_SAFE_INTEGER;
  }
  isEmpty() {
    return this._top === 0;
  }
  isFull() {
    return this._top >= this.MAX;
  }
  push(x) {
    if (this.isFull()) {
      throw new Error("栈已满");
    }
    this._top += 1;
    this.S[this._top] = x;
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("栈已空");
    }
    this._top -= 1;
    return this.S[this._top + 1];
  }
  top() {
    return this.S[this._top];
  }
  size() {
    return this._top;
  }
}
