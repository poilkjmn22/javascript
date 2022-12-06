const NavList = require("../models/nav-list.js");
exports.list = (req, res, next) => {
  NavList.getRange(0, 1000, (err, list) => {
    if (err) return next(err);
    res.format({
      "application/json": () => {
        res.send(list);
      },
    });
  });
};

exports.add = (req, res, next) => {
  const { name, title, parent } = req.body;
  const item = new NavList({
    name,
    title,
    parent,
  });
  item.save((err) => {
    if (err) return next(err);
    res.format({
      "application/json": () => {
        res.send({
          code: 0,
          msg: "success",
        });
      },
    });
  });
};

exports.delete = (req, res, next) => {
  NavList.delete(JSON.stringify(req.body.navItem), (err) => {
    if (err) return next(err);
    res.format({
      "application/json": () => {
        res.send({
          code: 0,
          msg: "success",
        });
      },
    });
  });
};
