/*
 * @Author: fangqi
 * @Date: 2023-02-21 19:36:28
 * @LastEditors: fangqi
 * @LastEditTime: 2023-02-21 17:11:49
 * @Description: KMP算法
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import { isString } from "../../../utils/util";

function kmpMatch(w, p) {
  if (!isString(w) || !isString(p)) {
    throw new Error("参数错误，应为字符串类型");
  }
  const res = [];
  const n = w.length;
  const m = p.length;
  if (m <= 0 || n <= 0) {
    return res;
  }
  const fallback = fprefix(p);
  let k = 0; // 当前已经匹配的字符个数
  for (let i = 0; i < n; i++) {
    while (k > 0 && p[k] !== w[i]) {
      k = fallback[k];
    }
    if (p[k] === w[i]) {
      k += 1;
    }
    if (k === m) {
      res.push(i - m + 1);
      k = fallback[k - 1];
    }
  }
  return res;
}

function fprefix(p) {
  const t = new Array(p.length).fill(0);
  let k = 0;
  for (let i = 2; i <= p.length; i++) {
    while (k > 0 && p[i - 1] !== p[k]) {
      k = t[k - 1];
    }
    if (p[i - 1] === p[k]) {
      k += 1;
    }
    t[i - 1] = k;
  }
  return t;
}

export default kmpMatch;
