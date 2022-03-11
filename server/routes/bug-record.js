const BugRecord = require('../models/bug-record.js');
const _ = require('lodash');
exports.submit = (req, res, next) => {
  const bugRecord = new BugRecord({
    text: req.body.text,
    ts: Date.now(),
    cate: req.body.notecate || '默认',
  });
  bugRecord.save((err) => {
    if (err) return next(err);
    res.json({
      code: 0,
      msg: 'success',
    });
  });
};

exports.list = (req, res, next) => {
  BugRecord.getRange(0, -1, (err, bugRecords) => {
    if (err) return next(err);
    res.format({
      'application/json': () => {
        res.send(bugRecords);
      },
    });
  });
};

exports.delete = (req, res, next) => {
  BugRecord.delete(req.body.bugRecord, (err) => {
    if (err) return next(err);
    res.format({
      'application/json': () => {
        res.send({
          code: 0,
          msg: 'success',
        });
      },
    });
  });
};

exports.statistic = (req, res, next) => {
  BugRecord.getRange(0, -1, (err, bugRecords) => {
    if (err) return next(err);
    const statisticData = _.groupBy(bugRecords, 'cate');
    res.format({
      'application/json': () => {
        res.send(statisticData);
      },
    });
  });
};
