export default class Stack {
  constructor() {
    this.S = [];
  }
  isEmpty() {
    return this.S.length === 0;
  }
  push(x) {
    this.S.push(x);
  }
  pop() {
    return this.S.pop();
  }
  top() {
    return this.S[this.S.length - 1];
  }
  size() {
    return this.S.length;
  }
}
