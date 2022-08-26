import AVLNode from "./AVLNode";
import { isArray, isFunction } from "../../../utils/util";

export default class AVLTree {
  constructor(data, key) {
    const [first, ...rest] = isArray(data) ? data : [data];
    this.root = new AVLNode(first, key);
    let newRoot = this.root;
    for (const d of rest) {
      newRoot = newRoot.add(d);
    }
    this.root = newRoot;
  }
  inorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this.root, iteratee);
    function innerWalk(node, iteratee) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee);
      iteratee(node, iteratee);
      innerWalk(node.right, iteratee);
    }
  }
}
