import SuffixTree from "./SuffixTree";
import Queue from "../../queue/Queue";

function substr(str, strRef) {
  const [l, r] = strRef;
  return str.substring(l, r + 1);
}
/*
 * dest: 目标字符串
 * s: 模式字符串
 * return: 子串s在目标字符串dest中出现的次数
 */
function lookupPattern(dest, s) {
  const t = SuffixTree.build(dest);
  let node = t.root;
  let match;
  while (true) {
    match = false;
    for (const [, [strRef, tr]] of node.children) {
      const edge = substr(t.str, strRef);
      if (edge.startsWith(s)) {
        // s是edge的前缀
        return Math.max(tr.children.size, 1);
      } else if (s.startsWith(edge)) {
        // edge是s的前缀
        match = true;
        node = tr;
        s = s.substring(edge.length);
        break;
      }
    }
    if (!match) {
      return 0;
    }
  }
  return 0;
}

/* LongestRepeatedSubstring: 查找最长重复子串
 */
function updateMax(lst, x) {
  if (lst.length <= 0 || lst[0].length < x.length) {
    return [x];
  }
  if (lst[0].length === x.length) {
    return lst.concat([x]);
  }
  return lst;
}
function lrs(dest) {
  const t = SuffixTree.build(dest);
  const que = new Queue([["", t.root]]);
  let res = [];
  while (!que.isEmpty()) {
    // 从根节点开始，广度优先遍历
    const [s, node] = que.dequeue();
    for (const [, [strRef, tr]] of node.children) {
      if (tr.children.size > 0) {
        const s1 = s + substr(t.str, strRef);
        que.enqueue([s1, tr]);
        res = updateMax(res, s1);
      }
    }
  }
  return res;
}

/*
 * LongestCommonSubstring: 查找两个字符串的最长公共子串
 */
function matchFork(t, node) {
  if (node.children.size === 2) {
    const [[, [strRef1, tr1]], [, [strRef2, tr2]]] = [...node.children];
    return (
      SuffixTree.isLeaf(tr1) &&
      SuffixTree.isLeaf(tr2) &&
      substr(t.str, strRef1).includes($1) !==
        substr(t.str, strRef2).includes($1)
    );
  }
  return false;
}
const $1 = "@"; // str1的结束字符
const $2 = "#"; // str2的结束字符
function lcs(str1, str2) {
  const t = SuffixTree.build(`${str1}${$1}${str2}${$2}`, "");
  const que = new Queue([["", t.root]]);
  let res = [];
  while (!que.isEmpty()) {
    // 从根节点开始，广度优先遍历
    const [s, node] = que.dequeue();
    matchFork(t, node) && (res = updateMax(res, s));
    for (const [, [strRef, tr]] of node.children) {
      tr.children.size > 0 && que.enqueue([s + substr(t.str, strRef), tr]);
    }
  }
  return res;
}

export { lookupPattern, lrs, lcs };
