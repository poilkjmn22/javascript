/* 红黑树的实现
 * 1) 任何节点是红色或黑色
 * 2) 根节点为黑色
 * 3) 所有的叶节点（NIL节点）为黑色
 * 4) 如果一个节点为红色，那么它的子节点都是黑色
 * 5) 对任一节点，从它出发到所有叶子节点的路径上包含相同数量的黑色节点
 * 以上5条规则能保证红黑树的平衡性
 */
import Node from "./Node";
import { isArray } from "../../../utils/util";

const Color = {
  Red: "red",
  Black: "black",
};

export default class RBNode extends Node {
  constructor(data, key) {
    super(data, key);
    this.color = Color.Red;
  }
  static build(arr, key) {
    const [first, ...rest] = isArray(arr) ? arr : [arr];
    let t = first === void 0 ? null : new RBNode(first, key);
    for (const d of rest) {
      t = t.insert(t, d);
    }
    return t;
  }
  insert(t, data) {
    let root = t;
    let x = new RBNode(data, this.optKey);
    const key = x.key;
    let parent = null;
    while (t) {
      parent = t;
      t = key < t.key ? t.left : t.right;
    }
    if (!parent) {
      root = x;
    } else if (key < parent.key) {
      parent.setLeft(x);
    } else {
      parent.setRight(x);
    }
    return RBNode.fixInsert(root, x);
  }
  static fixInsert(T, X) {
    let t = T;
    let x = X;
    while (x && x.parent && x.parent.color === Color.Red) {
      if (x.uncle() && x.uncle().color === Color.Red) {
        x.parent.color = Color.Black;
        x.grandparent() && (x.grandparent().color = Color.Red);
        x.uncle() && (x.uncle().color = Color.Black);
        x = x.grandparent();
      } else {
        if (x.grandparent() && x.parent === x.grandparent().left) {
          if (x === x.parent.right) {
            x = x.parent;
            t = RBNode.rotateLeft(t, x);
          }
          x.parent.color = Color.Black;
          x.grandparent().color = Color.Red;
          t = RBNode.rotateRight(t, x.grandparent());
        } else {
          if (x === x.parent.left) {
            x = x.parent;
            t = RBNode.rotateRight(t, x);
          }
          x.parent.color = Color.Black;
          x.grandparent() && (x.grandparent().color = Color.Red);
          t = RBNode.rotateLeft(t, x.grandparent());
        }
      }
    }
    t.color = Color.Black;
    return t;
  }
  grandparent() {
    let p = this.parent;
    return p && p.parent;
  }
  uncle() {
    let p = this.parent;
    let gp = this.grandparent();
    if (!gp) {
      return null;
    }
    return p === gp.left ? gp.right : gp.left;
  }
  static rotateLeft(T, x) {
    if (!x) {
      return T;
    }
    const p = x.parent;
    let y = x.right;
    let a = x.left;
    let b = y.left;
    let c = y.right;
    x.replace(y);
    x.setChildren(a, b);
    y.setChildren(x, c);
    !p && (T = y);
    return T;
  }
  static rotateRight(T, y) {
    if (!y) {
      return T;
    }
    const p = y.parent;
    let x = y.left;
    let a = x.left;
    let b = x.right;
    let c = y.right;
    y.replace(x);
    y.setChildren(b, c);
    x.setChildren(a, y);
    !p && (T = x);
    return T;
  }
  setLeft(y) {
    this.left = y;
    y && (y.parent = this);
  }
  setRight(y) {
    this.right = y;
    y && (y.parent = this);
  }
  setChildren(L, R) {
    this.setLeft(L);
    this.setRight(R);
  }
  replace(y) {
    if (!this.parent) {
      y && (y.parent = null);
    } else if (this.parent.left === this) {
      this.parent.setLeft(y);
    } else {
      this.parent.setRight(y);
    }
    this.parent = null;
  }
}
