const redis = require("redis");
const dbConf = require("../db.conf.json");
const db = redis.createClient(dbConf.PORT, dbConf.HOST);

const TableName = "nav-list";

class NavList {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
    this.id = NavList.uid++;
  }
  static uid = 0;
  static getRange(from, to, cb) {
    db.lrange(TableName, from, to, (err, items) => {
      if (err) return cb(err);
      const data = items.map((item) => JSON.parse(item));
      cb(null, data);
    });
  }
  save(cb) {
    db.lpush(TableName, JSON.stringify(this), (err) => {
      if (err) return cb(err);
      cb(null);
    });
  }
  static delete(body, cb) {
    const value = new NavList(body);
    db.lrem(TableName, 1, JSON.stringify(value), (err) => {
      if (err) return cb(err);
      cb(null);
    });
  }
  static update(body, cb) {
    const { lastValue, newValue } = body;
    db.lrem(TableName, 1, JSON.stringify(lastValue), (err) => {
      if (err) return cb(err);
      const newObj = new NavList(newValue);
      newObj.save(cb);
    });
  }
}

module.exports = NavList;
