/* 
 * @Author: fangqi
 * @Date: 2022-03-01 09:43:08
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-03 20:27:48
 *  @Description: 
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
// A Promise-based wrapper around setTimeout() that we can use await with.
// Returns a Promise that fulfills in the specified number of milliseconds
function elapsedTime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// An async generator function that increments a counter and yields it
// a specified (or infinite) number of times at a specified interval.
async function* clock(interval, max=Infinity) {
    for(let count = 1; count <= max; count++) { // regular for loop
        await elapsedTime(interval);            // wait for time to pass
        yield count;                            // yield the counter
    }
}

function clock2(interval, max=Infinity) {
    // A Promise-ified version of setTimeout that we can use await with.
    // Note that this takes an absolute time instead of an interval.
    function until(time) {
        return new Promise(resolve => setTimeout(resolve, time - Date.now()));
    }

    let startTime = Date.now();  // Remember when we started
    let count = 0;               // Remember which iteration we're on

    // Return an asynchronously iterable object
    return {
        async next() {           // The next() method makes this an iterator
            if (++count > max) { // Are we done?
                return { done: true };  // Iteration result indicating done
            }
            // Figure out when the next iteration should begin,
            let targetTime = startTime + count * interval;
            // wait until that time,
            await until(targetTime);
            // and return the count value in an iteration result object.
            return { value: count };
        },
        // This method means that this iterator object is also an iterable.
        [Symbol.asyncIterator]() { return this; }
    };
}

export {
  clock,
  clock2
}
