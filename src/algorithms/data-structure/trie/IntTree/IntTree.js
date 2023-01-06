import { match, branch, zero } from "./utils";
/*
 * 整数Patricia
 * 这里key是大端来表示的：其二进制的高位在左边，低位在右边(反之则为小端)
 * 这里实现的是大端树
 */
export default class IntTree {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.prefix = null;
    this.mask = null;
  }
  setChildren(l, r) {
    this.left = l;
    this.right = r;
  }
  replaceChild(x, y) {
    if (this.left === x) {
      this.left = y;
    } else {
      this.right = y;
    }
  }
  isLeaf() {
    return !this.left && !this.right;
  }
  getPrefix() {
    return this.prefix || this.key;
  }
  static insert(t, key, value) {
    if (!t) {
      t = new IntTree(key, value);
      return t;
    }
    let node = t;
    let parent = null;
    while (true) {
      if (match(key, node)) {
        parent = node;
        node = zero(key, node.mask) ? node.left : node.right;
      } else {
        if (node.isLeaf() && key === node.key) {
          node.value = value;
        } else {
          const newNode = branch(node, new IntTree(key, value));
          if (!parent) {
            t = newNode;
          } else {
            parent.replaceChild(node, newNode);
          }
        }
        break;
      }
    }
    return t;
  }
  static build(keyValuePairs) {
    let t = null;
    for (const key in keyValuePairs) {
      t = IntTree.insert(t, parseInt(key), keyValuePairs[key]);
    }
    return t;
  }
  static lookup(t, key) {
    if (!t) {
      return null;
    }
    let x = t;
    while (!x.isLeaf() && match(key, x)) {
      x = zero(key, x.mask) ? x.left : x.right;
    }
    return x.isLeaf() && x.key === key ? x.value : null;
  }
  traverse(cb) {
    const innerWalk = (t, parent, branch) => {
      if (!t) {
        return;
      }
      cb(t, parent, branch);
      if (t.left) {
        innerWalk(t.left, t, "left");
      }
      if (t.right) {
        innerWalk(t.right, t, "right");
      }
    };
    innerWalk(this);
  }
}
