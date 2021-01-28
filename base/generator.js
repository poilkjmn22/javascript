function* generatorFn() {
	yield 'foo';
}

const g = generatorFn();
console.log(g);
console.log(g.next());

console.log(g[Symbol.iterator]);
console.log(g[Symbol.iterator]() === g);

//yield 中断执行generatorFn
function* generatorFnYield() {
	yield 'foo';
	yield 'bar';
	return 'baz';
}

let generatorFnYieldObj = generatorFnYield();
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj.next());
console.log(generatorFnYieldObj);

//迭代器
function* nTimes(n) {
	while(n--) {
		yield;
	}
}

for(let n of nTimes(6)) {
	console.log('foo');
}

function* range(start, end) {
	while(end > start) {
		yield start++;
	}
}
console.log(Array.from(range(3, 10)));

//产生可迭代对象
function* generatorFnIterator() {
	yield*['a', 'b', 'c'];
}
for(var v of generatorFnIterator()) {
	console.log(v);
}

//yield*实现递归
function* nTimesRec(n) {
	if(n > 0) {
		yield* nTimesRec(n - 1);
		yield(n - 1);
	}
}
for(const n of nTimesRec(4)) {
	console.log(n);
}

//提前终止生成器
console.log(g);
g.return(4);//g.throw(4)
console.log(g);
