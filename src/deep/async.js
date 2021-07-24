import ASQ from 'asynquence'
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 3000)
})
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 1000)
})

const arr = [p,p1,p2]

//能保证按顺序执行异步任务，但是是在任务队列中等待执行的。不同于链式异步任务。
// async function foo(){
//   for(let a of arr){
//     const res = await a
//     console.log(res)
//   }
// }

async function asyncRp(){
  console.log(0)
  console.log(await p)
  console.log(await p1)
  console.log(3)
}
//并行模式
asyncRp()
// foo()
// ASQ(done => done('hello'))
//   .val(greeting => `${greeting} asynquence`)
//   .then(( done, msg ) => setTimeout(done, 1000, msg))
//   .then(( done, msg ) => report(msg))

// ASQ(done => setTimeout(() => {
//   report('step 1')
//   done()
// }, 1000)) 
//   .gate(
//     done => setTimeout(() => {
//       done('hello ')
//     }, 500),
//     done => setTimeout(() => {
//       done('asynquence', '!')
//     }, 500),
//   )
//   .val(( msg1, msg2 ) => {
//     report(msg1)
//     report(msg2)
//   })
