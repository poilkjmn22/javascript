//console.log('穷竭搜索-深度优先搜索')
function fib(n){
  if(n <= 2) return 1;
  return fib(n-1) + fib(n-2);
}

function fibMemo(n){
  const memo = []
  function innerRecurrence(n){
    if(n <= 2) return memo[n - 1] = 1;
    if(memo[n - 1]) return memo[n - 1];
    return memo[n - 1] = (innerRecurrence(n-1) + innerRecurrence(n-2));
  }
  innerRecurrence(n)
  return memo;
}

console.log(fib(8))
console.log(fibMemo(8))

function getPartialSum(arr, k){
  const n = arr.length;
  const partials = [];
  let path = [];
  function innerDFS(i, sum, isAdd){
    if(isAdd) path.push(arr[i - 1])
    if(i === n) {
      const found = sum === k;
      if(found === true){
        partials.push(path.concat());
      }
      if(isAdd) path.pop();
      return found;
    }
    if(innerDFS(i + 1, sum, false)) {
      return true;
    }
    if(innerDFS(i + 1, sum + arr[i], true)){
      path.pop();
      return true;
    }
    if(isAdd) path.pop();
    return false;
  }
  innerDFS(0, 0);
  return partials;
}

console.log(getPartialSum([1,2,4,7], 13))
console.log(getPartialSum([1, 2, 3, 4, 7, 11, 15, 19], 22))
