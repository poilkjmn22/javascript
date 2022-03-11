const redis = require('redis');
const dbConf = require('../db.conf.json');
const db = redis.createClient(dbConf.PORT, dbConf.HOST);
const NoteCate = require('./note-cate.js');

class BugRecord {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  save(cb) {
    bugReportJSON = JSON.stringify(this);
    db.zadd('notes', this.ts, bugReportJSON, (err) => {
      if (err) return cb(err);
      cb();
    });
  }
  static getRange(from, to, cb) {
    db.zrevrange('notes', from, to, (err, notes) => {
      if (err) return cb(err);
      NoteCate.getAll((err, noteCates) => {
        if (err) return cb(err);
        cb(
          null,
          notes.map((item) => {
            const note = JSON.parse(item);
            note.cateTitle = noteCates[note.cate];
            return note;
          })
        );
      });
    });
  }
  static delete(value, cb) {
    db.zrem('notes', value, (err) => {
      if (err) return cb(err);
      cb(null);
    });
  }
}

module.exports = BugRecord;
