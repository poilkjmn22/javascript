//for(const k in window){
  //if(window.hasOwnProperty(k)){
    //console.log(`${k}: ${window[k]}`);
  //}
//}
console.log(`screenLeft: ${window.screenLeft}`);
console.log(`screenTop: ${window.screenTop}`);
new Promise((resolve, reject) => {
  setTimeout(() => resolve(window.moveBy), 1000);
})
  .then(value => {
    console.log(value);
    setTimeout(() => console.log(window.moveTo), 1000);
  })

console.log(`pageWidth: ${window.innerWidth}, pageHeight: ${window.innerHeight}`);
