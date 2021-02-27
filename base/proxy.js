const target = {
  foo: 'bar'
};

const proxy = new Proxy(target, {
  get(){
    return 'handler override';
  }
});

console.log(target.foo);
console.log(proxy.foo);
console.log(proxy['foo']);
console.log(Object.create(proxy)['foo']);

const proxyReflect = new Proxy(target, {
  get(){
    return Reflect.get(...arguments);
  }
});

console.log(proxyReflect.foo);
