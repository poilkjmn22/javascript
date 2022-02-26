/* 
 * @Author: fangqi
 * @Date: 2022-02-26 10:00:55
 * @LastEditors: fangqi
 * @LastEditTime: 2022-02-26 11:21:41
 * @Description: 生成器
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */
import { fibonacciSequence, fibonacci, take, sequence, oneDigitPrimes, zip } from './examples.js'

function getFibonacci() {
  console.log(fibonacci(20))
}

function logTake() {
  console.log([...take(5, fibonacciSequence())])
}

function logSequence() {
  console.log([...sequence('abcd', oneDigitPrimes())]) 
}

function logZip() {
  console.log([...zip(oneDigitPrimes(), 'ab', [1])]) 
}

function researchReturn() {
  function* oneAddDone() {
    yield 1 
    return 'done'
  }

  const generator = oneAddDone()
  console.log( generator.next() )
  console.log( generator.next() )
  console.log( generator.next() )
}

function researchYieldExpr() {
  function* smallNumbers() {
    console.log('next() 第一次调用，参数被丢弃') 
    const y1 = yield 1; // y1 === 'b'
    console.log('next() 第二次被调用，参数是', y1)
    const y2 = yield 2; // y2 === 'c'
    console.log('next() 第三次被调用，参数是', y2)
    const y3 = yield 3; // y3 === 'd'
    console.log('next() 第四次被调用，参数是', y3)
    
    return 4
  }

  const g = smallNumbers()
  console.log('创建了生成器，代码未运行')
  const n1 = g.next('a')
  console.log('生成器回送', n1.value)
  const n2 = g.next('b')
  console.log('生成器回送', n2.value)
  const n3 = g.next('c')
  console.log('生成器回送', n3.value)
  const n4 = g.next('d')
  console.log('生成器return', n4.value)
}

export {
  getFibonacci,
  logTake,
  logSequence,
  logZip,
  researchReturn,
  researchYieldExpr
}
