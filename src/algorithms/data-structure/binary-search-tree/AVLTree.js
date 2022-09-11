import AVLNode from "./AVLNode";
import { isArray, isFunction } from "../../../utils/util";

export default class AVLTree {
  constructor(data, key) {
    const [first, ...rest] = isArray(data) ? data : [data];
    this.root = first === void 0 ? null : new AVLNode(first, key);
    let newRoot = this.root;
    for (const d of rest) {
      newRoot = newRoot.add(d);
    }
    this.root = newRoot;
  }
  toArray(order = "inorder") {
    const res = [];
    if (!this.root) {
      return res;
    }
    const fnOrder = this.root[`_${order}`];
    if (!isFunction(fnOrder)) {
      throw new TypeError(`不支持类型${order}的遍历方式`);
    }
    fnOrder.call(this.root, (n) => res.push(n.data));
    return res;
  }
  // 中序遍历
  inorder(iteratee) {
    this.root._inorder(iteratee);
  }
  // 前序遍历
  preorder(iteratee) {
    this.root._preorder(iteratee);
  }
  // 后序遍历
  postorder(iteratee) {
    this.root._postorder(iteratee);
  }
  insert(data, key) {
    this.root = !this.root ? new AVLNode(data, key) : this.root.add(data);
  }
  find(data) {
    return this.root._find(data);
  }
  delete(data) {
    this.root = this.root.remove(data);
  }
}
