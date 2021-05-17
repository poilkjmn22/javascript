const redis = require('redis');
const dbConf = require('../db.conf.json');
const db = redis.createClient(dbConf.PORT, dbConf.HOST);

class Subject{
  constructor(obj){
    for(let key in obj){
      this[key] = obj[key];
    }
  }
  static getRange(from, to, cb){
    db.lrange('subjects', from, to, (err, items) => {
      if(err) return cb(err);
      const subjects = items.map((item) => JSON.parse(item));
      cb(null, subjects);
    })
  }
}

module.exports = Subject;
