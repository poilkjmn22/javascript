import KeyValuePair from "./KeyValuePair";
/*
 * 这里key是小端来表示的：其二进制的高位在右边，低位在左边(反之则为大端)
 * 这里实现的是小端树
 */
export default class IntTrie {
  constructor() {
    this.left = null;
    this.right = null;
    this.value = null;
  }
  static insert(t, key, value) {
    if (!t) {
      t = new IntTrie();
    }
    let p = t;
    let k = key;
    while (key !== 0) {
      if ((key & 1) === 0) {
        if (!p.left) {
          p.left = new IntTrie();
        }
        p = p.left;
      } else {
        if (!p.right) {
          p.right = new IntTrie();
        }
        p = p.right;
      }
      key = key >> 1;
    }
    p.value = new KeyValuePair(k, value).toString();
    return t;
  }
  static build(keyValuePairs) {
    let t = new IntTrie();
    for (const key in keyValuePairs) {
      t = IntTrie.insert(t, parseInt(key), keyValuePairs[key]);
    }
    return t;
  }
  static lookup(t, key) {
    let x = t;
    while (key !== 0 && x) {
      if ((key & 1) === 0) {
        x = x.left;
      } else {
        x = x.right;
      }
      key = key >> 1;
    }
    return x ? x.value : null;
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
