const Subject = require('../models/subject.js');
exports.list = (req, res, next) => {
  Subject.getRange(0, 1000, (err, subjects) => {
    if (err) return next(err);
    res.format({
      'application/json': () => {
        res.send(subjects);
      },
    });
  });
};

exports.add = (req, res, next) => {
  const { name, title } = req.body;
  const subject = new Subject({
    name,
    title,
  });
  subject.save(req.body.score, (err) => {
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

exports.delete = (req, res, next) => {
  Subject.delete(JSON.stringify(req.body.navItem), (err) => {
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
