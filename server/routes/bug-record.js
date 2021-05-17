const BugRecord = require('../models/bug-record.js');
exports.submit = (req, res, next) => {
  const bugRecord = new BugRecord({
    text: req.body.text,
    ts: Date.now()
  })
  bugRecord.save((err) => {
    if(err) return next(err);
    res.json({
      code: 0,
      msg: 'success'
    })
  });
}

exports.list = (req, res, next) => {
  BugRecord.getRange(0, 1000, (err, bugRecords) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send(bugRecords);
      }
    })
  })
}
