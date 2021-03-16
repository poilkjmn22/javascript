function numberToThousandStep(str, thousandStep = ','){
  str = str + '';
  return str.replace(/(^|[^0-9.])([0-9]{4,})/g, function($0, $1, $2){
    return $1 + $2.replace(/[0-9](?=(?:[0-9]{3})+(?![0-9]))/g, `$&${thousandStep}`);
  })
}

console.log(numberToThousandStep(12345678, '_'));
console.log(numberToThousandStep(123, '_'));
console.log(numberToThousandStep(12345678.9876543210));
console.log(numberToThousandStep('there are more than 7000000000 people in the world today, and there are about 1400000000 people in China.'));
