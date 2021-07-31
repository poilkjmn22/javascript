const redis = require('redis');
const dbConf = require('../db.conf.json');
const db = redis.createClient(dbConf.PORT, dbConf.HOST);

class NoteCateList{
  constructor(obj){
    for(let key in obj){
      this[key] = obj[key];
    }
  }
  static getRange(from, to, cb){
    db.lrange('note-cate-list', from, to, (err, items) => {
      if(err) return cb(err);
      const data = items.map((item) => JSON.parse(item));
      cb(null, data);
    })
  }
  save(cb){
    db.lpush('note-cate-list', JSON.stringify(this), (err) => {
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

module.exports = NoteCateList;
