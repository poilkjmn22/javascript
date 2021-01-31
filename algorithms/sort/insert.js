import { isArray } from './util.js';

const sort = function(arr) {
	if(!isArray(arr)) {
		console.warn(`${arr} is not an array`);
		return arr;
	}
	for(let i = 1; i < arr.length; i++) {
		let j = i - 1;
		let value = arr[i];
		while(j >= 0 && arr[j] > value) {
			arr[j + 1] = arr[j];
			j -= 1;
		}
		arr[j + 1] = value;
	}

	return arr;
};

export {
	sort
};
