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
setTimeout(() => console.log(3))
const p = new Promise((resolve) => {
  resolve()
  console.log(1)
})
p.then((value) => console.log(2.1))
console.log(2)
