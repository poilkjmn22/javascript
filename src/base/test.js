console.log(typeof 45);

let car = null;
console.log(typeof car);

console.log(null == undefined);

let sym = Symbol();
console.log(sym);

let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(fooSymbol == otherFooSymbol);

console.log(Array.from('fangqi'));

const m = new Map().set('a', 1).set('b', 2);
const s = new Set().add(1).add(2).add(3).add(4);
console.log(Array.from(m));
console.log(Array.from(s));

let num = 1;
let obj = {};

console.log(num[Symbol.iterator]);
console.log(obj[Symbol.iterator]);

let arr = ['foo', 'bar', 'baz'];

for (let el of arr) {
  console.log(el);
}

let [a, b, c] = arr;
console.log(a, b, c);

let arr2 = [...arr];
console.log(arr2);
