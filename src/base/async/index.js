/* 
 * @Author: fangqi
 * @Date: 2022-03-01 09:37:41
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-03 21:31:24
 * @Description: 异步JavaScript
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import { clock, clock2 } from './examples.js'
import AsyncQueue from './AsyncQueue.js'

// A test function that uses the async generator with for/await
async function testForAwait() {
  for await (const tick of clock(300, 100)) { // Loop 100 times every 300ms
      console.log(tick);
  }
}

async function testForAwait2() {
  for await (const count of clock2(300, 50)) {
    console.log(count) 
    // if (count > 11) {
    //   break;
    // }
  }
}

function eventStream(elt, type) {
    const q = new AsyncQueue();                  // Create a queue
    elt.addEventListener(type, e=>q.enqueue(e)); // Enqueue events
    return q;
}

async function handleKeys() {
    // Get a stream of keypress events and loop once for each one
    // 循环体会在每次入队一个新值时，运行一次：可以表示异步事件流或数据流
    for await (const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }
}

export { testForAwait, testForAwait2, handleKeys }
