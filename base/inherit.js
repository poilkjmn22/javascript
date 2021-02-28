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
