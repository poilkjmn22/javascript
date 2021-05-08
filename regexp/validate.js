let regexpEmail = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/i;
console.log(regexpEmail.test('345@q.Q'));

let regexpEmailStrong = /^[\w!#$%^&*+-/=?`~'{|}]+(?:\.[!#$%^&*+-/=?`~'{|}]+)*@(?:[a-z0-9-]+\.)+[a-z]{2,6}$/i;
console.log(regexpEmailStrong.test('sghiytuity&@163.coM'));
