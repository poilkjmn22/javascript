import { getKey, isFunction } from "../../../utils/util";
export default class Node {
  constructor(data, key) {
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
    function innerWalk(node, iteratee, parent, branch) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee, node, "left");
      iteratee(node, parent, branch);
      innerWalk(node.right, iteratee, node, "right");
    }
  }
  // 前序遍历
  _preorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this, iteratee);
    function innerWalk(node, iteratee, parent, branch) {
      if (!node) {
        return;
      }
      iteratee(node, parent, branch);
      innerWalk(node.left, iteratee, node, "left");
      innerWalk(node.right, iteratee, node, "right");
    }
  }
  // 后序遍历
  _postorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this, iteratee);
    function innerWalk(node, iteratee, parent, branch) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee, node, "left");
      innerWalk(node.right, iteratee, node, "right");
      iteratee(node, parent, branch);
    }
  }
  _find(data, withPath) {
    const key = getKey(data, this.optKey);
    let found = null;
    let t = this;
    const path = [];
    while (t) {
      if (key === t.key) {
        found = t;
        break;
      } else if (key < t.key) {
        path.unshift(t);
        t = t.left;
      } else if (key > t.key) {
        path.unshift(t);
        t = t.right;
      }
    }
    if (withPath) {
      return [found].concat(path);
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
