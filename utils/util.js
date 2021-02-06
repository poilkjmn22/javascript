export function swap(arr, i, j) {
	let tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

export function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]';
}

export function isFunction(value) {
	return Object.prototype.toString.call(value) === '[object Function]';
}

export function* nTimesRec(n) {
	if(n > 0) {
		yield* nTimesRec(n - 1);
		yield(n - 1);
	}
}

export function* nTimes(n) {
	while(n--) {
		yield;
	}
}

export function round(d, n = 2){
  const k = Math.pow(10, n);
  return Math.round(d * k) / k;
}

export function random(from, to){
	return Math.floor(Math.random() * (to - from)) + from;
}
