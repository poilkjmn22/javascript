import Node from "./Node";
import { isFunction, getKey } from "../../../utils/util";
export default class BinarySearchTree {
  constructor(arr = [], key) {
    this.T = null;
    this.key = key;
    this.createTree(arr);
  }
  createTree(arr) {
    for (const v of arr) {
      this.insert(v);
    }
  }
  insert(data) {
    let curr = this.T;
    let last;
    const node = new Node(data, this.key);
    while (curr) {
      last = curr;
      if (node.key <= curr.key) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    if (!last) {
      this.T = node;
    } else {
      if (node.key <= last.key) {
        last.left = node;
      } else {
        last.right = node;
      }
      node.parent = last;
    }
  }
  toArray(order = "inorder") {
    const res = [];
    const getData = (n) => res.push(n.data);
    const fnOrder = this[order];
    if (!isFunction(fnOrder)) {
      throw new TypeError(`不支持类型${order}的遍历方式`);
    }
    fnOrder.call(this, getData);
    return res;
  }
  // 中序遍历
  inorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this.T, iteratee);
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
  preorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this.T, iteratee);
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
  postorder(iteratee) {
    if (!isFunction(iteratee)) {
      throw new TypeError("参数类型错误：iteratee应为函数");
    }
    innerWalk(this.T, iteratee);
    function innerWalk(node, iteratee) {
      if (!node) {
        return;
      }
      innerWalk(node.left, iteratee);
      innerWalk(node.right, iteratee);
      iteratee(node, iteratee);
    }
  }
  find(data) {
    const key = getKey(data, this.key);
    let found = null;
    let t = this.T;
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
  delete(data) {
    const t = this.find(data);
    if (!t) {
      throw new Error("要删除的数据不存在");
    }
    if (!t.left && !t.right) {
      // 叶子结点
      if (t.parent) {
        if (t.key <= t.parent.key) {
          t.parent.left = null;
        } else {
          t.parent.right = null;
        }
      } else {
        this.T = null;
      }
    } else if (!t.left && t.right) {
      if (t.parent) {
        if (t.key <= t.parent.key) {
          t.parent.left = t.right;
        } else {
          t.parent.right = t.right;
        }
      } else {
        this.T = t.right;
      }
      t.right.parent = t.parent;
    } else if (t.left && !t.right) {
      if (t.parent) {
        if (t.key <= t.parent.key) {
          t.parent.left = t.left;
        } else {
          t.parent.right = t.left;
        }
      } else {
        this.T = t.left;
      }
      t.left.parent = t.parent;
    } else if (t.left && t.right) {
      const min = this.findMin(t.right);
      this.delete(min.data);
      t.data = min.data;
      t.key = min.key;
    }
  }
  findMin(node) {
    let min = node;
    while (min.left) {
      min = min.left;
    }
    return min;
  }
  findMax(node) {
    let max = node;
    while (max.right) {
      max = max.right;
    }
    return max;
  }
}
