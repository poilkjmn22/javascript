'use strict';
import inheritPrototype from './inherit.js';
let person = {};

Object.defineProperty(person, 'name', {
  writeble: false,
  value: 'qi'
});

console.log(person.name);
//person.name = 'yuan';
//console.log(person.name);

let book = {
  year_: 2017,
  edition: 1
};

Object.defineProperty(book, 'year', {
  get() {
    return this.year_;
  },
  set(newValue) {
    if(newValue > 2017){
      this.year_ = newValue;
      this.edition += (newValue - 2017);
    }
  }
});

book.year = 2020;
console.log(book);
console.dir(Object.getOwnPropertyDescriptors(book));

let dest = {
  set id(x){
    console.log(x);
    this.id_ = x;
  }
};
let copy = {c : {}};
let result = Object.assign(dest, {id: 'src1', a: 'foo'}, {id: 'src2', b: 'bar'}, copy);
console.dir(result);
console.log(result === dest);
console.log(result.c === dest.c);

//computeable property
let uniqueToken = 0;
const getUniqueKey = (key) => `${key}_${uniqueToken++}`;
let person2 = {
  [getUniqueKey('name')]: 'Matt',
  [getUniqueKey('age')]: 30,
  [getUniqueKey('job')]: 'web engineer',
};
console.log(person2);

function SuperType(name){
  this._name = name;
  this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName = function(){
  console.log(this._name);
}

function SubType(name, age){
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
  console.log(this.age);
}

let person3 = new SubType('fangqi', 31);
console.dir(person3);
console.log(person3.sayName);
console.log(person3.sayAge);
