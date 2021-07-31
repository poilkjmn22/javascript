const NoteCateList = require('../models/note-cate-list.js');
exports.list = (req, res, next) => {
  NoteCateList.getRange(0, -1, (err, items) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send(items);
      }
    })
  })
}

exports.add = (req, res, next) => {
  const {name, _parent } = req.body;
  const item = new NoteCateList({
    name,
    _parent,
  })
  item.save((err) => {
    if(err) return next(err)
    res.format({
      'application/json': () => {
        res.send({
          code: 0,
          msg: 'success'
        })
      }
    })
  })
}

exports.delete = (req, res, next) => {
  NoteCateList.delete(JSON.stringify(req.body.navItem), (err) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send({
          code: 0,
          msg: 'success'
        })
      }
    })
  })
}

