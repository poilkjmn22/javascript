import IntTree from "./IntTree";
function maskbit(x, mask) {
  return x & ~(mask - 1);
}

// 检查IntTree节点的prefix在掩码以上的位是否为key的前缀
function match(key, tree) {
  return !tree.isLeaf() && maskbit(key, tree.mask) === tree.prefix;
}

// 公共前缀接下来的一位是否为0
function zero(x, mask) {
  return (x & (mask >> 1)) === 0;
}

// 整数p1,p2的最长公共前缀
function lcp(p1, p2) {
  let diff = p1 ^ p2;
  let mask = 1;
  while (diff !== 0) {
    diff = diff >> 1;
    mask = mask << 1;
  }
  return [maskbit(p1, mask), mask];
}

function branch(t1, t2) {
  let t = new IntTree();
  const [prefix, mask] = lcp(t1.getPrefix(), t2.getPrefix());
  t.prefix = prefix;
  t.mask = mask;
  zero(t1.getPrefix(), t.mask) ? t.setChildren(t1, t2) : t.setChildren(t2, t1);
  return t;
}

export { maskbit, match, zero, lcp, branch };
