const redis = require("redis");
const dbConf = require("../db.conf.json");
const { v1: uuidv1 } = require("uuid");

const TableName = "nav-list";

async function initDb(cb) {
  const db = await redis.createClient(dbConf.PORT, dbConf.HOST);
  await cb(db);
  db.disconnect();
}

class NavList {
  constructor(obj) {
    this.id = uuidv1();
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  static getRange(from, to, cb) {
    const p = (db) =>
      new Promise((res, rej) => {
        console.log(db.get);
        db.lrange(TableName, from, to, (err, items) => {
          if (err) {
            cb(err);
            rej();
            return;
          }
          const data = items.map((item) => JSON.parse(item));
          cb(null, data);
          res();
        });
      });
    initDb(p);
  }
  save(cb) {
    console.log(this);
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
