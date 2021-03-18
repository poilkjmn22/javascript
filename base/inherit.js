const hasPrototypeProperty = (obj, name) => !obj.hasOwnProperty(name) && name in obj;
const object = Object.create || function(o) {
  function F(){}
  F.prototype = o;
  return new F();
};

export default function inheritPrototype(SubType, SuperType){
  let prototype = object(SuperType.prototype);
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}


/*****
使用抽象类继承的设计模式
*****/
function SuperTypeInherit(name){
  this._name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperTypeInherit.prototype.sayName = function(){
  console.log(`My Name is ${this._name}`);
}

function SubTypeInherit(name, age){
  SuperTypeInherit.call(this, name);
  this.age = age;
}

inheritPrototype(SubTypeInherit, SuperTypeInherit);

SubTypeInherit.prototype.sayAge = function(){
  this.sayName();
  console.log(this.age);
}

const person = new SuperTypeInherit('xiaoming');
person.sayName();
console.log(hasPrototypeProperty(person, 'sayName'));

let person3 = new SubTypeInherit('xiaohong', 35);
console.log(hasPrototypeProperty(person3, 'sayName'));
person3.sayAge();

/*****
  使用行为委托的设计模式实现类继承《你不知道的Javascript（上）-5～6章》
  对象关联是一种编码风格：它倡导直接创建和关联对象，不把他们抽象成类.
*****/
var SuperType = {
  name: 'fangqi',
  sayName(){
    console.log(`My name is ${this.name}`);
  }
};

var SubType = Object.create(SuperType, {
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

var subType1 = Object.create(SubType);

var subType2 = Object.create(SubType, {
  age: {
    value: 32
  },
  name: {
    value: 'fangqi4'
  }
});

subType1.sayAge();
console.log(Object.getPrototypeOf(subType1) === SubType);
subType1.name = 'fangqi3';
subType1.sayAge();

var superType = Object.create(SuperType);
superType.sayName();

subType2.sayAge();
console.log(Object.getPrototypeOf(subType2) === SubType);
