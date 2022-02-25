/* 
 * @Author: fangqi
 * @Date: 2022-02-25 16:52:22
 * @LastEditors: fangqi
 * @LastEditTime: 2022-02-25 17:14:40
 * @Description: 迭代器版的map,filter,...函数
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

// Return an iterable object that iterates the result of applying f()
// to each value from the source iterable
function map(iterable, f) {
    let iterator = iterable[Symbol.iterator]();
    return {     // This object is both iterator and iterable
        [Symbol.iterator]() { return this; },
        next() {
            let v = iterator.next();
            if (v.done) {
                return v;
            } else {
                return { value: f(v.value) };
            }
        }
    };
}

// Return an iterable object that filters the specified iterable,
// iterating only those elements for which the predicate returns true
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return { // This object is both iterator and iterable
        [Symbol.iterator]() { return this; },
        next() {
            for(;;) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

function words(s) {
    var r = /\s+|$/g;                     // Match one or more spaces or end
    r.lastIndex = s.match(/[^ ]/).index;  // Start matching at first nonspace
    return {                              // Return an iterable iterator object
        [Symbol.iterator]() {             // This makes us iterable
            return this;
        },
        next() {                          // This makes us an iterator
            let start = r.lastIndex;      // Resume where the last match ended
            if (start < s.length) {       // If we're not done
                let match = r.exec(s);    // Match the next word boundary
                if (match) {              // If we found one, return the word
                    return { value: s.substring(start, match.index) };
                }
            }
            return { done: true };        // Otherwise, say that we're done
        }
    };
}

export {
  map,
  filter,
  words
}
