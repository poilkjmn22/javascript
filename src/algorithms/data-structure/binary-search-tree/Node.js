import { getKey, isFunction } from "../../../utils/util";
export default class Node {
  constructor(data, key) {
    this.parent = null;
    this.left = null;
    this.right = null;
    this.data = data;
    this.key = getKey(data, key);
    this.optKey = key;
  }
  // 中序遍历
  _inorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this, iteratee);
    function innerWalk(node, iteratee) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee);
      iteratee(node, iteratee);
      innerWalk(node.right, iteratee);
    }
  }
  // 前序遍历
  _preorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this, iteratee);
    function innerWalk(node, iteratee) {
      if (!node) {
        return;
      }
      iteratee(node, iteratee);
      innerWalk(node.left, iteratee);
      innerWalk(node.right, iteratee);
    }
  }
  // 后序遍历
  _postorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this, iteratee);
    function innerWalk(node, iteratee) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee);
      innerWalk(node.right, iteratee);
      iteratee(node, iteratee);
    }
  }
  _find(data) {
    const key = getKey(data, this.optKey);
    let found = null;
    let t = this;
    while (t) {
      if (key === t.key) {
        found = t;
        break;
      } else if (key < t.key) {
        t = t.left;
      } else if (key > t.key) {
        t = t.right;
      }
    }
    return found;
  }
  _findMin() {
    let min = this;
    while (min.left) {
      min = min.left;
    }
    return min;
  }
  _findMax() {
    let max = this;
    while (max.right) {
      max = max.right;
    }
    return max;
  }
}
