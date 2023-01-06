import Node from "./Node";

function len(strRef) {
  const [l, r] = strRef;
  return r - l + 1;
}

const EOF = "$";

export default class SuffixTree {
  constructor(str) {
    this.str = str;
    this.infinity = str.length + 1000;
    this.root = new Node();
  }
  /* Ukkonen的on-line构造算法[1995]
   * O(n) = n
   */
  static build(str, eof) {
    let t = new SuffixTree(str + (eof === "" ? "" : eof || EOF));
    let node = t.root; // 活动点初始为(root, Empty)
    let l = 0;
    for (let i = 0; i < t.str.length; i++) {
      let [node_u, l_u] = SuffixTree.update(t, node, [l, i]);
      node = node_u;
      l = l_u;

      let [node_c, l_c] = SuffixTree.canonize(t, node, [l, i]);
      node = node_c;
      l = l_c;
    }
    return t;
  }
  static update(t, _node, strRef) {
    let [l, i] = strRef;
    const c = t.str[i];
    let prev = new Node();
    let node = _node;
    while (true) {
      const [finish, p] = SuffixTree.branch(t, node, [l, i - 1], c);
      if (finish) {
        break;
      }
      p.children.set(c, [[i, t.infinity], new Node()]);
      prev.suffix = p;
      prev = p;

      let [node_c, l_c] = SuffixTree.canonize(t, node.suffix, [l, i - 1]);
      node = node_c;
      l = l_c;
    }
    prev.suffix = node;
    return [node, l];
  }
  static branch(t, node, strRef, c) {
    const [l] = strRef;
    if (len(strRef) <= 0) {
      return !node ? [true, t.root] : [node.children.has(c), node];
    } else {
      const [[l1, r1], node1] = node.children.get(t.str[l]);
      const pos = l1 + len(strRef);
      if (t.str[pos] === c) {
        return [true, node];
      } else {
        const branchNode = new Node();
        node.children.set(t.str[l1], [[l1, pos - 1], branchNode]);
        branchNode.children.set(t.str[pos], [[pos, r1], node1]);
        return [false, branchNode];
      }
    }
  }
  static canonize(t, _node, strRef) {
    let [l, r] = strRef;
    let node = _node;
    if (!node) {
      return len(strRef) <= 0
        ? [null, l]
        : SuffixTree.canonize(t, t.root, [l + 1, r]);
    }
    while (l <= r) {
      const [[l1, r1], child] = node.children.get(t.str[l]);
      if (r - l >= r1 - l1) {
        l += r1 - l1 + 1;
        node = child;
      } else {
        break;
      }
    }
    return [node, l];
  }
  static isLeaf(node) {
    return node.children.size === 0;
  }
  traverse(cb) {
    const innerWalk = (t, parent, branch, c, strRef) => {
      if (!t) {
        return;
      }
      cb(t, parent, branch, c, strRef);
      let idx = 0;
      for (const [k, [strRef, node]] of t.children) {
        innerWalk(node, t, idx++, k, strRef);
      }
    };
    innerWalk(this.root);
  }
}
