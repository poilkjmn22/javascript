export default class Node {
  constructor(suffix = null) {
    this.children = new Map(); // 'c': [[l, r], node]
    this.suffix = suffix;
  }
}
