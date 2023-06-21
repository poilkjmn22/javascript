import { constructSuffixArray } from "./index.js";

function fnMatchPattern(w) {
  const sa = constructSuffixArray(w);
  return function mp(p) {
    let a = 0;
    let b = w.length;
    const pl = p.length;
    while (b - a > 1) {
      let c = parseInt((a + b) / 2);
      if (w.substring(sa[c], sa[c] + pl) < p) {
        a = c;
      } else {
        b = c;
      }
    }
    return w.substring(sa[b], sa[b] + pl) === p ? sa[b] : -1;
  };
}

export { fnMatchPattern };
