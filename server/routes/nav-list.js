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
  const { name, title, parentId } = req.body;
  const item = new NavList({
    name,
    title,
    parentId,
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
  console.log(req.body);
  NavList.delete(req.body, (err) => {
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
