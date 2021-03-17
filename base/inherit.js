const object = (o) => {
  function F(){}
  F.prototype = o;
  return new F();
};

export default function inheritPrototype(subType, superType){
  let prototype = object(superType);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

/*****
  使用行为委托的设计模式实现类继承《你不知道的Javascript（上）-5～6章》
  对象关联是一种编码风格：它倡导直接创建和关联对象，不把他们抽象成类.
*****/
var superType = {
  name: 'fangqi',
  sayName(){
    console.log(`My name is ${this.name}`);
  }
};

var subType = Object.create(superType, {
  age: {
    value: 31
  },
  sayAge: {
    value: function(){
      this.sayName();
      console.log(`,is ${this.age} years old.`);
    }
  }
});

var subType2 = Object.create(subType, {
  age: {
    value: 32
  },
  name: {
    value: 'fangqi4'
  }
});

subType.sayAge();
console.log(Object.getPrototypeOf(subType) === superType);
subType.name = 'fangqi3';
subType.sayAge();
superType.sayName();

subType2.sayAge();
console.log(Object.getPrototypeOf(subType2) === subType);
