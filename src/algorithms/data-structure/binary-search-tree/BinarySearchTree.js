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
    if (!this.T) {
      return res;
    }
    const getData = (n) => res.push(n.data);
    const fnOrder = this.T[`_${order}`];
    if (!isFunction(fnOrder)) {
      throw new TypeError(`不支持类型${order}的遍历方式`);
    }
    fnOrder.call(this.T, getData);
    return res;
  }
  // 中序遍历
  inorder(iteratee) {
    this.T._inorder(iteratee);
  }
  // 前序遍历
  preorder(iteratee) {
    this.T._preorder(iteratee);
  }
  // 后序遍历
  postorder(iteratee) {
    this.T._postorder(iteratee);
  }
  find(data) {
    return this.T._find(data);
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
      const min = t.right._findMin();
      this.delete(min.data);
      t.data = min.data;
      t.key = min.key;
    }
  }
}
