import Patricia from "./Patricia";
// 取两个字符串的最长公共前缀
function lcp(k1, k2) {
  let idx = 0;
  let prefix = "";
  for (const c of k1) {
    if (c === k2[idx]) {
      prefix += c;
      idx += 1;
    } else {
      break;
    }
  }
  return [prefix, k1.substring(idx), k2.substring(idx)];
}

function branch(key1, tree1, key2, tree2) {
  if (!key1) {
    // 例如将an插入前缀为another的树中
    tree1.children.set(key2, tree2);
    return tree1;
  }
  const t = new Patricia();
  t.children.set(key1, tree1);
  t.children.set(key2, tree2);
  return t;
}

export { lcp, branch };
