export function search(arr, t){
	let left = 0;
	let right = arr.length - 1;
	while(left <= right){
		let mid = (left + right) >> 1;
		if(t < arr[mid]){
			right = mid - 1;
		}else if(t > arr[mid]){
			left = mid + 1;
		}else{
			return true;
		}
	}

	return false;
}
