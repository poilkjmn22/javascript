/* 
 * @Author: fangqi
 * @Date: 2022-02-26 10:03:54
 * @LastEditors: fangqi
 * @LastEditTime: 2022-02-26 11:04:21
 * @Description: 生成器的实例
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function* fibonacciSequence() {
  let x = 0, y = 1;
  for(;;) {
      yield y;
      [x, y] = [y, x+y];  // Note: destructuring assignment
  }
}

function fibonacci(n) {
  for(const f of fibonacciSequence()) {
    if (n-- <= 0) {
      return f
    }
  }
}

// Yield the first n elements of the specified iterable object
function* take(n, iterable) {
    let it = iterable[Symbol.iterator](); // Get iterator for iterable object
    while(n-- > 0) {           // Loop n times:
        let next = it.next();  // Get the next item from the iterator.
        if (next.done) return; // If there are no more values, return early
        else yield next.value; // otherwise, yield the value
    }
}

function* sequence(...iterables) {
    for(let iterable of iterables) {
        yield* iterable;
    }
}

function* oneDigitPrimes() {
  yield 2;
  yield 3;
  yield 5;
  yield 7;
}

// Given an array of iterables, yield their elements in interleaved order.
function* zip(...iterables) {
    // Get an iterator for each iterable
    let iterators = iterables.map(i => i[Symbol.iterator]());
    let index = 0;
    while(iterators.length > 0) {       // While there are still some iterators
        if (index >= iterators.length) {    // If we reached the last iterator
            index = 0;                      // go back to the first one.
        }
        let item = iterators[index].next(); // Get next item from next iterator.
        if (item.done) {                    // If that iterator is done
            iterators.splice(index, 1);     // then remove it from the array.
        }
        else {                              // Otherwise,
            yield item.value;               // yield the iterated value
            index++;                        // and move on to the next iterator.
        }
    }
}

export {
  fibonacciSequence,
  fibonacci,
  take,
  sequence,
  oneDigitPrimes,
  zip,
}
