function createNode() {
  return new Trie();
}
export default class Trie {
  constructor(value) {
    this.children = new Map();
    this.value = value || null;
  }
  static insert(t, key, value) {
    if (!t) {
      t = createNode();
    }
    let p = t;
    for (const c of key) {
      if (!p.children.get(c)) {
        p.children.set(c, createNode());
      }
      p = p.children.get(c);
    }
    p.value = value;
    return t;
  }
  static build(strArr) {
    let t = null;
    for (const str of strArr) {
      t = Trie.insert(t, str, str);
    }
    return t;
  }
  lookup(key) {
    let t = this;
    let idx = 0;
    let k = key[idx];
    while (k && t && t.children.has(k)) {
      t = t.children.get(k);
      idx += 1;
      k = key[idx];
    }
    // key还有剩余的或者已达叶子结点,则未找到
    return k || !t ? null : t.value;
  }
  traverse(cb) {
    const innerWalk = (t, parent, branch, c) => {
      if (!t) {
        return;
      }
      cb(t, parent, branch, c);
      let idx = 0;
      for (const [k, v] of t.children) {
        innerWalk(v, t, idx++, k);
      }
    };
    innerWalk(this);
  }
}
