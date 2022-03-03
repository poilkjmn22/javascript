//function double(value, cb){
  //setTimeout(() => cb(value * 2), 1000);
//}
//
//double(10, (value) => console.log(`I was given: ${value}`));
//
//let p = new Promise(() => {});
//setTimeout(console.log, 0, p);
//
//let p1 = new Promise((resolve, reject) => resolve());
//setTimeout(console.log, 0, p1);
//p1.then(() => console.log('onResolved handler'));
//console.log('then returns');

//let p2 = new Promise((resolve, reject) => reject());
//setTimeout(console.log, 0, p2);
//
//setTimeout(console.log, 0, Promise.resolve(4,5,6));
//setTimeout(console.log, 0, Promise.resolve(p));
//
//let p3 = Promise.reject(9);
//setTimeout(console.log, 0, p3);
//p3.then(null, (reason) => setTimeout(console.log, 0, reason))

// setTimeout(() => console.log(3))
// const p = new Promise((resolve) => {
//   resolve()
//   console.log(1)
// })
// p.then((value) => console.log(2.1))
// console.log(2)

let p = new Promise((resolve, reject) => {
  throw "p error"
  resolve(1)
})

let p2 = new Promise(res => {
  res(2)
})

let p3 = new Promise(res => {
  res(3)
})

p2.then(res => {
  console.log(res)
  return p
})
  .then()
  // .catch(e => {
  //   console.error(e)
  //   return p3
  // })
  .then(res => {
    // throw "uncatched p error"
    console.log(res)
  })
  .catch(e => {
    a.b()
    console.error(e)
  })
  
let pChain = Promise.resolve(21)
let pChain2 = pChain.then(val => {
  console.log(val)
  return val * 4
})
pChain2.then(console.log)

function delay(time, val){
  return new Promise(res => setTimeout(res, time, val))
}

delay(100, 'chain 1')
  .then(res => {
    console.log(res)
    return delay(1000, 'chain 2')
  })
  .then(res => {
    console.log(res)
    return delay(1000, 'chain 3')
  })
  .then(res => {
    console.log(res)
    return delay(1000, 'chain 4')
  })
  .then(console.log)
