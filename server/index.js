const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index.js');
const {PORT = 3004, PWD = __dirname} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//view engine setup
const ejs = require('ejs').__express;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.engine('.ejs', ejs);

//RESTFUL API
const subject = require('./routes/subject.js');
const bugRecord = require('./routes/bug-record.js');
const noteCateList = require('./routes/note-cate-list.js');

app.get('/api/subjects', subject.list)
app.post('/api/nav-items/add', subject.add);
app.post('/api/nav-items/delete', subject.delete);

app.get('/api/bug-record-list', bugRecord.list);
app.post('/api/bug-record', bugRecord.submit);
app.post('/api/bug-record/delete', bugRecord.delete);
app.post('/api/bug-record/statistic', bugRecord.statistic);

app.get('/api/note-cate/list', noteCateList.list);
app.post('/api/note-cate/add', noteCateList.add);
app.post('/api/note-cate/delete', noteCateList.delete);
app.post('/api/note-cate/update', noteCateList.update);

app.get('/', index.app);

app.use(express.static(path.resolve(PWD, 'server')));
app.use('*', index.app);

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
