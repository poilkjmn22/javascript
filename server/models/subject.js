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
    db.zrange('nav-items', from, to, (err, items) => {
      if(err) return cb(err);
      const subjects = items.map((item) => JSON.parse(item));
      cb(null, subjects);
    })
  }
  save(score, cb){
    db.zadd('nav-items', score, JSON.stringify(this), (err) => {
      if(err) return cb(err);
      cb(null);
    })
  }
  static delete(value, cb){
    db.zrem('nav-items', value, (err) => {
      if(err) return cb(err);
      cb(null);
    })
  }
}

module.exports = Subject;
