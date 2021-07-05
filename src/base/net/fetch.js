fetch('./package.json')
  .then(response => {
    console.dir(response);
    return response.json();
  })
  .then(data => console.log(Object.prototype.toString.call(data)))
  .catch(e => console.error(e))

let payload = JSON.stringify({
  foo: 'bar'
});

let jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});

fetch('./send-me-json', {
  method: 'post',
  body: payload,
  headers: jsonHeaders
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(e => console.error(e))
