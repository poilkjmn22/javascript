const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index.js');
const {PORT = 3004, PWD = __dirname} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//view engine setup
const ejs = require('ejs').__express;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.engine('.ejs', ejs);

//RESTFUL API
const subject = require('./routes/subject.js');
const bugRecord = require('./routes/bug-record.js');
app.get('/api/subjects', subject.list)
app.get('/api/bug-record-list', bugRecord.list);
app.post('/api/bug-record', bugRecord.submit);

app.get('/', index.app);

app.use(express.static(path.resolve(PWD, 'build/public')));
app.use('*', index.app);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
