function constructSuffixArray(str) {
  let n = str.length;
  let k = 1;
  const rank = [];
  const tmp = [];
  const sa = [];

  function compareSuffixArray(i, j) {
    if (rank[i] !== rank[j]) {
      return rank[i] - rank[j];
    } else {
      const ri = i + k <= n ? rank[i + k] : -1;
      const rj = j + k <= n ? rank[j + k] : -1;
      return ri - rj;
    }
  }

  function construct() {
    for (let i = 0; i <= n; i++) {
      sa[i] = i;
      rank[i] = i < n ? str[i].charCodeAt() : -1;
    }
    for (k = 1; k <= n; k *= 2) {
      sa.sort(compareSuffixArray);

      tmp[sa[0]] = 0;
      for (let i = 1; i <= n; i++) {
        tmp[sa[i]] =
          tmp[sa[i - 1]] + (compareSuffixArray(sa[i - 1], sa[i]) < 0 ? 1 : 0);
      }
      for (let i = 0; i <= n; i++) {
        rank[i] = tmp[i];
      }
    }
  }

  construct();
  return sa;
}

function constructLongestCommonPrefixArray(str, sa) {
  const n = str.length;
  const rank = []; // rank[i]为str位置i开始的后缀在后缀数组中的顺序
  const lcp = [];
  for (let i = 0; i <= n; i++) {
    rank[sa[i]] = i;
  }

  let h = 0; //
  lcp[0] = 0;
  for (let i = 0; i < n; i++) {
    let j = sa[rank[i] - 1]; //str从位置i开始的后缀在后缀数组中的前一个后缀索引
    if (h > 0) {
      h -= 1;
    }
    for (; i + h < n && j + h < n; h++) {
      if (str[i + h] !== str[j + h]) {
        break;
      }
    }
    lcp[rank[i] - 1] = h;
  }
  return lcp;
}

export { constructSuffixArray, constructLongestCommonPrefixArray };
