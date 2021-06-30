const NoteCate = require('../models/note-cate.js');
//const pinyin = require('pinyin');
//const _ = require('lodash');

exports.map = (req, res, next) => {
  NoteCate.getAll((err, noteCates) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send(noteCates);
      }
    })
  })
}

exports.add = (req, res, next) => {
  const notecate = new NoteCate({
    name: req.body.title,
    title: req.body.title
  })
  notecate.save((err) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send({
          code: 0,
          msg: 'success'
        })
      }
    });
  })
}
