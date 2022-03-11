var pattern = /(.)hort/g;
var text = 'this has been a short summer';

if (pattern.test(text)) {
  console.log(RegExp['$_']);
  console.log(RegExp['$`']);
  console.log(RegExp["$'"]);
  console.log(RegExp['$&']);
  console.log(RegExp['$+']);
}
