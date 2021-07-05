let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(xhr.readyState == 4){
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      console.log(xhr.responseText);
      console.dir(xhr.getAllResponseHeaders());
    }else {
      console.error(`request was unsuccessful: ${xhr.status}`);
    }
  }
}

xhr.open('get', './get-sample?name=qi', true);
xhr.setRequestHeader('MyHeader', 'MyValue');
xhr.send(null);


let xhr1 = new XMLHttpRequest();
xhr1.onreadystatechange = function(){
  try{
    if(xhr1.readyState == 4){
      if((xhr1.status >= 200 && xhr1.status < 300) || xhr1.status == 304){
        console.log(xhr1.responseText);
      }else {
        console.error(`request was unsuccessful: ${xhr1.status}`);
      }
    }
  }catch(e){
    //
  }
}

xhr1.open('get', './get-timeout?name=qi', true);
xhr1.timeout = 4000;
xhr1.ontimeout = function(){
  console.error('request did not return in a second!');
}
xhr1.send(null);
