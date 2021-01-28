class Counter {
	constructor(limit) {
		this.count = 1;
		this.limit = limit;
	}

  [Symbol.iterator]() {
		let count = 1;
		let limit = this.limit;
		return {
			next() {
				if(count <= limit) {
					return {
						done: false,
						value: count++
					}
				} else {
					return {
						done: true,
						value: undefined
					}
				}
			},
			return () {
				console.log("提前终止迭代器");
				return { done: true };
			}
		};
	}
}

let counter = new Counter(5);

for(let i of counter) {
  if (i > 3) {
    break;
  }
  console.log(i);
}

for(let i of counter) {
	console.log(i);
}
