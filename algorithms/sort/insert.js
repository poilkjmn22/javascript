function memmove(arr, i, j){
  for (var k = j - 1; k > i; k--) {
    arr[k + 1] = arr[k];
  }
}

const insert = function(arr){
  let clone = Array.from(arr);
  for (let i = 1; i < clone.length; i++) {
    let j = i - 1;
    let flag = false;
    while (j >= 0 && clone[j] > clone[i]) {
      j -= 1;
      flag = true;
    }
    if (flag === true) {
      let tmp = clone[i];
      memmove(arr, j, i);
      clone[j + 1] = tmp;
    }
  }

  return clone;
}

export {
  insert
}