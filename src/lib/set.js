/*
 * @Author: fangqi
 * @Date: 2022-02-22 14:45:00
 * @LastEditors: fangqi
 * @LastEditTime: 2022-02-22 14:55:44
 * @Description: Set基础
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function init() {
  const s = new Set();
  s.add(1);
  s.add(1);
  console.log(s.size);
  console.log(s.has(1));
  const s2 = new Set();
  s2.add([]);
  const va = [];
  s2.add(va);
  console.log(s2.size);
  console.log(s2.has(va));

  console.log(s2.delete([]));
  console.log(s2.delete(va));
  console.log(s2.size);
}

export { init };
