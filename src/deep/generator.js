function* foo(x) {
  var y = x * (yield 'Hello');
  return y;
}

var it = foo(6);
var res = it.next();
console.log(res.value);

res = it.next(8);
console.log(res.value);
