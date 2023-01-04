import Trie from "../Trie.js";
import { lcp, branch } from "./utils.js";
export default class Patricia extends Trie {
  constructor(value) {
    super(value);
  }

  static insert(t, key, value) {
    if (!t) {
      t = new Patricia();
    }
    let node = t;
    let match;
    while (true) {
      match = false;
      for (const [k, v] of node.children) {
        if (k === key) {
          node.value = value;
          return t;
        }
        const [prefix, k1, k2] = lcp(key, k);
        if (prefix) {
          match = true;
          if (!k2) {
            // 例如将anther插入前缀为an的树，则继续遍历
            node = v;
            key = k1;
            break;
          } else {
            node.children.set(prefix, branch(k1, new Patricia(value), k2, v));
            node.children.delete(k);
            return t;
          }
        }
      }
      if (!match) {
        node.children.set(key, new Patricia(value));
        return t;
      }
    }
    return t;
  }
  static build(strArr) {
    let t = null;
    for (const str of strArr) {
      t = Patricia.insert(t, str, str);
    }
    return t;
  }
  lookup(key) {
    let t = this;
    let match;
    while (true) {
      match = false;
      for (const [k, v] of t.children) {
        if (key === k) {
          return v.value;
        }
        const [prefix, k1, k2] = lcp(key, k);
        if (prefix && !k2) {
          match = true;
          key = k1;
          t = v;
          break;
        }
      }
      if (!match) {
        return null;
      }
    }
    return null;
  }
}
