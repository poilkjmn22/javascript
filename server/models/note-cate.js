const redis = require('redis');
const dbConf = require('../db.conf.json');
const db = redis.createClient(dbConf.PORT, dbConf.HOST);

class NoteCate{
  constructor(obj){
    for(let key in obj){
      this[key] = obj[key];
    }
  }
  save(cb){
    db.hmset(
      'note-cate',
      this.name,
      this.title,
      (err) => {
        if(err) return cb(err);
        cb();
      }
    )
  }
  static getAll(cb){
    db.hgetall('note-cate', (err, items) => {
      if(err) return cb(err);
      cb(null, items)
    });
  }
  static delete(value, cb){
    db.zrem('note--cate-default', value, (err) => {
      if(err) return cb(err);
      cb(null);
    })
  }
}

module.exports = NoteCate;
