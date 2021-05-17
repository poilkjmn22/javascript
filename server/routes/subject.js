const Subject = require('../models/subject.js');
exports.list = (req, res, next) => {
  Subject.getRange(0, 1000, (err, subjects) => {
    if(err) return next(err);
    res.format({
      'application/json': () => {
        res.send(subjects);
      }
    })
  })
}
