/* 
 * @Author: fangqi
 * @Date: 2022-02-25 15:33:34
 * @LastEditors: fangqi
 * @LastEditTime: 2022-02-25 17:15:55
 * @Description: ES6中的迭代器
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
async function initCounter() {
  const { default: Counter } = await import('./Counter.js')
  const counter = new Counter(9);

  for(let i of counter) {
    if (i > 3) {
      break;
    }
    console.log(i);
  }

  for(let i of counter) {
    console.log(i);
  }
}

async function initRange() {
  const { default: Range } = await import('./Range.js')
  for(let x of new Range(-3, 3)) console.log(x); // Logs numbers 1 to 10

}

async function iterFunc() {
  const { map, filter, words } = await import('./iterFunc.js')
  const { default: Range } = await import('./Range.js')
  // Map a range of integers to their squares and convert to an array
  console.log([...map(new Range(1,4), x => x*x)])  // => [1, 4, 9, 16]

  // Filter a range so we're left with only even numbers
  console.log([...filter(new Range(1,10), x => x % 2 === 0)])  // => [2,4,6,8,10]

  console.log([...words(" abc def  ghi! ")]) // => ["abc", "def", "ghi!"]

}

export {
  initCounter,
  initRange,
  iterFunc
}
