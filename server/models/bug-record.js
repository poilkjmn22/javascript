
const redis = require('redis');
const dbConf = require('../db.conf.json');
const db = redis.createClient(dbConf.PORT, dbConf.HOST);

class BugRecord{
  constructor(obj){
    for(let key in obj){
      this[key] = obj[key];
    }
  }
  save(cb){
    bugReportJSON = JSON.stringify(this);
    db.lpush(
      'bug-records',
      bugReportJSON,
      (err) => {
        if(err) return cb(err);
        cb();
      }
    )
  }
  static getRange(from, to, cb){
    db.lrange('bug-records', from, to, (err, items) => {
      if(err) return cb(err);
      cb(null, items.map((item) => JSON.parse(item)))
    });
  }
}

module.exports = BugRecord;
